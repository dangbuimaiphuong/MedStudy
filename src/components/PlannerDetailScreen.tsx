import React, { useState } from 'react';
import { ScreenType, DaySchedule, ReminderSetting } from '../types';
import { INITIAL_SCHEDULE, INITIAL_REMINDERS } from '../data/mockData';

interface PlannerDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenSettings: () => void;
}

export const PlannerDetailScreen: React.FC<PlannerDetailScreenProps> = ({
  onNavigate,
  onOpenSettings,
}) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [selectedDayKey, setSelectedDayKey] = useState<'mon' | 'wed' | 'fri'>('mon');
  const [reminders, setReminders] = useState<ReminderSetting[]>(INITIAL_REMINDERS);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('16:00 - 16:30');
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newReminderTime, setNewReminderTime] = useState('22:00');
  const [newReminderTitle, setNewReminderTitle] = useState('Nhắc ôn đêm');

  const selectedDay = schedule.find((d) => d.dayKey === selectedDayKey) || schedule[0];
  const completedTasksCount = selectedDay.tasks.filter((t) => t.done).length;
  const totalTasksCount = selectedDay.tasks.length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const handleToggleTask = (taskId: string) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((day) => {
        if (day.dayKey === selectedDayKey) {
          return {
            ...day,
            tasks: day.tasks.map((task) =>
              task.id === taskId ? { ...task, done: !task.done } : task
            ),
          };
        }
        return day;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      time: newTaskTime,
      title: newTaskTitle.trim(),
      done: false,
    };

    setSchedule((prevSchedule) =>
      prevSchedule.map((day) => {
        if (day.dayKey === selectedDayKey) {
          return {
            ...day,
            tasks: [...day.tasks, newTask],
          };
        }
        return day;
      })
    );

    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const handleToggleReminder = (reminderId: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminderId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTime) return;

    const newRem: ReminderSetting = {
      id: `rem-${Date.now()}`,
      title: newReminderTitle.trim() || 'Nhắc học tập',
      time: newReminderTime,
      enabled: true,
      icon: 'alarm',
      type: 'custom',
    };

    setReminders((prev) => [...prev, newRem]);
    setShowAddReminderModal(false);
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-5 pt-3 pb-6">
      {/* Header with Back button, Title & Settings */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-xs mb-3 border border-slate-100">
        <button
          onClick={() => onNavigate('planner')}
          aria-label="Quay lại"
          className="w-9 h-9 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-[17px] text-[#0b1c30] font-bold tracking-tight">AI Planner &amp; Reminder</h1>
          <span className="text-[11px] text-[#00288e] font-semibold">Lộ trình học tập cá nhân hóa</span>
        </div>

        <button
          onClick={onOpenSettings}
          aria-label="Cài đặt"
          className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-[#00288e] hover:bg-slate-100 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>
      </header>

      <div className="flex flex-col gap-4">
        {/* 1. Intro Card (Style IMAGE_4 & IMAGE_5) */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#00288e] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  menu_book
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#00288e] uppercase tracking-wider">
                  AI PLANNER • MEDSTUDY
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Kế hoạch thông minh theo mục tiêu</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200/60">
              <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                notifications_active
              </span>
              Nhắc nhở bật
            </span>
          </div>

          {/* Target Info */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">flag</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Mục tiêu ôn tập</span>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <h2 className="text-[15px] font-bold text-[#0b1c30] leading-snug">
                  Ôn thi Sinh học: Quang hợp &amp; Hô hấp tế bào
                </h2>
                <span className="inline-flex text-base">🙌🎓</span>
              </div>
            </div>
          </div>

          {/* Date & Duration Info */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="material-symbols-outlined text-rose-500 text-[20px]">calendar_month</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-medium">Hôm nay</span>
                <span className="text-[12px] font-bold text-[#0b1c30]">Thứ Hai, 16/06/2025</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/60 border border-blue-100/60">
              <span className="material-symbols-outlined text-[#00288e] text-[20px]">timelapse</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#00288e]/80 font-medium">Thời lượng lộ trình</span>
                <span className="text-[12px] font-bold text-[#00288e]">3 ngày trọng tâm</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Detailed Interactive Schedule Table */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00288e] text-[20px]">calendar_today</span>
              <h3 className="text-[15px] font-bold text-[#0b1c30]">Bảng lịch học tuần chi tiết</h3>
            </div>
            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
              Tuần 24
            </span>
          </div>
          <p className="text-[12px] text-slate-500 italic -mt-1">
            Bấm vào ngày để thêm công việc &amp; xem chi tiết công việc ngày đó:
          </p>

          {/* Date selector tabs */}
          <div className="grid grid-cols-3 gap-2">
            {/* Mon Tab */}
            <button
              onClick={() => setSelectedDayKey('mon')}
              className={`border rounded-xl p-2 flex flex-col items-center justify-center transition-all ${
                selectedDayKey === 'mon'
                  ? 'border-2 border-[#00288e] bg-[#00288e] text-white shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
              type="button"
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90">Thứ 2</span>
              <span className="text-[13px] font-bold mt-0.5">16/06/2025</span>
              <span
                className={`mt-1 px-1.5 py-0.2 rounded text-[10px] font-medium leading-tight ${
                  selectedDayKey === 'mon' ? 'bg-white/20 text-white' : 'text-slate-500'
                }`}
              >
                Hôm nay
              </span>
            </button>

            {/* Wed Tab */}
            <button
              onClick={() => setSelectedDayKey('wed')}
              className={`border rounded-xl p-2 flex flex-col items-center justify-center transition-all ${
                selectedDayKey === 'wed'
                  ? 'border-2 border-[#00288e] bg-[#00288e] text-white shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
              type="button"
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90">Thứ 4</span>
              <span className="text-[13px] font-bold mt-0.5">18/06/2025</span>
              <span
                className={`mt-1 px-1.5 py-0.2 rounded text-[10px] font-medium leading-tight ${
                  selectedDayKey === 'wed' ? 'bg-white/20 text-white' : 'text-slate-500'
                }`}
              >
                30 phút
              </span>
            </button>

            {/* Fri Tab */}
            <button
              onClick={() => setSelectedDayKey('fri')}
              className={`border rounded-xl p-2 flex flex-col items-center justify-center transition-all ${
                selectedDayKey === 'fri'
                  ? 'border-2 border-[#00288e] bg-[#00288e] text-white shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
              type="button"
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90">Thứ 6</span>
              <span className="text-[13px] font-bold mt-0.5">20/06/2025</span>
              <span
                className={`mt-1 px-1.5 py-0.2 rounded text-[10px] font-medium leading-tight ${
                  selectedDayKey === 'fri' ? 'bg-white/20 text-white' : 'text-slate-500'
                }`}
              >
                45 phút
              </span>
            </button>
          </div>

          {/* Table View */}
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="p-2.5 font-bold">Ngày</th>
                  <th className="p-2.5 font-bold">Nội dung ôn tập</th>
                  <th className="p-2.5 font-bold text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.map((day) => {
                  const isCurrent = day.dayKey === selectedDayKey;
                  return (
                    <tr
                      key={day.dayKey}
                      onClick={() => setSelectedDayKey(day.dayKey as any)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent ? 'bg-blue-50/50 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className={`p-2.5 whitespace-nowrap ${isCurrent ? 'text-[#00288e] font-bold' : 'text-slate-700'}`}>
                        {day.dayName} ({day.dateFull.slice(0, 5)})
                        {isCurrent && (
                          <span className="block text-[10px] font-normal text-[#00288e]/80">Đang chọn</span>
                        )}
                      </td>
                      <td className="p-2.5 text-[#0b1c30]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#00288e]">
                            {day.dayKey === 'mon' ? 'edit_note' : day.dayKey === 'wed' ? 'psychology' : 'assignment'}
                          </span>
                          <span className="truncate">{day.topic}</span>
                        </div>
                      </td>
                      <td
                        className={`p-2.5 text-right whitespace-nowrap ${
                          isCurrent ? 'text-[#00288e] font-bold' : 'text-slate-500 font-medium'
                        }`}
                      >
                        {day.duration}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#00288e]/60 text-[#00288e] bg-[#00288e]/5 text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#00288e]/10 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Thêm công việc vào {selectedDay.dateFull}</span>
          </button>

          {/* Motivational note card */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 p-2.5 flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <p className="text-[12px] font-medium text-emerald-900 leading-snug">
              <span className="font-bold">Kiên trì mỗi ngày</span> — Tích lũy nhỏ, thành công lớn! Chúc bạn có buổi học tập hiệu quả.
            </p>
          </div>
        </div>

        {/* 3. Selected Day Detailed Tasks Box */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#00288e] flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-[18px]">checklist</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0b1c30]">
                  Chi tiết công việc ngày {selectedDay.dateFull}
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  Tiến độ: {completedTasksCount}/{totalTasksCount} công việc đã hoàn tất
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              {completionPercentage}% Đạt
            </span>
          </div>

          {/* Task List items */}
          <div className="flex flex-col gap-2">
            {selectedDay.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                  task.done
                    ? 'bg-emerald-50/50 border-emerald-200/70'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 pr-2">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      task.done ? 'bg-emerald-600 text-white' : 'border-2 border-slate-400 bg-white'
                    }`}
                    type="button"
                  >
                    {task.done && <span className="material-symbols-outlined text-[15px]">check</span>}
                  </button>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-[11px] font-bold ${
                        task.done ? 'text-emerald-800' : 'text-[#00288e]'
                      }`}
                    >
                      {task.time}
                    </span>
                    <span
                      className={`text-[13px] font-semibold text-[#0b1c30] truncate ${
                        task.done ? 'line-through opacity-80 text-slate-500' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                    task.done ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {task.done ? 'Hoàn thành' : 'Đang chờ'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. AI Reminder Section with custom time frames */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  notifications_active
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-[#0b1c30]">AI Reminder - Nhắc nhở theo khung giờ</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#00288e] text-[11px] font-semibold">
              Tự động hóa
            </span>
          </div>

          {/* Notification preview bubble 1 */}
          <div className="rounded-xl bg-blue-50/80 border border-blue-200/70 p-3 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0 mt-0.5">🔔</span>
            <div className="flex flex-col text-[12px] leading-relaxed">
              <span className="font-bold text-[#00288e]">Nhắc nhở học tập hôm nay:</span>
              <span className="text-slate-700">
                Đã đến lúc ôn lại bài <strong>"Quang hợp"</strong> 🌱. Dành 10 phút xem lại tóm tắt và làm Quiz nhé!
              </span>
            </div>
          </div>

          {/* Notification preview bubble 2 (Exam countdown) */}
          <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-3 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0 mt-0.5">⏰</span>
            <div className="flex flex-col text-[12px] leading-relaxed">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-amber-900 uppercase text-[11px]">
                  NHẮC NHỞ LỊCH THI: SẮP ĐẾN KỲ THI RỒI!
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-600 text-white text-[10px] font-bold">
                  Còn 3 ngày
                </span>
              </div>
              <span className="text-slate-700 mt-0.5">
                Bài thi Sinh học vào <strong>Thứ Sáu, 20/06/2025 - 08:00</strong> (Phòng 302 - Giảng đường A). Hãy giữ tinh thần tự tin nhé!
              </span>
            </div>
          </div>

          {/* Time configuration toggles */}
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              Cài đặt nhắc nhở theo khung giờ cá nhân
            </span>

            {reminders.map((rem) => (
              <div
                key={rem.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#00288e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[17px]">{rem.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#0b1c30]">{rem.title}</span>
                    <span className="text-[11px] text-slate-500">
                      Khung giờ: <strong className="text-[#00288e] font-mono font-bold">[ {rem.time} ]</strong>
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={rem.enabled}
                  onClick={() => handleToggleReminder(rem.id)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                    rem.enabled ? 'bg-[#00288e]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                      rem.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
            ))}

            {/* Custom time add button */}
            <button
              onClick={() => setShowAddReminderModal(true)}
              className="w-full py-2 rounded-xl border border-slate-300 text-slate-600 text-[12px] font-bold flex items-center justify-center gap-1 hover:bg-slate-50 hover:text-[#00288e] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">alarm_add</span>
              + Thêm khung giờ nhắc nhở mới
            </button>
          </div>
        </div>

        {/* 5. 4 Steps Section (Kế hoạch hiệu quả với AI Planner - Style IMAGE_4) */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00288e]"></span>
              <h3 className="text-[14px] font-bold text-[#0b1c30] uppercase tracking-wide">
                Kế hoạch hiệu quả với AI Planner
              </h3>
            </div>
            <span className="text-[11px] text-[#00288e] font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              4 Bước Chuẩn
            </span>
          </div>

          {/* 4 Step Cards Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Step 1 */}
            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col gap-1.5 relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-[#00288e] px-1.5 py-0.2 bg-white rounded-md shadow-2xs">
                B1
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#00288e] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">ads_click</span>
              </div>
              <span className="text-[12px] font-bold text-[#0b1c30] leading-tight">Xác định mục tiêu</span>
              <span className="text-[11px] text-slate-500">Chọn môn và chủ đề trọng tâm cần ôn</span>
            </div>

            {/* Step 2 */}
            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col gap-1.5 relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-[#00288e] px-1.5 py-0.2 bg-white rounded-md shadow-2xs">
                B2
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#006398] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
              </div>
              <span className="text-[12px] font-bold text-[#0b1c30] leading-tight">Lập kế hoạch 3 ngày</span>
              <span className="text-[11px] text-slate-500">Phân bổ lộ trình và thời lượng từng buổi</span>
            </div>

            {/* Step 3 */}
            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col gap-1.5 relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-[#00288e] px-1.5 py-0.2 bg-white rounded-md shadow-2xs">
                B3
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#00563a] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
              </div>
              <span className="text-[12px] font-bold text-[#0b1c30] leading-tight">Thực hiện đúng nội dung</span>
              <span className="text-[11px] text-slate-500">Bám sát Quiz, lý thuyết và làm bài test</span>
            </div>

            {/* Step 4 */}
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-1.5 relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-amber-800 px-1.5 py-0.2 bg-white rounded-md shadow-2xs">
                B4
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  emoji_events
                </span>
              </div>
              <span className="text-[12px] font-bold text-[#0b1c30] leading-tight">Ôn tập hiệu quả</span>
              <span className="text-[11px] text-amber-900 font-bold">Đạt kết quả thi cao 🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-[15px] font-bold text-[#0b1c30]">
                Thêm công việc vào {selectedDay.dayName}
              </h4>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddTask} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Khung giờ thực hiện
                </label>
                <input
                  type="text"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  placeholder="Ví dụ: 15:00 - 15:30"
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e]"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Nội dung công việc
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Ví dụ: Ôn 15 câu trắc nghiệm quang hợp"
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e]"
                  required
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-[12px] font-bold bg-[#00288e] text-white hover:bg-[#1e40af] shadow-xs"
                >
                  Thêm công việc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-[15px] font-bold text-[#0b1c30]">Thêm khung giờ nhắc nhở mới</h4>
              <button
                onClick={() => setShowAddReminderModal(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddReminder} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Tên thông báo
                </label>
                <input
                  type="text"
                  value={newReminderTitle}
                  onChange={(e) => setNewReminderTitle(e.target.value)}
                  placeholder="Ví dụ: Nhắc ôn bài trước khi ngủ"
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e]"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Giờ hẹn (HH:mm)
                </label>
                <input
                  type="time"
                  value={newReminderTime}
                  onChange={(e) => setNewReminderTime(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e]"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReminderModal(false)}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-[12px] font-bold bg-[#00288e] text-white hover:bg-[#1e40af] shadow-xs"
                >
                  Kích hoạt nhắc nhở
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
