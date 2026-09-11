import React, { useState } from 'react';
import { ScreenType } from '../types';
import { INITIAL_FLASHCARDS, INITIAL_QUIZ } from '../data/mockData';

interface PracticeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenSettings: () => void;
  userAvatar?: string;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  onNavigate,
  onOpenSettings,
  userAvatar,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(3); // Start at Card 4 / 18 (index 3) like in image
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>('C'); // Start with C selected as in image
  const [savedNotes, setSavedNotes] = useState<number[]>([]);
  const [noteSavedMessage, setNoteSavedMessage] = useState(false);

  const totalCards = 18;
  const currentCard = INITIAL_FLASHCARDS[currentCardIndex % INITIAL_FLASHCARDS.length];
  const currentQuiz = INITIAL_QUIZ[quizIndex % INITIAL_QUIZ.length];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleSaveNote = () => {
    if (!savedNotes.includes(currentQuiz.id)) {
      setSavedNotes([...savedNotes, currentQuiz.id]);
      setNoteSavedMessage(true);
      setTimeout(() => setNoteSavedMessage(false), 2000);
    }
  };

  const handleNextQuiz = () => {
    setQuizIndex((prev) => (prev + 1) % INITIAL_QUIZ.length);
    setSelectedAnswer(null);
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-5 pt-3 pb-6">
      {/* Top Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-xs mb-3 border border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00288e] flex items-center justify-center text-white font-bold">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#00288e] leading-none">MedStudy</span>
            <span className="text-[11px] text-slate-500 font-semibold leading-none mt-1">Ôn Tập</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('planner')}
            aria-label="Thông báo"
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-[#00288e] hover:bg-blue-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            aria-label="Tài khoản"
            className="w-8 h-8 rounded-full bg-[#00288e] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity overflow-hidden border border-white/80"
          >
            {userAvatar ? (
              <img src={userAvatar} alt="Hồ sơ" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[18px]">person</span>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {/* Topic Header & Meta */}
        <section className="flex flex-col gap-1.5 px-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-bold shadow-xs">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
              <span>Spaced Repetition SM-2</span>
            </div>
            <span className="text-[11px] font-bold text-slate-600 bg-[#dce9ff] px-2.5 py-0.5 rounded-full">
              Mô-đun Y sinh 02
            </span>
          </div>

          <div>
            <h1 className="text-[22px] font-bold text-[#0b1c30] tracking-tight leading-snug">
              Quang hợp &amp; Sinh học tế bào
            </h1>
            <p className="text-[12px] text-slate-600 mt-0.5">
              Chu trình Calvin, chuyển hóa năng lượng &amp; siêu cấu trúc lục lạp
            </p>
          </div>
        </section>

        {/* Flashcard Interactive Module */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#00288e] animate-pulse"></span>
              <span className="text-[12px] text-[#0b1c30] font-bold">
                Thẻ Flashcard {currentCardIndex + 1} / {totalCards}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCard}
                className="text-[11px] text-slate-500 hover:text-primary font-medium"
                title="Thẻ trước"
              >
                Trước
              </button>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-500 text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[16px]">touch_app</span>
                <span>Chạm thẻ để lật</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#dce9ff] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00288e] rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / totalCards) * 100}%` }}
            ></div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            className="relative w-full h-72 cursor-pointer select-none"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative w-full h-full duration-500 transition-transform rounded-2xl shadow-md"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Mặt trước (Câu hỏi) */}
              <div
                className="absolute inset-0 w-full h-full bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#00288e] text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[14px]">help_outline</span>
                    <span>{currentCard.category}</span>
                  </span>
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">flip</span>
                </div>

                <div className="my-auto text-center px-2">
                  <p className="text-[17px] font-bold text-[#0b1c30] leading-relaxed">
                    {currentCard.question}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#eff4ff] text-slate-600 border border-blue-100/50">
                  <span className="material-symbols-outlined text-[18px] text-[#00288e]">visibility</span>
                  <span className="text-[11px] font-semibold">Nhấn vào thẻ để kiểm tra đáp án ẩn</span>
                </div>
              </div>

              {/* Mặt sau (Đáp án & Gợi ý AI) */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-[#eff4ff] border border-blue-200 rounded-2xl p-4 flex flex-col justify-between shadow-lg"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#003d27] text-white text-[11px] font-bold shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>{currentCard.answerTitle}</span>
                  </span>
                  <span className="material-symbols-outlined text-[#00563a] text-[20px]">sync</span>
                </div>

                <div className="my-auto space-y-2 text-left px-1">
                  <div className="p-3 rounded-xl bg-white shadow-xs border border-blue-100">
                    <div className="text-[11px] font-bold text-[#00288e] mb-1">Cốt lõi bài học</div>
                    <p className="text-[15px] font-bold text-[#0b1c30] leading-snug">
                      {currentCard.answerCore}
                    </p>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    {currentCard.answerExplanation}
                  </p>
                </div>

                <div className="text-center text-[11px] font-semibold text-slate-400">
                  Chạm lần nữa để quay lại mặt trước
                </div>
              </div>
            </div>
          </div>

          {/* Nút tự đánh giá Spaced Repetition (3 mức nhớ) */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="text-[11px] text-slate-500 px-1 text-center font-medium">
              Tự lượng giá năng lực nhớ để AI lên lịch lặp lại
            </div>
            <div className="grid grid-cols-3 gap-2">
              {/* Mức 1: Chưa nhớ */}
              <button
                onClick={handleNextCard}
                className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#ffdad6] text-[#93000a] shadow-xs active:scale-95 transition-transform"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] mb-0.5">sentiment_dissatisfied</span>
                <span className="text-[12px] font-extrabold leading-tight">Chưa nhớ</span>
                <span className="text-[11px] opacity-80 mt-0.5 font-medium">10 phút</span>
              </button>

              {/* Mức 2: Khá nhớ */}
              <button
                onClick={handleNextCard}
                className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#dce9ff] text-[#0b1c30] shadow-xs active:scale-95 transition-transform"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00288e] mb-0.5">sentiment_neutral</span>
                <span className="text-[12px] font-extrabold leading-tight">Khá nhớ</span>
                <span className="text-[11px] text-slate-600 mt-0.5 font-medium">1 ngày</span>
              </button>

              {/* Mức 3: Nhớ rõ */}
              <button
                onClick={handleNextCard}
                className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#6ffbbe] text-[#002113] shadow-xs active:scale-95 transition-transform"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[20px] mb-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sentiment_very_satisfied
                </span>
                <span className="text-[12px] font-extrabold leading-tight">Nhớ rõ</span>
                <span className="text-[11px] text-[#005236] mt-0.5 font-medium">4 ngày</span>
              </button>
            </div>
          </div>
        </section>

        {/* Divider & AI Visual Stats Summary */}
        <section className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#001d31] shrink-0">
              <span className="material-symbols-outlined text-[22px]">fact_check</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-500 font-medium">Kết quả Quiz</span>
              <span className="text-[15px] text-[#0b1c30] font-extrabold truncate">8/10 (80%)</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#6ffbbe] flex items-center justify-center text-[#002113] shrink-0">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-500 font-medium">Tỷ lệ ghi nhớ</span>
              <span className="text-[15px] text-[#003d27] font-extrabold truncate">+25% Phản xạ</span>
            </div>
          </div>
        </section>

        {/* AI Multiple Choice Quiz Section */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00288e] text-white text-[12px] font-bold">
                Q
              </span>
              <h2 className="text-[15px] text-[#0b1c30] font-bold">
                AI Trắc nghiệm củng cố
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#dde1ff] text-[#001453] text-[11px] font-bold">
              Câu 0{quizIndex + 8 > 10 ? 10 : quizIndex + 8}/10
            </span>
          </div>

          {/* Question Card */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col gap-3.5">
            <div>
              <p className="text-[15px] text-[#0b1c30] font-semibold leading-snug">
                {currentQuiz.question}
              </p>
            </div>

            {/* 4 Options */}
            <div className="flex flex-col gap-2">
              {currentQuiz.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isCorrect = opt.key === currentQuiz.correctAnswer;
                const showAsCorrect = isSelected && isCorrect;
                const showAsWrong = isSelected && !isCorrect;

                if (showAsCorrect) {
                  return (
                    <div
                      key={opt.key}
                      onClick={() => setSelectedAnswer(opt.key)}
                      className="w-full p-2.5 rounded-xl bg-[#6ffbbe]/30 border border-[#4edea3] text-[#0b1c30] flex items-center justify-between shadow-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#003d27] text-white text-[12px] font-bold shrink-0">
                          {opt.key}
                        </span>
                        <span className="text-[13px] font-bold text-[#0b1c30] truncate">
                          {opt.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-[#003d27] font-bold text-[11px] pl-2">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span>Đúng</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedAnswer(opt.key)}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors border ${
                      showAsWrong
                        ? 'bg-[#ffdad6] border-red-300 text-[#93000a]'
                        : 'bg-[#eff4ff] border-slate-200/80 text-[#0b1c30] hover:bg-[#e5eeff]'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-lg text-[12px] font-bold ${
                          showAsWrong ? 'bg-[#ba1a1a] text-white' : 'bg-[#d3e4fe] text-slate-700'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-[13px] font-medium">{opt.text}</span>
                    </div>
                    {showAsWrong && (
                      <span className="text-[11px] font-bold text-[#ba1a1a]">Chưa đúng</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* AI Real-time Feedback Box */}
            {selectedAnswer && (
              <div className="p-3 rounded-xl bg-[#eff4ff] border border-blue-100 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#00288e]">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Giải thích tức thì từ AI MedStudy
                  </span>
                </div>
                <p className="text-[12px] text-slate-700 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
              </div>
            )}

            {noteSavedMessage && (
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold text-center animate-fade-in">
                ✓ Đã lưu câu hỏi vào sổ tay ghi chú cá nhân!
              </div>
            )}

            {/* Action Footer for Quiz */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleSaveNote}
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-600 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {savedNotes.includes(currentQuiz.id) ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>{savedNotes.includes(currentQuiz.id) ? 'Đã lưu' : 'Lưu ghi chú'}</span>
              </button>

              <button
                onClick={handleNextQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00288e] text-white text-[13px] font-bold shadow-md active:scale-95 transition-transform"
                type="button"
              >
                <span>Câu kế tiếp</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
