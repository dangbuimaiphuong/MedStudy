import React, { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcessed: (topicTitle: string, fileName: string) => void;
  selectedFile?: File | null;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onProcessed,
  selectedFile,
}) => {
  const [step, setStep] = useState<'selecting' | 'processing' | 'completed'>('selecting');
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const startProcessing = (title: string, fileName: string) => {
    setStep('processing');
    setProgress(15);

    const timer1 = setTimeout(() => setProgress(45), 400);
    const timer2 = setTimeout(() => setProgress(85), 900);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setStep('completed');
      setTimeout(() => {
        onProcessed(title, fileName);
        onClose();
        setStep('selecting');
        setProgress(0);
      }, 500);
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 flex flex-col gap-4">
        {step === 'selecting' && (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#00288e] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                </div>
                <h3 className="text-[16px] font-bold text-[#0b1c30]">Tải tài liệu Y khoa</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {selectedFile ? (
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#00288e]">description</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#0b1c30] truncate">{selectedFile.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {(selectedFile.size / 1024).toFixed(1)} KB • Sẵn sàng phân tích
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Chọn tài liệu mẫu từ thư viện y khoa hoặc bấm phân tích tệp giáo trình vừa tải lên:
              </p>
            )}

            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  startProcessing(
                    'Sinh học tế bào: Quang hợp ở thực vật',
                    selectedFile ? selectedFile.name : 'Giao_trinh_SinhHoc_Ch4.pdf (48 trang)'
                  )
                }
                className="w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100/70 text-left flex items-center justify-between border border-blue-200/60 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#00288e]">
                    🌱 Quang hợp ở thực vật (Chương 4)
                  </span>
                  <span className="text-[11px] text-slate-500">Mô-đun Sinh học Đại cương Y1</span>
                </div>
                <span className="material-symbols-outlined text-base text-[#00288e]">arrow_forward</span>
              </button>

              <button
                onClick={() =>
                  startProcessing(
                    'Hô hấp tế bào & Chu trình Krebs',
                    'Giao_trinh_SinhHoc_Ch5_TyThe.pdf (36 trang)'
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between border border-slate-200 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#0b1c30]">
                    ⚡ Hô hấp tế bào &amp; Ty thể (Chương 5)
                  </span>
                  <span className="text-[11px] text-slate-500">Phosphoryl hóa oxy hóa &amp; Chuỗi ETC</span>
                </div>
                <span className="material-symbols-outlined text-base text-slate-400">arrow_forward</span>
              </button>

              <button
                onClick={() =>
                  startProcessing(
                    'Giải phẫu tuần hoàn & Sinh lý Tim mạch',
                    'GiaiPhau_HeTuanHoan_Y1.pdf (62 trang)'
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between border border-slate-200 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#0b1c30]">
                    ❤️ Giải phẫu &amp; Sinh lý Tim mạch
                  </span>
                  <span className="text-[11px] text-slate-500">Mô-đun Y sinh học lâm sàng</span>
                </div>
                <span className="material-symbols-outlined text-base text-slate-400">arrow_forward</span>
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="py-6 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#00288e] flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#0b1c30]">AI MedStudy đang phân tích...</h3>
            <p className="text-[12px] text-slate-600 max-w-[260px]">
              Đang trích xuất cấu trúc bào quan, phương trình quang hóa và tạo 15 câu trắc nghiệm...
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-[#00288e] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[11px] font-bold text-[#00288e]">{progress}% Hoàn tất</span>
          </div>
        )}

        {step === 'completed' && (
          <div className="py-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h3 className="text-[16px] font-bold text-emerald-800">Tóm tắt thành công!</h3>
            <p className="text-[12px] text-slate-600">Đang chuyển sang màn hình tóm tắt trọng tâm...</p>
          </div>
        )}
      </div>
    </div>
  );
};
