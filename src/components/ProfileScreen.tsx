import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../types';
import { AvatarModal } from './AvatarModal';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);
  const [tempEmail, setTempEmail] = useState(userProfile.email);
  const [tempStudentId, setTempStudentId] = useState(userProfile.studentId);
  const [tempCohort, setTempCohort] = useState(userProfile.cohort);
  const [tempAcademicTrack, setTempAcademicTrack] = useState(userProfile.academicTrack);
  const [dailyGoal, setDailyGoal] = useState(userProfile.dailyGoalMinutes || 60);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSpacedRep, setAutoSpacedRep] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync temp states if userProfile prop updates externally
  React.useEffect(() => {
    setTempName(userProfile.name);
    setTempEmail(userProfile.email);
    setTempStudentId(userProfile.studentId);
    setTempCohort(userProfile.cohort);
    setTempAcademicTrack(userProfile.academicTrack);
    setDailyGoal(userProfile.dailyGoalMinutes || 60);
  }, [userProfile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: tempName.trim() || userProfile.name,
      email: tempEmail.trim() || userProfile.email,
      studentId: tempStudentId.trim() || userProfile.studentId,
      cohort: tempCohort.trim() || userProfile.cohort,
      academicTrack: tempAcademicTrack,
      dailyGoalMinutes: dailyGoal,
    });
    setIsEditing(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleUpdateAvatar = (newAvatar: string) => {
    onUpdateProfile({ avatar: newAvatar });
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-5 pt-3 pb-6">
      {/* Top Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-xs mb-3 border border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00288e] flex items-center justify-center text-white font-bold">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#00288e] leading-none">MedStudy</span>
            <span className="text-[11px] text-slate-500 font-semibold leading-none mt-1">Hồ sơ sinh viên</span>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 text-[#00288e] text-[12px] font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isEditing ? 'close' : 'edit'}
          </span>
          <span>{isEditing ? 'Đóng' : 'Chỉnh sửa'}</span>
        </button>
      </header>

      {showSavedToast && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] font-bold flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Đã lưu thông tin hồ sơ sinh viên thành công!</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Student Profile Card with Avatar Editing */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-50/60 pointer-events-none"></div>

          <div className="flex items-center gap-3.5 relative z-10">
            {/* Clickable Avatar with Camera Trigger */}
            <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-[#00288e]/20 group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00288e] to-[#007cb9] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Edit Icon Overlay Badge */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAvatarModalOpen(true);
                }}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00288e] text-white flex items-center justify-center border-2 border-white shadow-xs hover:bg-[#1e40af] transition-colors"
                title="Chỉnh sửa ảnh đại diện"
              >
                <span className="material-symbols-outlined text-[13px]">photo_camera</span>
              </button>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[17px] font-bold text-[#0b1c30] truncate">{userProfile.name}</h2>
                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-[#00288e] text-[10px] font-bold">
                  {userProfile.academicTrack.split(' ')[0] || 'Y1'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium truncate">{userProfile.email}</span>
              <div className="flex items-center justify-between gap-1 mt-0.5">
                <span className="text-[11px] text-[#00288e] font-semibold truncate">
                  {userProfile.academicTrack}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="text-[11px] font-bold text-[#00288e] hover:underline flex items-center gap-0.5 shrink-0"
                >
                  <span className="material-symbols-outlined text-[13px]">image</span>
                  Đổi ảnh
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100 text-[11px]">
            <div className="flex flex-col">
              <span className="text-slate-400">Mã sinh viên (MSSV):</span>
              <span className="font-mono font-bold text-[#00288e] text-[12px]">{userProfile.studentId}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400">Niên khóa:</span>
              <span className="font-semibold text-slate-700">{userProfile.cohort}</span>
            </div>
          </div>
        </div>

        {/* Edit Form (Collapsible) */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="rounded-2xl bg-white p-4 shadow-sm border-2 border-[#00288e]/30 flex flex-col gap-3 animate-fade-in"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#00288e]">manage_accounts</span>
                <h3 className="text-[14px] font-bold text-[#00288e]">Chỉnh sửa thông tin sinh viên</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#00288e] text-[11px] font-bold hover:bg-blue-100 flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                <span>Đổi ảnh</span>
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Họ &amp; Tên hiển thị <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50"
                placeholder="Ví dụ: Đặng Bùi Mai Phương"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Email sinh viên <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50"
                placeholder="Ví dụ: dangbuimaiphuong@gmail.com"
                required
              />
            </div>

            {/* Student ID & Cohort in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Mã sinh viên (MSSV) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={tempStudentId}
                  onChange={(e) => setTempStudentId(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50 font-mono"
                  placeholder="Ví dụ: MED-2024-889"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Niên khóa <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={tempCohort}
                  onChange={(e) => setTempCohort(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50"
                  placeholder="Ví dụ: 2024 - 2030 (K120)"
                  required
                />
              </div>
            </div>

            {/* Academic Track */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Chuyên ngành y khoa</label>
              <select
                value={tempAcademicTrack}
                onChange={(e) => setTempAcademicTrack(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-white cursor-pointer"
              >
                <option value="Y1 - Bác sĩ Đa khoa">Y1 - Bác sĩ Đa khoa (Học kỳ 2)</option>
                <option value="Y2 - Bác sĩ Đa khoa">Y2 - Bác sĩ Đa khoa</option>
                <option value="Y3 - Bác sĩ Lâm sàng">Y3 - Bác sĩ Lâm sàng</option>
                <option value="Y4 - Bác sĩ Nội - Ngoại">Y4 - Bác sĩ Nội - Ngoại</option>
                <option value="Y5 - Bác sĩ Sản - Nhi">Y5 - Bác sĩ Sản - Nhi</option>
                <option value="Y6 - Thực tập Lâm sàng tốt nghiệp">Y6 - Thực tập Lâm sàng tốt nghiệp</option>
                <option value="Dược học Lâm sàng">Dược học Lâm sàng</option>
                <option value="Răng Hàm Mặt">Răng Hàm Mặt</option>
                <option value="Điều dưỡng đa khoa">Điều dưỡng đa khoa</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-[12px] font-bold bg-[#00288e] text-white hover:bg-[#1e40af] shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </form>
        )}

        {/* Learning Metrics Grid */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#0b1c30]">Chỉ số học tập tuần này</h3>
            <span className="text-[11px] text-slate-400 font-medium">Cập nhật theo thời gian thực</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Streak */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px] text-amber-600">
                  local_fire_department
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-extrabold text-[#0b1c30]">7 Ngày</span>
                <span className="text-[11px] text-amber-900 font-semibold">Streak liên tục</span>
              </div>
            </div>

            {/* Daily Study Time */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#00288e] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">hourglass_top</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-extrabold text-[#0b1c30]">45 / 60p</span>
                <span className="text-[11px] text-[#00288e] font-semibold">Thời gian hôm nay</span>
              </div>
            </div>

            {/* Flashcards Mastered */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">style</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-extrabold text-[#0b1c30]">18 Thẻ</span>
                <span className="text-[11px] text-emerald-800 font-semibold">Đã ôn Spaced Rep</span>
              </div>
            </div>

            {/* Quiz Accuracy */}
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/60 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-extrabold text-[#0b1c30]">80% Đúng</span>
                <span className="text-[11px] text-indigo-800 font-semibold">Độ chính xác Quiz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Badges & Achievements */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">military_tech</span>
              </div>
              <h3 className="text-[14px] font-bold text-[#0b1c30]">Huy hiệu &amp; Thành tích</h3>
            </div>
            <span className="text-[11px] text-[#00288e] font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              4/6 Mở khóa
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <div className="flex flex-col">
                <strong className="text-[#0b1c30] text-[12px]">Bác sĩ tương lai</strong>
                <span className="text-[10px] text-slate-500">Đạt 80% câu hỏi Quiz</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div className="flex flex-col">
                <strong className="text-[#0b1c30] text-[12px]">Chuyên cần 7 ngày</strong>
                <span className="text-[10px] text-slate-500">Học không ngắt quãng</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <div className="flex flex-col">
                <strong className="text-[#0b1c30] text-[12px]">Bậc thầy Quang hợp</strong>
                <span className="text-[10px] text-slate-500">Hoàn thành Ch.4 Lục lạp</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
              <span className="text-xl">⏱️</span>
              <div className="flex flex-col">
                <strong className="text-[#0b1c30] text-[12px]">Kỷ luật 3 ngày</strong>
                <span className="text-[10px] text-slate-500">Theo sát AI Planner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Settings Toggles */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <h3 className="text-[14px] font-bold text-[#0b1c30]">Cài đặt học tập &amp; Lời nhắc AI</h3>

          <div className="flex flex-col gap-2.5">
            {/* Daily Goal Slider */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-slate-700">Mục tiêu học mỗi ngày</span>
                <span className="font-bold text-[#00288e]">{dailyGoal} phút</span>
              </div>
              <input
                type="range"
                min={30}
                max={180}
                step={15}
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full accent-[#00288e]"
              />
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#0b1c30]">Âm thanh thông báo ôn tập</span>
                <span className="text-[11px] text-slate-500">Chuông nhắc học flashcard</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={soundEnabled}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  soundEnabled ? 'bg-[#192434]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* Auto Spaced Repetition */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#0b1c30]">Tự động lập lịch Spaced Repetition</span>
                <span className="text-[11px] text-slate-500">Thuật toán SM-2 nhắc nhở thông minh</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoSpacedRep}
                onClick={() => setAutoSpacedRep(!autoSpacedRep)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  autoSpacedRep ? 'bg-[#192434]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    autoSpacedRep ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onNavigate('planner')}
            className="w-full mt-1 py-2.5 rounded-xl bg-[#00288e] text-white text-[12px] font-bold hover:bg-[#1e40af] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Xem lịch trình học cá nhân hóa</span>
          </button>
        </div>
      </div>

      {/* Avatar Edit Modal */}
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={userProfile.avatar}
        userName={userProfile.name}
        onSaveAvatar={handleUpdateAvatar}
      />
    </div>
  );
};
