import React, { useRef } from 'react';
import { ScreenType } from '../types';

interface HomeScreenProps {
  userName: string;
  userAvatar?: string;
  onNavigate: (screen: ScreenType) => void;
  onOpenSettings: () => void;
  onTriggerUpload: (file?: File) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  userAvatar,
  onNavigate,
  onOpenSettings,
  onTriggerUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onTriggerUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onTriggerUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col pb-6">
      <div>
        {/* BEGIN: TopBar */}
        <header className="px-5 pt-4 pb-2 flex items-center justify-between" data-purpose="header">
          {/* Logo & Cap Icon */}
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#00629b]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"></path>
            </svg>
            <span className="text-2xl font-extrabold tracking-tight text-[#00629b]">MedStudy</span>
          </div>

          {/* Profile & Settings Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('profile')}
              aria-label="Hồ sơ sinh viên"
              className="w-9 h-9 rounded-full bg-[#00629b] text-white font-bold flex items-center justify-center hover:opacity-90 active:scale-95 transition-transform text-sm shadow-xs overflow-hidden border border-white/80"
              type="button"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                userName ? userName.charAt(0).toUpperCase() : 'P'
              )}
            </button>
            <button
              onClick={onOpenSettings}
              aria-label="Cài đặt"
              className="p-1 text-[#00629b] hover:opacity-80 active:scale-95 transition-transform"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </header>
        {/* END: TopBar */}

        {/* BEGIN: WelcomeGreeting */}
        <section className="px-5 pt-4 pb-4" data-purpose="greeting-section">
          <h1 className="text-[26px] leading-[1.25] font-extrabold text-[#0a192f] tracking-tight">
            Xin chào {userName || 'Phuong'},<br />
            hôm nay bạn cần<br />
            tôi giúp gì?
          </h1>
        </section>
        {/* END: WelcomeGreeting */}

