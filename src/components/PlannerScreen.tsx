import React, { useState } from 'react';
import { ScreenType } from '../types';

interface PlannerScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenSettings: () => void;
  userAvatar?: string;
}

export const PlannerScreen: React.FC<PlannerScreenProps> = ({
  onNavigate,
  onOpenSettings,
  userAvatar,
}) => {
  const [monDone, setMonDone] = useState(false);
  const [reminders, setReminders] = useState({
    spacedRepetition: true,
    deadlineAlert: true,
    streakMotivation: true,
  });

  const toggleReminder = (key: keyof typeof reminders) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
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
            <span className="text-[11px] text-slate-500 font-semibold leading-none mt-1">Lộ Trình</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
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
        {/* Goal Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00288e] to-[#1e40af] p-4 shadow-md text-white">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#5bb8fe]/20 blur-xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-[#d3e4fe] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  flag
                </span>
                Mục tiêu kích hoạt
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#6ffbbe] font-extrabold">
                <span className="material-symbols-outlined text-[15px]">timer</span>
                Còn 5 ngày
              </span>
            </div>

            <h2 className="text-[20px] font-bold text-white tracking-tight">
              Ôn thi Sinh học Đại cương
            </h2>
            <p className="text-[12px] text-[#b8c4ff]">
              Trọng tâm: Quang hợp &amp; Hô hấp tế bào
            </p>

            <div className="mt-1 pt-1 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/80 font-medium">Tiến độ kỳ học</span>
                <span className="font-bold text-[#6ffbbe]">65% hoàn thành</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-[#6ffbbe] transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Study Stat Mini Card */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#e5eeff]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-[#006398]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <span className="absolute material-symbols-outlined text-[20px] text-[#006398]">hourglass_top</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 font-medium">Thời gian học hôm nay</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-extrabold text-[#0b1c30]">45</span>
                <span className="text-[12px] text-slate-500 font-medium">/ 60 phút</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#006398] font-bold">
              <span className="material-symbols-outlined text-[16px] text-amber-500">local_fire_department</span>
              7 ngày streak
            </span>
            <span className="text-[11px] text-slate-500">Còn 15p đạt chuẩn</span>
          </div>
        </div>

        {/* Weekly Timeline Section (AI Planner) */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00288e]"></span>
              <h3 className="text-[15px] font-bold text-[#0b1c30]">Lộ trình tuần thông minh</h3>
            </div>
            <button
              onClick={() => onNavigate('planner-detail')}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#00288e] text-[11px] font-bold hover:bg-[#cce5ff] transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
              AI Planner
            </button>
          </div>

          {/* Timeline List */}
          <div className="relative flex flex-col gap-3 pl-3">
            {/* Vertical guide line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-[#dce9ff] -z-0"></div>

            {/* Monday (Today - Active) */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#00288e] flex items-center justify-center text-white shadow-xs flex-shrink-0 mt-2">
                <span className="material-symbols-outlined text-[14px]">edit_calendar</span>
              </div>
              <div className="w-full rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#00288e] text-white text-[11px] font-bold">Thứ 2</span>
                    <span className="text-[11px] text-[#00288e] font-bold">Hôm nay</span>
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 30 phút
                  </span>
                </div>
                <p className="text-[14px] font-bold text-[#0b1c30]">
                  Ôn Quang hợp + Làm Quiz 15 câu
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#00288e] text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] animate-pulse"></span>
                    Đang diễn ra
                  </span>
                  <button
                    onClick={() => setMonDone(!monDone)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors shadow-xs flex items-center gap-1 ${
                      monDone
                        ? 'bg-[#6ffbbe] text-[#002113]'
                        : 'bg-[#00288e] text-white hover:bg-[#1e40af]'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {monDone ? 'task_alt' : 'check_circle'}
                    </span>
                    {monDone ? 'Đã xong!' : 'Hoàn thành'}
                  </button>
                </div>
              </div>
            </div>

            {/* Wednesday */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#dce9ff] flex items-center justify-center text-slate-600 flex-shrink-0 mt-2">
                <span className="material-symbols-outlined text-[13px]">calendar_today</span>
              </div>
              <div className="w-full rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[11px] font-bold">Thứ 4</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 30 phút
                  </span>
                </div>
                <p className="text-[13px] font-bold text-[#0b1c30]">
                  Ôn Hô hấp tế bào &amp; Ty thể + Tạo 10 Flashcards
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-slate-600 text-[11px] font-medium">
                    Flashcards • Tế bào học
                  </span>
                </div>
              </div>
            </div>

            {/* Friday */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#dce9ff] flex items-center justify-center text-slate-600 flex-shrink-0 mt-2">
                <span className="material-symbols-outlined text-[13px]">assignment</span>
              </div>
              <div className="w-full rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[11px] font-bold">Thứ 6</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 45 phút
                  </span>
                </div>
                <p className="text-[13px] font-bold text-[#0b1c30]">
                  Ôn tập tổng hợp chu trình Calvin &amp; Krebs + Làm đề kiểm tra thử 30 câu
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-slate-600 text-[11px] font-medium">
                    Đề thi thử • 30 câu
                  </span>
                </div>
              </div>
            </div>

            {/* Sunday */}
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#dce9ff] flex items-center justify-center text-slate-600 flex-shrink-0 mt-2">
                <span className="material-symbols-outlined text-[13px]">fact_check</span>
              </div>
              <div className="w-full rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[11px] font-bold">Chủ nhật</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 20 phút
                  </span>
                </div>
                <p className="text-[13px] font-bold text-[#0b1c30]">
                  Rà soát lại danh sách các câu đã làm sai (Mistake Bank)
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-slate-600 text-[11px] font-medium">
                    Sửa lỗi sai • Tối ưu hóa điểm
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Link to Detailed Schedule & 4 Steps */}
          <button
            onClick={() => onNavigate('planner-detail')}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#00288e]/60 text-[#00288e] bg-[#eff4ff] text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Mở Bảng lịch học chi tiết 3 ngày &amp; 4 Bước chuẩn</span>
          </button>
        </div>

        {/* AI Reminder Management Section */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006398]"></span>
              <h3 className="text-[15px] font-bold text-[#0b1c30]">Quản lý Lời nhắc AI</h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006398] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px]">notifications_active</span>
              Reminder
            </span>
          </div>

          {/* Exam Countdown Alert Banner */}
          <div className="rounded-2xl bg-[#dce9ff]/70 p-4 shadow-sm border border-blue-200/60 flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#006398]"></div>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006398] shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">event_upcoming</span>
                </span>
                <span className="text-[11px] font-bold text-[#006398] uppercase tracking-wider">
                  Kỳ thi quan trọng
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#006398] text-white text-[11px] font-bold">
                Còn 3 ngày
              </span>
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <h4 className="text-[15px] font-bold text-[#0b1c30]">
                Kỳ thi Đánh giá Sinh học Tế bào
              </h4>
              <p className="text-[12px] text-slate-600 flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                Thứ Sáu, 20/06 - 08:00
              </p>
              <p className="text-[12px] text-slate-600 flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[15px]">meeting_room</span>
                Phòng 302 - Giảng đường A
              </p>
            </div>
          </div>

          {/* Personalized Toggles Container */}
          <div className="rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col gap-2">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider px-1 font-bold">
              Cài đặt nhắc nhở tự động
            </span>

            {/* Setting 1: Spaced Repetition */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#00288e] flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#0b1c30] truncate">Nhắc ôn Spaced Repetition</span>
                  <span className="text-[11px] text-slate-500">Hằng ngày lúc 20:30</span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reminders.spacedRepetition}
                onClick={() => toggleReminder('spacedRepetition')}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  reminders.spacedRepetition ? 'bg-[#00288e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    reminders.spacedRepetition ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* Setting 2: Deadline Alert */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#006398] flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#0b1c30] truncate">Cảnh báo sát hạn bài tập</span>
                  <span className="text-[11px] text-slate-500">Trước hạn 24 giờ</span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reminders.deadlineAlert}
                onClick={() => toggleReminder('deadlineAlert')}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  reminders.deadlineAlert ? 'bg-[#00288e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    reminders.deadlineAlert ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* Setting 3: Streak Motivation */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#00563a] flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#0b1c30] truncate">Lời động viên &amp; Duy trì streak</span>
                  <span className="text-[11px] text-slate-500">07:30 mỗi sáng</span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reminders.streakMotivation}
                onClick={() => toggleReminder('streakMotivation')}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  reminders.streakMotivation ? 'bg-[#00288e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    reminders.streakMotivation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
