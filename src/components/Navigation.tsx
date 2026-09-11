import React from 'react';
import { ScreenType } from '../types';

interface NavigationProps {
  currentScreen: ScreenType;
  userAvatar?: string;
  onNavigate: (screen: ScreenType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, userAvatar, onNavigate }) => {
  // Navigation tabs matching the app structure:
  // 1. Trang chủ (Home)
  // 2. Tóm tắt (Summary)
  // 3. Hỏi AI (Chatbot Copilot)
  // 4. Ôn tập (Practice)
  // 5. Lộ trình (Planner / Planner-Detail)
  // 6. Thư viện (Library)
  // 7. Hồ sơ (Profile)
  const navItems = [
    {
      key: 'home' as ScreenType,
      label: 'Trang chủ',
      isActive: currentScreen === 'home',
      icon: (active: boolean) => (
        <svg
          className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1V9.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: 'summary' as ScreenType,
      label: 'Tóm tắt',
      isActive: currentScreen === 'summary',
      icon: (active: boolean) => (
        <svg
          className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 3.5L11.5 8a1.5 1.5 0 0 0 1 1l4.5 1.5-4.5 1.5a1.5 1.5 0 0 0-1 1L10 17.5 8.5 13a1.5 1.5 0 0 0-1-1L3 10.5l4.5-1.5a1.5 1.5 0 0 0 1-1L10 3.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 2.5L19.2 4.3a1 1 0 0 0 .7.7l1.8.7-1.8.7a1 1 0 0 0-.7.7l-.7 1.8-.7-1.8a1 1 0 0 0-.7-.7l-1.8-.7 1.8-.7a1 1 0 0 0 .7-.7l.7-1.8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: 'chatbot' as ScreenType,
      label: 'Hỏi AI',
      isActive: currentScreen === 'chatbot',
      icon: (active: boolean) => (
        <svg
          className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2a2 2 0 0 1 2 2v1h-4V4a2 2 0 0 1 2-2z"
            strokeLinecap="round"
          />
          <rect x="4" y="5" width="16" height="13" rx="3" />
          <circle cx="9" cy="11" r="1.3" fill="currentColor" />
          <circle cx="15" cy="11" r="1.3" fill="currentColor" />
          <path d="M9 15c1 0.9 5 0.9 6 0" strokeLinecap="round" />
          <path d="M2 11h2M20 11h2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: 'practice' as ScreenType,
      label: 'Ôn tập',
      isActive: currentScreen === 'practice',
      icon: (active: boolean) => (
        <svg
          className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M22 10v6M2 10l10-5 10 5-10 5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12v5c3 3 9 3 12 0v-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: 'planner' as ScreenType,
      label: 'Lộ trình',
      isActive: currentScreen === 'planner' || currentScreen === 'planner-detail',
      icon: (active: boolean) => (
        <svg
          className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2.5" ry="2.5" />
          <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
          <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      key: 'library' as ScreenType,
      label: 'Thư viện',
      isActive: currentScreen === 'library',
      icon: (active: boolean) => (
        <svg
          className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M2 4.5A2.5 2.5 0 0 1 4.5 2H11v17H4.5A2.5 2.5 0 0 0 2 21.5V4.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4.5A2.5 2.5 0 0 0 19.5 2H13v17h6.5A2.5 2.5 0 0 1 22 21.5V4.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="7" y1="6" x2="9" y2="6" strokeLinecap="round" />
          <line x1="7" y1="10" x2="9" y2="10" strokeLinecap="round" />
          <line x1="15" y1="6" x2="17" y2="6" strokeLinecap="round" />
          <line x1="15" y1="10" x2="17" y2="10" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: 'profile' as ScreenType,
      label: 'Hồ sơ',
      isActive: currentScreen === 'profile',
      icon: (active: boolean) => (
        userAvatar ? (
          <img
            src={userAvatar}
            alt="Hồ sơ"
            className={`w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full object-cover border ${
              active ? 'border-white' : 'border-slate-300'
            }`}
          />
        ) : (
          <svg
            className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path
              d="M5 20a7 7 0 0 1 14 0"
              strokeLinecap="round"
            />
          </svg>
        )
      ),
    },
  ];

  return (
    <nav
      aria-label="Thanh điều hướng chính MedStudy"
      className="w-full shrink-0 z-30 bg-white border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] select-none"
    >
      {/* 7 Tabs Container */}
      <div className="flex items-center justify-between px-1 sm:px-2 pt-1.5 pb-1 gap-0.5">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
              item.isActive
                ? 'bg-[#192434] text-white rounded-xl py-1 px-2 min-w-[46px] sm:min-w-[54px] shadow-xs'
                : 'text-[#516173] hover:text-[#192434] py-1 px-1 min-w-[42px] sm:min-w-[48px]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-center">
              {item.icon(item.isActive)}
            </div>
            <span
              className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 whitespace-nowrap ${
                item.isActive ? 'font-bold text-white' : 'font-semibold'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-28 sm:w-32 h-1 bg-[#cbd5e1] rounded-full mx-auto mt-0.5 mb-1 pointer-events-none"></div>
    </nav>
  );
};
