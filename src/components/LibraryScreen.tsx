import React, { useState } from 'react';
import { ScreenType, LibraryDocument } from '../types';

interface LibraryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDocument: (title: string, fileName: string) => void;
  onTriggerUpload: () => void;
}

const INITIAL_DOCUMENTS: LibraryDocument[] = [
  {
    id: 'doc-1',
    title: 'Sinh học tế bào: Quang hợp ở thực vật',
    subject: 'Sinh học tế bào',
    sourceFile: 'Giao_trinh_SinhHoc_Ch4.pdf',
    pages: 48,
    readTime: '4 phút',
    compression: 'Rút gọn 88%',
    date: '16/06/2025',
    coreConcepts: 7,
    status: 'completed',
    tags: ['Y1 - Kỳ 2', '12 Flashcard', '15 Quiz', 'Quang hóa'],
  },
  {
    id: 'doc-2',
    title: 'Hô hấp tế bào & Siêu cấu trúc Ty thể',
    subject: 'Sinh học tế bào',
    sourceFile: 'Giao_trinh_SinhHoc_Ch5_TyThe.pdf',
    pages: 36,
    readTime: '5 phút',
    compression: 'Rút gọn 85%',
    date: '14/06/2025',
    coreConcepts: 8,
    status: 'completed',
    tags: ['Chu trình Krebs', 'Chuỗi ETC', '10 Flashcard', '20 Quiz'],
  },
  {
    id: 'doc-3',
    title: 'Giải phẫu hệ tuần hoàn & Sinh lý Tim mạch',
    subject: 'Giải phẫu học',
    sourceFile: 'GiaiPhau_HeTuanHoan_Y1.pdf',
    pages: 62,
    readTime: '6 phút',
    compression: 'Rút gọn 82%',
    date: '11/06/2025',
    coreConcepts: 12,
    status: 'completed',
    tags: ['Lâm sàng', 'Cơ tim', 'Huyết áp', '14 Flashcard'],
  },
  {
    id: 'doc-4',
    title: 'Sổ tay thuật ngữ y sinh & Công thức phản ứng',
    subject: 'Sinh lý & Hóa sinh',
    sourceFile: 'SoTay_CongThuc_Y1.pdf',
    pages: 24,
    readTime: '3 phút',
    compression: 'Tra cứu nhanh',
    date: '08/06/2025',
    coreConcepts: 15,
    status: 'bookmarked',
    tags: ['RuBisCO', 'ATP Synthase', 'Z-Scheme', 'Stroma'],
  },
];

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onNavigate,
  onOpenDocument,
  onTriggerUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState<string>('all');
  const [documents, setDocuments] = useState<LibraryDocument[]>(INITIAL_DOCUMENTS);

  const subjects = [
    { key: 'all', label: 'Tất cả' },
    { key: 'Sinh học tế bào', label: 'Sinh học tế bào' },
    { key: 'Giải phẫu học', label: 'Giải phẫu học' },
    { key: 'Sinh lý & Hóa sinh', label: 'Sinh lý & Hóa sinh' },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSubject = activeSubject === 'all' || doc.subject === activeSubject;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.sourceFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const handleOpenDoc = (doc: LibraryDocument) => {
    onOpenDocument(doc.title, `${doc.sourceFile} (${doc.pages} trang)`);
    onNavigate('summary');
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-5 pt-3 pb-6">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-xs mb-3 border border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00288e] flex items-center justify-center text-white font-bold">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#00288e] leading-none">MedStudy</span>
            <span className="text-[11px] text-slate-500 font-semibold leading-none mt-1">Thư viện tài liệu</span>
          </div>
        </div>

        <button
          onClick={onTriggerUpload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00288e] text-white text-[12px] font-bold shadow-xs hover:bg-[#1e40af] transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Thêm tệp</span>
        </button>
      </header>

      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bài học, bào quan, từ khóa..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00288e] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[14px]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {subjects.map((subj) => (
            <button
              key={subj.key}
              onClick={() => setActiveSubject(subj.key)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors ${
                activeSubject === subj.key
                  ? 'bg-[#192434] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
              type="button"
            >
              {subj.label}
            </button>
          ))}
        </div>

        {/* Stats banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00288e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#0b1c30]">
                {filteredDocuments.length} tài liệu y khoa
              </span>
              <span className="text-[11px] text-slate-500">
                Đã xử lý &amp; trích xuất tóm tắt trọng tâm
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#00288e] bg-white px-2.5 py-1 rounded-lg border border-blue-200">
            Y1 Học kỳ 2
          </span>
        </div>

        {/* Document Cards List */}
        <div className="flex flex-col gap-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-2.5 hover:border-blue-200 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#00288e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[14px] font-bold text-[#0b1c30] leading-snug">
                      {doc.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {doc.sourceFile} • {doc.pages} trang
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 whitespace-nowrap">
                  {doc.compression}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {doc.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Đọc {doc.readTime}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('practice')}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors flex items-center gap-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">school</span>
                    Ôn tập
                  </button>
                  <button
                    onClick={() => handleOpenDoc(doc)}
                    className="px-3 py-1 rounded-xl bg-[#00288e] hover:bg-[#1e40af] text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-xs"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    Xem tóm tắt
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2">
              <span className="material-symbols-outlined text-4xl text-slate-300">folder_off</span>
              <p className="text-[13px] font-bold text-slate-600">Không tìm thấy tài liệu phù hợp</p>
              <p className="text-[11px] text-slate-400">Hãy thử tìm kiếm với từ khóa khác hoặc tải lên tệp mới.</p>
            </div>
          )}
        </div>

        {/* Sổ tay ghi chú & Điểm cốt lõi (Mistake Bank & High-Yield Pearls) */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bookmark</span>
              </div>
              <h3 className="text-[14px] font-bold text-[#0b1c30]">Sổ tay ghi chú &amp; Bẫy thi quan trọng</h3>
            </div>
            <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
              3 Ghi nhớ
            </span>
          </div>

          <div className="flex flex-col gap-2 text-[12px]">
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-2.5">
              <span className="text-amber-600 font-bold mt-0.5">⚠️</span>
              <div className="flex flex-col">
                <strong className="text-amber-950 font-bold">Chất nhận CO2 đầu tiên:</strong>
                <span className="text-slate-700">
                  Ở thực vật C3 là RuBP (5C, xúc tác bởi RuBisCO tạo 2 phân tử 3-PGA). Ở C4 và CAM chất nhận đầu tiên là PEP (3C) xúc tác bởi PEP carboxylase.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 flex items-start gap-2.5">
              <span className="text-[#00288e] font-bold mt-0.5">💡</span>
              <div className="flex flex-col">
                <strong className="text-[#00288e] font-bold">Vị trí quang phân ly nước:</strong>
                <span className="text-slate-700">
                  Diễn ra tại mặt trong xoang thylakoid (lumen) gắn với phức hệ Quang hệ II (PSII - P680), giải phóng O2, H+ và electron.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 flex items-start gap-2.5">
              <span className="text-emerald-700 font-bold mt-0.5">🧪</span>
              <div className="flex flex-col">
                <strong className="text-emerald-900 font-bold">Năng lượng chu trình Calvin:</strong>
                <span className="text-slate-700">
                  Để tổng hợp 1 phân tử Glucose (C6H12O6), chu trình cần 6 CO2, tiêu tốn đúng 18 ATP và 12 NADPH từ pha sáng.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