        {/* BEGIN: UploadCard */}
        <section className="px-5 mb-4" data-purpose="upload-section">
          <div className="bg-white rounded-[24px] p-5 card-shadow border border-blue-50/60 relative">
            {/* Upload Header Banner */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#005e94] flex items-center justify-center text-white shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-[#005e94] font-extrabold text-base tracking-wide text-right uppercase">
                TẢI TÀI LIỆU<br />LÊN
              </h2>
            </div>

            {/* Hidden Input for Click to Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.pptx,.ppt,.docx,.doc,.txt"
            />

            {/* Dashed Upload Drop Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[#8bc5ef] rounded-2xl py-8 px-4 flex items-center justify-center gap-6 bg-[#fbfdff] hover:bg-[#f2f8fe] cursor-pointer transition-colors group"
            >
              {/* Folder with Arrow Up */}
              <div className="relative flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform">
                <div className="w-16 h-13 bg-gradient-to-b from-[#60a5fa] to-[#2563eb] rounded-xl p-2.5 shadow-md flex items-center justify-center border-t border-blue-300">
                  <svg className="w-6 h-6 text-white stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className="absolute -top-1.5 left-2 w-6 h-2 bg-[#93c5fd] rounded-t-sm -z-0"></div>
              </div>

              {/* Documents Stack / Icons */}
              <div className="flex flex-col gap-2.5 items-center">
                {/* Diskette / Presentation file */}
                <div className="w-10 h-10 bg-[#fde047] rounded-lg p-1.5 shadow-sm border border-yellow-300 flex flex-col items-center justify-between">
                  <div className="w-6 h-2 bg-white rounded-xs"></div>
                  <span className="text-[9px] font-black text-rose-500 bg-white/90 px-1 rounded-sm">PPTX</span>
                </div>

                {/* PDF file */}
                <div className="w-11 h-12 bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8] rounded-lg p-1.5 shadow-md flex flex-col justify-between text-white border-t border-blue-400">
                  <div className="w-3 h-3 bg-white/30 rounded-xs self-end"></div>
                  <div className="text-[9px] font-bold tracking-tight bg-white/20 px-1 py-0.5 rounded text-center">.PDF</div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[#00629b] font-medium px-1">
              <span>Chạm hoặc kéo thả PDF, PPTX y khoa</span>
              <span className="underline font-bold" onClick={(e) => { e.stopPropagation(); onTriggerUpload(); }}>
                Tải file mẫu
              </span>
            </div>
          </div>
        </section>
        {/* END: UploadCard */}

        {/* BEGIN: FeatureCards */}
        <section className="px-5 flex flex-col gap-3.5 pb-6" data-purpose="feature-list">
          {/* 1. AI Summary Card */}
          <button
            onClick={() => onNavigate('summary')}
            className="w-full flex items-center justify-between bg-[#e5f1fb] hover:bg-[#d8eaf9] active:scale-[0.99] transition p-3 rounded-[20px] shadow-sm border border-[#d2e7f8] text-left"
            type="button"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-white rounded-[16px] flex items-center justify-center inner-icon-shadow">
                <svg className="w-6 h-6 text-[#006ca8]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div>
                <span className="text-[17px] font-bold text-[#0c1f38] block">AI Summary</span>
                <span className="text-[12px] text-slate-600 font-medium">Tóm tắt &amp; sơ đồ quang hợp y khoa</span>
              </div>
            </div>
            {/* Chevron Right */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#006ca8] pr-1">
              <svg className="w-5 h-5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </button>

          {/* AI Chatbot Card - Vấn đáp dựa trên tài liệu & học tập */}
          <button
            onClick={() => onNavigate('chatbot')}
            className="w-full flex items-center justify-between bg-[#eff6ff] hover:bg-[#e0effe] active:scale-[0.99] transition p-3 rounded-[20px] shadow-sm border border-[#bfdbfe] text-left"
            type="button"
          >
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-white rounded-[16px] flex items-center justify-center inner-icon-shadow relative">
                <svg className="w-6 h-6 text-[#00288e]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 0 1 2 2v1h-4V4a2 2 0 0 1 2-2z" strokeLinecap="round" />
                  <rect x="4" y="5" width="16" height="13" rx="3" />
                  <circle cx="9" cy="11" r="1.3" fill="currentColor" />
                  <circle cx="15" cy="11" r="1.3" fill="currentColor" />
                  <path d="M9 15c1 0.9 5 0.9 6 0" strokeLinecap="round" />
                  <path d="M2 11h2M20 11h2" strokeLinecap="round" />
                </svg>
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#00288e] text-white text-[9px] font-bold rounded-full">AI</span>
              </div>
              <div>
                <span className="text-[17px] font-bold text-[#0c1f38] block">AI Chatbot Vấn Đáp</span>
                <span className="text-[12px] text-slate-600 font-medium">Vấn đáp dựa trên tài liệu tải lên &amp; dữ liệu học</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#00288e] pr-1">
              <svg className="w-5 h-5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </button>

          {/* 2. AI Question Card */}
          <button
            onClick={() => onNavigate('practice')}
            className="w-full flex items-center justify-between bg-[#e7f7eb] hover:bg-[#dbf3e1] active:scale-[0.99] transition p-3 rounded-[20px] shadow-sm border border-[#d2f0da] text-left"
            type="button"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-white rounded-[16px] flex items-center justify-center inner-icon-shadow relative">
                <svg className="w-6 h-6 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] absolute top-2 left-2"></div>
              </div>
              <div>
                <span className="text-[17px] font-bold text-[#0c1f38] block">AI Question</span>
                <span className="text-[12px] text-slate-600 font-medium">Trắc nghiệm &amp; Flashcard SM-2</span>
              </div>
            </div>
            {/* Chevron Right */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#22c55e] pr-1">
              <svg className="w-5 h-5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </button>

          {/* 3. AI Reminder Card */}
          <button
            onClick={() => onNavigate('planner')}
            className="w-full flex items-center justify-between bg-[#fef0df] hover:bg-[#fde6ce] active:scale-[0.99] transition p-3 rounded-[20px] shadow-sm border border-[#fde2c4] text-left"
            type="button"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-white rounded-[16px] flex items-center justify-center inner-icon-shadow relative">
                <svg className="w-6 h-6 text-[#f97316]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                </svg>
                {/* Badge "1" */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#dc2626] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">1</span>
              </div>
              <div>
                <span className="text-[17px] font-bold text-[#0c1f38] block">AI Reminder</span>
                <span className="text-[12px] text-slate-600 font-medium">Báo trước kỳ thi Sinh học (Còn 3 ngày)</span>
              </div>
            </div>
            {/* Chevron Right */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#f97316] pr-1">
              <svg className="w-5 h-5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </button>

          {/* 4. AI Planner Card */}
          <button
            onClick={() => onNavigate('planner-detail')}
            className="w-full flex items-center justify-between bg-[#f1ebfc] hover:bg-[#e7defa] active:scale-[0.99] transition p-3 rounded-[20px] shadow-sm border border-[#e3d7fa] text-left"
            type="button"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-white rounded-[16px] flex items-center justify-center inner-icon-shadow">
                <svg className="w-6 h-6 text-[#9333ea]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div>
                <span className="text-[17px] font-bold text-[#0c1f38] block">AI Planner</span>
                <span className="text-[12px] text-slate-600 font-medium">Kế hoạch 3 ngày ôn tập trọng tâm</span>
              </div>
            </div>
            {/* Chevron Right */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#9333ea] pr-1">
              <svg className="w-5 h-5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </button>
        </section>
        {/* END: FeatureCards */}
      </div>
    </div>
  );
};
