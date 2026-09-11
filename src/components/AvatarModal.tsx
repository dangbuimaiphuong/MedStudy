import React, { useState, useRef } from 'react';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  userName: string;
  onSaveAvatar: (newAvatar: string) => void;
}

const PRESET_AVATARS = [
  {
    id: 'doc-female-1',
    label: 'Bác sĩ nội trú (Nữ)',
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    tag: 'Nữ • Áo blouse',
  },
  {
    id: 'doc-male-1',
    label: 'Bác sĩ ngoại khoa (Nam)',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    tag: 'Nam • Áo scrub',
  },
  {
    id: 'doc-female-2',
    label: 'Sinh viên Y khoa',
    url: 'https://images.unsplash.com/photo-1594824813589-3bc3a67d02dc?auto=format&fit=crop&w=300&q=80',
    tag: 'Nữ • Ống nghe',
  },
  {
    id: 'doc-male-2',
    label: 'Bác sĩ lâm sàng',
    url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    tag: 'Nam • Bệnh viện',
  },
  {
    id: 'lab-researcher',
    label: 'Nghiên cứu sinh Y sinh',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&q=80',
    tag: 'Phòng Lab • Kính hiển vi',
  },
  {
    id: 'surgeon',
    label: 'Phẫu thuật viên',
    url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
    tag: 'Phòng mổ • Vô trùng',
  },
];

export const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  userName,
  onSaveAvatar,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);
  const [previewError, setPreviewError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle local image file upload and compress via canvas
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if image
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn một tệp hình ảnh hợp lệ (PNG, JPG, WEBP).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize image to max 256x256 to fit nicely in localStorage
        const canvas = document.createElement('canvas');
        const maxSize = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setSelectedAvatar(compressedDataUrl);
          setPreviewError(false);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
        alert('Không thể đọc hình ảnh này. Vui lòng thử ảnh khác.');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSaveAvatar(selectedAvatar);
    onClose();
  };

  const handleRemoveAvatar = () => {
    setSelectedAvatar('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#00288e] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#0b1c30]">Chỉnh sửa ảnh đại diện</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Current Avatar Preview & Actions */}
        <div className="flex flex-col items-center gap-3 py-2 bg-slate-50/80 rounded-2xl border border-slate-200/60 p-4">
          <div className="relative">
            {selectedAvatar && !previewError ? (
              <img
                src={selectedAvatar}
                alt="Xem trước ảnh đại diện"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-[#00288e]/20"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00288e] to-[#007cb9] text-white flex items-center justify-center text-3xl font-extrabold shadow-md border-4 border-white">
                {userName ? userName.charAt(0).toUpperCase() : 'P'}
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00288e] text-white flex items-center justify-center border-2 border-white shadow-sm hover:bg-[#1e40af] transition-colors"
              title="Tải ảnh từ máy"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            </button>
          </div>

          <div className="text-center">
            <h4 className="text-[14px] font-bold text-[#0b1c30]">
              {selectedAvatar ? 'Ảnh đại diện đã chọn' : 'Đang dùng chữ cái mặc định'}
            </h4>
            <p className="text-[11px] text-slate-500">
              Chọn ảnh từ thư viện thiết bị hoặc các mẫu avatar Y khoa
            </p>
          </div>

          {/* Quick Upload / Remove Buttons */}
          <div className="flex items-center gap-2 w-full pt-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="flex-1 py-2 px-3 rounded-xl bg-white border border-slate-200 text-[#00288e] text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-blue-50/50 transition-colors shadow-2xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">upload</span>
              <span>{isProcessing ? 'Đang tải...' : 'Tải ảnh từ máy'}</span>
            </button>

            {selectedAvatar && (
              <button
                onClick={handleRemoveAvatar}
                className="py-2 px-3 rounded-xl bg-red-50 text-red-700 text-[12px] font-bold flex items-center justify-center gap-1 hover:bg-red-100 transition-colors border border-red-200/60"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                <span>Gỡ ảnh</span>
              </button>
            )}
          </div>
        </div>

        {/* Preset Medical Avatars */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#0b1c30] uppercase tracking-wider">
              Mẫu avatar Y khoa có sẵn
            </span>
            <span className="text-[11px] text-[#00288e] font-semibold">6 mẫu</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {PRESET_AVATARS.map((preset) => {
              const isSelected = selectedAvatar === preset.url;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedAvatar(preset.url);
                    setPreviewError(false);
                  }}
                  className={`p-2 rounded-2xl border flex flex-col items-center text-center transition-all ${
                    isSelected
                      ? 'border-2 border-[#00288e] bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                  type="button"
                >
                  <div className="relative">
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    {isSelected && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00288e] text-white flex items-center justify-center border-2 border-white text-[12px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-[#0b1c30] mt-1.5 leading-tight truncate w-full">
                    {preset.label}
                  </span>
                  <span className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">
                    {preset.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 mt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-[12px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-[12px] font-bold bg-[#00288e] text-white hover:bg-[#1e40af] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">check</span>
            <span>Áp dụng ảnh này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
