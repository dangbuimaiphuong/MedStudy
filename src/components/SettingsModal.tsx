import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { AvatarModal } from './AvatarModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [emailInput, setEmailInput] = useState(userProfile.email);
  const [studentIdInput, setStudentIdInput] = useState(userProfile.studentId);
  const [cohortInput, setCohortInput] = useState(userProfile.cohort);
  const [academicTrack, setAcademicTrack] = useState(userProfile.academicTrack);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(userProfile.dailyGoalMinutes || 60);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    setNameInput(userProfile.name);
    setEmailInput(userProfile.email);
    setStudentIdInput(userProfile.studentId);
    setCohortInput(userProfile.cohort);
    setAcademicTrack(userProfile.academicTrack);
    setDailyGoalMinutes(userProfile.dailyGoalMinutes || 60);
  }, [userProfile]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: nameInput.trim() || userProfile.name,
      email: emailInput.trim() || userProfile.email,
      studentId: studentIdInput.trim() || userProfile.studentId,
      cohort: cohortInput.trim() || userProfile.cohort,
      academicTrack,
      dailyGoalMinutes,
    });
    onClose();
  };

  const handleSaveAvatar = (newAvatar: string) => {
    onUpdateProfile({ avatar: newAvatar });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
        <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#00288e] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#0b1c30]">Hồ sơ &amp; Cài đặt sinh viên</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Profile Avatar Card in Settings */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
            <div className="relative cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00288e] to-[#007cb9] text-white flex items-center justify-center text-xl font-bold shadow-xs border-2 border-white">
                  {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'P'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#00288e] text-white flex items-center justify-center border border-white text-[11px]">
                <span className="material-symbols-outlined text-[12px]">photo_camera</span>
              </span>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[13px] font-bold text-[#0b1c30] truncate">{userProfile.name}</span>
              <span className="text-[10px] text-slate-500 truncate">{userProfile.email}</span>
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="text-[11px] font-bold text-[#00288e] hover:underline text-left mt-0.5 flex items-center gap-1 cursor-pointer"
              >
                <span>Chỉnh sửa ảnh đại diện</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-3">
            {/* User Name */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Tên sinh viên hiển thị <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
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
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50"
                placeholder="Ví dụ: dangbuimaiphuong@gmail.com"
                required
              />
            </div>

            {/* Student ID & Cohort */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Mã sinh viên (MSSV) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50 font-mono"
                  placeholder="MED-2024-889"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Niên khóa <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={cohortInput}
                  onChange={(e) => setCohortInput(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00288e] bg-slate-50/50"
                  placeholder="2024 - 2030 (K120)"
                  required
                />
              </div>
            </div>

            {/* Academic Track */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Chuyên ngành &amp; Học kỳ
              </label>
              <select
                value={academicTrack}
                onChange={(e) => setAcademicTrack(e.target.value)}
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

            {/* Daily Goal */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Mục tiêu học mỗi ngày: <strong className="text-[#00288e]">{dailyGoalMinutes} phút</strong>
              </label>
              <input
                type="range"
                min={30}
                max={180}
                step={15}
                value={dailyGoalMinutes}
                onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                className="w-full accent-[#00288e] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>30 phút</span>
                <span>60 phút</span>
                <span>120 phút</span>
                <span>180 phút</span>
              </div>
            </div>

            {/* Notification Sound */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#0b1c30]">Âm thanh thông báo AI</span>
                <span className="text-[11px] text-slate-500">Chuông nhắc học Spaced Repetition</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={soundEnabled}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${
                  soundEnabled ? 'bg-[#00288e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* App Info */}
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Phiên bản MedStudy:</span>
                <span className="font-mono text-[#00288e] font-bold">v2.5.0 (AI Chatbot Copilot)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Đồng bộ dữ liệu:</span>
                <span className="text-emerald-700 font-bold">Đã đồng bộ thời gian thực</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl text-[12px] font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Đóng
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
        </div>
      </div>

      {/* Avatar Edit Modal inside Settings */}
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={userProfile.avatar}
        userName={userProfile.name}
        onSaveAvatar={handleSaveAvatar}
      />
    </>
  );
};
