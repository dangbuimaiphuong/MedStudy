import React, { useState, useRef, useEffect } from 'react';
import { ScreenType, UserProfile, ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES, generateChatbotResponse } from '../data/aiChatbotEngine';

interface ChatbotScreenProps {
  userProfile: UserProfile;
  documentTitle: string;
  sourceFileName: string;
  onNavigate: (screen: ScreenType) => void;
  onOpenSettings: () => void;
}

export const ChatbotScreen: React.FC<ChatbotScreenProps> = ({
  userProfile,
  documentTitle,
  sourceFileName,
  onNavigate,
  onOpenSettings,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('medstudy_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CHAT_MESSAGES;
      }
    }
    return INITIAL_CHAT_MESSAGES;
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'all' | 'quiz' | 'clinical' | 'exam'>('all');
  const [savedToFlashcardToast, setSavedToFlashcardToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem('medstudy_chat_messages', JSON.stringify(messages));
    } catch {
      // local storage quota fallback
    }
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const botResponse = await generateChatbotResponse(query, {
        userProfile,
        documentTitle,
        sourceFileName,
      });

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: botResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: botResponse.sources,
        suggestedQuestions: botResponse.suggestedQuestions,
        category: botResponse.category,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: `Đã xảy ra sự cố khi kết nối. Tôi vẫn sẵn sàng phân tích tài liệu **${documentTitle}** cho bạn, vui lòng thử gửi lại câu hỏi nhé!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Bạn có muốn xóa toàn bộ lịch sử trò chuyện và bắt đầu phiên mới không?')) {
      setMessages(INITIAL_CHAT_MESSAGES);
      localStorage.removeItem('medstudy_chat_messages');
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAsFlashcard = () => {
    setSavedToFlashcardToast(true);
    setTimeout(() => setSavedToFlashcardToast(false), 2500);
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-5 pt-3 pb-6 flex-1 min-h-0">
      {/* Top Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-2xl shadow-xs mb-2 border border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00288e] to-[#007cb9] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[19px]">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-[#0b1c30] leading-none">Gia sư Y khoa AI</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold tracking-wide uppercase">
                Trực tuyến
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium leading-none mt-1 truncate max-w-[180px]">
              Dữ liệu: {sourceFileName.split(' ')[0]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Toggle Data Context Button */}
          <button
            onClick={() => setIsContextDrawerOpen(!isContextDrawerOpen)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all ${
              isContextDrawerOpen
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-blue-50 text-[#00288e] hover:bg-blue-100'
            }`}
            title="Xem dữ liệu người dùng đang kết nối"
          >
            <span className="material-symbols-outlined text-[15px]">database</span>
            <span>Dữ liệu</span>
          </button>

          {/* Settings / Profile Button */}
          <button
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 rounded-full bg-[#00288e] text-white flex items-center justify-center overflow-hidden border border-white/80 shadow-xs"
            title="Hồ sơ"
          >
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[17px]">person</span>
            )}
          </button>
        </div>
      </header>

      {/* User & Document Context Drawer (Collapsible) */}
      {isContextDrawerOpen && (
        <div className="mb-2 p-3.5 bg-gradient-to-br from-blue-50/90 via-white to-slate-50 rounded-2xl border border-blue-200/70 shadow-xs flex flex-col gap-2.5 animate-fade-in text-[11px] shrink-0">
          <div className="flex items-center justify-between border-b border-blue-100/70 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#00288e]">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Dữ liệu AI đang nạp để vấn đáp riêng cho bạn:</span>
            </div>
            <button
              onClick={() => setIsContextDrawerOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-[13px]"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div className="p-2 rounded-xl bg-white border border-slate-100 flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold">Tài liệu đã tải lên</span>
              <strong className="text-[#0b1c30] truncate" title={documentTitle}>
                {documentTitle}
              </strong>
              <span className="text-[9px] text-slate-500">{sourceFileName}</span>
            </div>

            <div className="p-2 rounded-xl bg-white border border-slate-100 flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold">Hồ sơ sinh viên</span>
              <strong className="text-[#0b1c30] truncate">
                {userProfile.name} ({userProfile.studentId})
              </strong>
              <span className="text-[9px] text-slate-500 truncate">{userProfile.academicTrack} • {userProfile.cohort}</span>
            </div>

            <div className="p-2 rounded-xl bg-white border border-slate-100 flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold">Kết quả Trắc nghiệm</span>
              <strong className="text-emerald-700 font-bold">4/5 câu (80%)</strong>
              <span className="text-[9px] text-amber-700 font-medium">Cần củng cố: Câu 3 (Chu trình Calvin)</span>
            </div>

            <div className="p-2 rounded-xl bg-white border border-slate-100 flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold">Thẻ nhớ & Lộ trình</span>
              <strong className="text-[#00288e]">18 Flashcard • Chuỗi 7 ngày</strong>
              <span className="text-[9px] text-slate-500">Mục tiêu: {userProfile.dailyGoalMinutes || 60}p/ngày</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-500 italic">
              *AI tự động cá nhân hóa câu trả lời bám sát file và điểm yếu của bạn.
            </span>
            <button
              onClick={handleClearChat}
              className="text-[10px] text-rose-600 hover:underline font-bold flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-[13px]">delete_sweep</span>
              <span>Xóa lịch sử chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast alert */}
      {savedToFlashcardToast && (
        <div className="mb-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 animate-fade-in shrink-0">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>Đã lưu kiến thức này thành 1 thẻ Flashcard Spaced Repetition mới!</span>
        </div>
      )}

      {/* Quick Action Mode Selector Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 shrink-0 no-scrollbar">
        <button
          onClick={() => setActiveMode('all')}
          className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
            activeMode === 'all'
              ? 'bg-[#00288e] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          💬 Tất cả
        </button>
        <button
          onClick={() => {
            setActiveMode('quiz');
            handleSendMessage('Phân tích tại sao tôi làm sai câu trắc nghiệm số 3?');
          }}
          className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
            activeMode === 'quiz'
              ? 'bg-[#00288e] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ⚠️ Giải thích câu sai (80%)
        </button>
        <button
          onClick={() => {
            setActiveMode('exam');
            handleSendMessage('Khảo bài vấn đáp miệng cho tôi về bài học này');
          }}
          className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
            activeMode === 'exam'
              ? 'bg-[#00288e] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🎯 Khảo bài vấn đáp
        </button>
        <button
          onClick={() => {
            setActiveMode('clinical');
            handleSendMessage('Liên hệ lâm sàng: Cơ chế độc tính của thuốc trừ sâu Paraquat?');
          }}
          className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
            activeMode === 'clinical'
              ? 'bg-[#00288e] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🏥 Ca lâm sàng
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 pt-1 pb-2">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}
            >
              <div className="flex items-end gap-2 max-w-[92%]">
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#00288e] to-[#007cb9] text-white flex items-center justify-center shrink-0 shadow-xs mb-1">
                    <span className="material-symbols-outlined text-[15px]">smart_toy</span>
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#00288e] text-white rounded-br-xs'
                      : 'bg-white text-[#0f172a] rounded-bl-xs border border-slate-100'
                  }`}
                >
                  {/* Content with basic formatting */}
                  <div className="space-y-1.5 whitespace-pre-wrap">
                    {msg.content.split('\n\n').map((paragraph, idx) => {
                      // Check for heading
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={idx} className="font-extrabold text-[14px] text-[#00288e] mt-1 mb-1">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      // Check for blockquote
                      if (paragraph.startsWith('> ')) {
                        return (
                          <div
                            key={idx}
                            className="p-2.5 my-1.5 bg-blue-50/70 border-l-3 border-[#00288e] rounded-r-xl text-[12px] text-slate-800 font-medium italic"
                          >
                            {paragraph.replace('> ', '')}
                          </div>
                        );
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>

                  {/* Sources Grounding Tag */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <span className="material-symbols-outlined text-[13px] text-[#00288e]">menu_book</span>
                      <span className="font-semibold text-slate-600">Dữ liệu nguồn:</span>
                      {msg.sources.map((src, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bot Message Tool Bar */}
                  {!isUser && (
                    <div className="mt-2.5 pt-1.5 flex items-center justify-between border-t border-slate-100/80 text-[11px] text-slate-500">
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="hover:text-[#00288e] flex items-center gap-0.5"
                          title="Sao chép câu trả lời"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {copiedId === msg.id ? 'check' : 'content_copy'}
                          </span>
                          <span>{copiedId === msg.id ? 'Đã chép' : 'Chép'}</span>
                        </button>
                        <button
                          onClick={handleSaveAsFlashcard}
                          className="hover:text-[#00288e] text-[#00288e] font-semibold flex items-center gap-0.5"
                          title="Lưu câu trả lời vào bộ Flashcard ôn thi"
                        >
                          <span className="material-symbols-outlined text-[13px]">bookmark_add</span>
                          <span>Lưu Flashcard</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested Questions Chips */}
              {!isUser && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-9 mt-1">
                  {msg.suggestedQuestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      disabled={isLoading}
                      className="px-2.5 py-1 rounded-xl bg-white border border-blue-200 text-[#00288e] text-[11px] font-semibold hover:bg-blue-50 transition-colors text-left flex items-center gap-1 shadow-2xs"
                    >
                      <span>💡</span>
                      <span className="truncate max-w-[280px]">{sug}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#00288e] to-[#007cb9] text-white flex items-center justify-center shrink-0 shadow-xs mb-1">
              <span className="material-symbols-outlined text-[15px] animate-pulse">smart_toy</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-2 text-[12px] text-slate-500">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span>Đang tra cứu giáo trình & phân tích câu hỏi...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="mt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 focus-within:border-[#00288e] flex items-center gap-1.5 transition-all"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Hỏi bất cứ điều gì về tài liệu & bài học..."
            className="flex-1 px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all shrink-0 ${
              inputQuery.trim() && !isLoading
                ? 'bg-[#00288e] hover:bg-[#1e40af] shadow-xs cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title="Gửi câu hỏi"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>

        <div className="flex items-center justify-between px-2 pt-1 text-[10px] text-slate-400">
          <span className="truncate">
            Đang vấn đáp dựa trên: <strong className="text-slate-600">{sourceFileName.split(' ')[0]}</strong>
          </span>
          <span className="shrink-0">Gia sư Y1</span>
        </div>
      </div>
    </div>
  );
};
