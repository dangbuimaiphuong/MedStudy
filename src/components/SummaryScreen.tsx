import React, { useState } from 'react';
import { ScreenType } from '../types';

interface SummaryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenSettings: () => void;
  documentTitle?: string;
  sourceFileName?: string;
  userAvatar?: string;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  onNavigate,
  onOpenSettings,
  documentTitle = 'Sinh học tế bào: Quang hợp ở thực vật',
  sourceFileName = 'Giao_trinh_SinhHoc_Ch4.pdf (48 trang)',
  userAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'diagrams' | 'keywords'>('summary');
  const [isKeywordFlipped, setIsKeywordFlipped] = useState(false);

  return (
    <div className="w-full flex flex-col px-4 sm:px-5 pt-3 pb-6">
      {/* Top Bar */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-xs mb-3 border border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00288e] flex items-center justify-center text-white font-bold">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#00288e] leading-none">MedStudy</span>
            <span className="text-[11px] text-slate-500 font-semibold leading-none mt-1">Tóm Tắt Ai</span>
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

      <div className="flex flex-col gap-3.5">
        {/* Document Metadata Card */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-[#dce9ff] text-[#00288e] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">school</span>
              Y1 - Học kỳ 2
            </span>
            <div className="flex items-center gap-1 text-slate-500 text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[15px] text-[#00563a]">auto_awesome</span>
              <span>Vừa tóm tắt 5 phút trước</span>
            </div>
          </div>

          <h1 className="text-[20px] font-bold text-[#0b1c30] tracking-tight leading-snug">
            {documentTitle}
          </h1>

          <div className="flex items-center gap-1.5 mt-1.5 text-slate-600 text-[12px]">
            <span className="material-symbols-outlined text-[18px] text-[#006398]">description</span>
            <span className="truncate">{sourceFileName}</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-0.5 text-[#006398] font-semibold whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">verified</span> AI Rút gọn 88%
            </span>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 bg-[#eff4ff] p-2.5 rounded-xl text-center">
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-slate-500 font-medium">Thời gian đọc</span>
              <span className="text-[15px] text-[#00288e] font-extrabold">4 phút</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-slate-500 font-medium">Độ khó đề thi</span>
              <span className="text-[15px] text-[#006398] font-extrabold">Cao (4/5)</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-slate-500 font-medium">Khái niệm cốt lõi</span>
              <span className="text-[15px] text-[#00563a] font-extrabold">9 mục</span>
            </div>
          </div>
        </div>

        {/* Interactive Segmented View Control */}
        <div className="flex p-1 bg-[#e5eeff] rounded-xl gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2 rounded-lg text-[12px] text-center transition-all flex items-center justify-center gap-1 font-semibold ${
              activeTab === 'summary'
                ? 'bg-white text-[#00288e] shadow-sm'
                : 'text-slate-600 hover:text-[#00288e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">subject</span>
            Tóm tắt trọng tâm
          </button>
          <button
            onClick={() => setActiveTab('diagrams')}
            className={`flex-1 py-2 rounded-lg text-[12px] text-center transition-all flex items-center justify-center gap-1 font-semibold ${
              activeTab === 'diagrams'
                ? 'bg-white text-[#00288e] shadow-sm'
                : 'text-slate-600 hover:text-[#00288e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">schema</span>
            Phương trình &amp; Sơ đồ
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`flex-1 py-2 rounded-lg text-[12px] text-center transition-all flex items-center justify-center gap-1 font-semibold ${
              activeTab === 'keywords'
                ? 'bg-white text-[#00288e] shadow-sm'
                : 'text-slate-600 hover:text-[#00288e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">key</span>
            Từ khóa then chốt
          </button>
        </div>

        {/* TAB 1: SUMMARY */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-3.5">
            {/* 01. Khái niệm & Bản chất */}
            <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#00288e] font-extrabold text-[12px]">
                  01
                </div>
                <h2 className="text-[15px] text-[#00288e] font-bold">Khái niệm &amp; Bản chất năng lượng</h2>
              </div>
              <p className="text-[13px] text-[#0b1c30] leading-relaxed">
                Quang hợp là chuỗi phản ứng sinh hóa nội bào phức hợp nhằm{' '}
                <span className="bg-[#cce5ff] text-[#001d31] px-1.5 py-0.5 rounded font-semibold">
                  chuyển đổi năng lượng photon (quang năng)
                </span>{' '}
                thành{' '}
                <span className="bg-[#cce5ff] text-[#001d31] px-1.5 py-0.5 rounded font-semibold">
                  hóa năng bền vững
                </span>{' '}
                tích lũy trong các liên kết C-C và C-H của phân tử hữu cơ (
                <span className="font-mono text-[12px] text-[#00288e] font-bold">Triose-phosphate/Glucose</span>).
              </p>
              <div className="bg-[#eff4ff] p-3 rounded-xl flex items-start gap-2 border border-blue-100/60">
                <span className="material-symbols-outlined text-[#006398] text-[20px] shrink-0 mt-0.5">lightbulb</span>
                <p className="text-[12px] text-slate-700 leading-normal">
                  <strong className="text-[#0b1c30]">Ý nghĩa y sinh:</strong> Nguồn sản sinh toàn bộ oxy phân tử tự do cho chu trình Phosphoryl hóa oxy hóa tại ty thể của tế bào động vật có vú.
                </p>
              </div>
            </section>

            {/* 02. Vị trí & Cấu trúc bào quan Lục lạp */}
            <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#00288e] font-extrabold text-[12px]">
                  02
                </div>
                <h2 className="text-[15px] text-[#00288e] font-bold">Vị trí &amp; Cấu trúc bào quan Lục lạp</h2>
              </div>

              {/* Chloroplast Image */}
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUstglhx3YjyTD7hNQ4uLSKy5ksEODYr-EHZiCzGLVIEp3mlf0ECjO_7CKBEkytl7ny7OdE2vyhWR1u7Wj36jBCecgtxbNki4OaHH9Kr7s8ZEdeTwT_35WYiHY0yB2_Eru8FfFWNAiROMrNnd1YaISZUugk--NdX49EZTBePKwXjLVyAP-NPwq188-iSTFp2Gwg7WiLQkuoHL1Q8QjnvPeLNdaajV_twbn9xoozw4fWKfZLr12BH8u"
                  alt="Vi thể siêu cấu trúc Lục lạp (Chloroplast)"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#213145]/90 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    Vi thể siêu cấu trúc Lục lạp (Chloroplast)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="p-3 bg-[#eff4ff] rounded-xl flex flex-col border border-blue-100/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                    <span className="text-[13px] text-[#0b1c30] font-bold">Màng Thylakoid (Pha sáng)</span>
                  </div>
                  <p className="text-[12px] text-slate-600 mt-1 leading-normal">
                    Nơi định vị phức hợp sắc tố quang hợp (Photosystem I &amp; II), chuỗi truyền điện tử (ETC) và phức hợp enzym tổng hợp ATP (
                    <span className="font-mono text-[#00288e] font-bold">ATP Synthase</span>).
                  </p>
                </div>

                <div className="p-3 bg-[#eff4ff] rounded-xl flex flex-col border border-blue-100/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006398]"></span>
                    <span className="text-[13px] text-[#0b1c30] font-bold">Chất nền Stroma (Pha tối)</span>
                  </div>
                  <p className="text-[12px] text-slate-600 mt-1 leading-normal">
                    Chứa hệ enzyme hòa tan đậm đặc, đặc biệt là carboxylase phong phú nhất hành tinh:{' '}
                    <span className="bg-[#dde1ff] text-[#001453] px-1 py-0.5 rounded font-bold font-mono text-[11px]">
                      RuBisCO
                    </span>
                    , điều hòa Chu trình Calvin-Benson.
                  </p>
                </div>
              </div>
            </section>

            {/* 03. Phương trình quang hóa tổng quát */}
            <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#00288e] font-extrabold text-[12px]">
                  03
                </div>
                <h2 className="text-[15px] text-[#00288e] font-bold">Phương trình quang hóa tổng quát</h2>
              </div>

              <div className="bg-[#dce9ff]/60 p-3.5 rounded-xl flex flex-col items-center justify-center text-center my-1 border border-blue-200/50">
                <span className="text-[10px] text-[#006398] font-bold uppercase tracking-widest mb-1.5">
                  Cân bằng hóa lượng học
                </span>
                <div className="font-mono text-[13px] text-[#00288e] font-bold px-3 py-1.5 bg-white rounded-lg shadow-xs border border-blue-100">
                  6CO₂ + 12H₂O + Ánh sáng → C₆H₁₂O₆ + 6O₂ + 6H₂O
                </div>
                <p className="text-[12px] text-slate-700 mt-2 leading-relaxed">
                  *Lưu ý cốt lõi: Toàn bộ khí <strong className="text-[#00563a]">O₂ thoát ra</strong> có nguồn gốc trực tiếp từ quá trình{' '}
                  <strong className="text-[#00563a]">Quang phân ly H₂O</strong> tại Lumen Thylakoid, hoàn toàn không phải từ phân tử CO₂.
                </p>
              </div>
            </section>

            {/* 04. So sánh hai pha phản ứng */}
            <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#00288e] font-extrabold text-[12px]">
                  04
                </div>
                <h2 className="text-[15px] text-[#00288e] font-bold">So sánh hai pha phản ứng</h2>
              </div>

              <div className="overflow-x-auto w-full rounded-xl border border-slate-200">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="bg-[#e5eeff] text-[#0b1c30] font-bold">
                      <th className="p-2.5">Tiêu chí</th>
                      <th className="p-2.5 text-[#00288e]">Pha Sáng</th>
                      <th className="p-2.5 text-[#006398]">Pha Tối (Calvin)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                      <td className="p-2.5 font-semibold text-slate-500">Nơi diễn ra</td>
                      <td className="p-2.5 text-[#00288e] font-semibold">Màng Thylakoid</td>
                      <td className="p-2.5 text-[#006398] font-semibold">Chất nền Stroma</td>
                    </tr>
                    <tr className="bg-[#eff4ff]/60">
                      <td className="p-2.5 font-semibold text-slate-500">Nguyên liệu</td>
                      <td className="p-2.5 text-slate-800">H₂O, NADP⁺, ADP, Pi</td>
                      <td className="p-2.5 text-slate-800">CO₂, ATP, NADPH</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-2.5 font-semibold text-slate-500">Sản phẩm</td>
                      <td className="p-2.5 font-bold text-[#00563a]">O₂, ATP, NADPH</td>
                      <td className="p-2.5 font-bold text-[#00288e]">C₆H₁₂O₆, NADP⁺, ADP</td>
                    </tr>
                    <tr className="bg-[#eff4ff]/60">
                      <td className="p-2.5 font-semibold text-slate-500">Động lực</td>
                      <td className="p-2.5 text-slate-800">Photon (hν) kích thích</td>
                      <td className="p-2.5 text-slate-800">Năng lượng ATP &amp; NADPH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 05. Bẫy thi trắc nghiệm thường gặp */}
            <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] font-extrabold text-[12px]">
                  <span className="material-symbols-outlined text-[16px]">priority_high</span>
                </div>
                <h2 className="text-[15px] text-[#ba1a1a] font-bold">Bẫy thi trắc nghiệm thường gặp</h2>
              </div>

              <div className="bg-[#eff4ff] p-3.5 rounded-xl flex flex-col gap-2 mt-1 border border-red-100">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#00288e] font-bold">Phân biệt nhóm C3, C4 và CAM</span>
                  <span className="text-[11px] bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full font-bold">
                    Tỉ lệ sai 62%
                  </span>
                </div>
                <ul className="flex flex-col gap-2 text-[12px] text-[#0b1c30] mt-1">
                  <li className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[16px] shrink-0 mt-0.5">cancel</span>
                    <span>
                      <strong className="text-[#0b1c30]">Nhầm lẫn phổ biến:</strong> Nghĩ thực vật CAM không có chu trình Calvin.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[#00563a] text-[16px] shrink-0 mt-0.5">check_circle</span>
                    <span>
                      <strong className="text-[#0b1c30]">Quy chuẩn nhớ nhanh:</strong> Cả 3 nhóm đều thực hiện chu trình Calvin. Chỉ khác nhau ở{' '}
                      <span className="underline decoration-[#006398] decoration-2 font-bold">không gian cố định</span> (C4 tách biệt giữa tế bào mô giậu và bao bó mạch) hoặc{' '}
                      <span className="underline decoration-[#006398] decoration-2 font-bold">thời gian cố định</span> (CAM mở khí khổng ban đêm).
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: DIAGRAMS & SCHEMAS */}
        {activeTab === 'diagrams' && (
          <div className="flex flex-col gap-3.5">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <h3 className="text-[15px] text-[#00288e] font-bold">Chuỗi vận chuyển điện tử quang hợp (Z-Scheme)</h3>
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col items-center border border-blue-100/60">
                <svg className="w-full max-w-sm h-40 text-primary" fill="none" viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 30 110 L 80 30 L 160 100 L 220 20 L 290 50" stroke="#00288e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                  <circle cx="80" cy="30" fill="#dce9ff" r="14" stroke="#00288e" strokeWidth="2"></circle>
                  <text fill="#00288e" fontSize="10" fontWeight="bold" textAnchor="middle" x="80" y="34">PS II</text>
                  <circle cx="220" cy="20" fill="#6ffbbe" r="14" stroke="#003d27" strokeWidth="2"></circle>
                  <text fill="#003d27" fontSize="10" fontWeight="bold" textAnchor="middle" x="220" y="24">PS I</text>
                  <path d="M 40 135 L 75 48" stroke="#006398" strokeDasharray="3 3" strokeWidth="1.5"></path>
                  <text fill="#444653" fontSize="9" x="35" y="145">H₂O → O₂ + e⁻</text>
                  <path d="M 230 30 L 275 48" stroke="#00563a" strokeWidth="1.5"></path>
                  <text fill="#00563a" fontSize="9" fontWeight="bold" x="275" y="65">NADPH</text>
                  <text fill="#006398" fontSize="9" x="120" y="70">Cyt b6f / ATP</text>
                </svg>
              </div>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Dòng e⁻ đi từ phân tử H₂O kích thích qua hệ quang hóa PS II (P680), hạ bậc năng lượng bơm proton qua màng lumen, tiếp tục nhận photon tái kích hoạt tại PS I (P700) trước khi khử NADP⁺ thành NADPH.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <h3 className="text-[15px] text-[#00288e] font-bold">Ba giai đoạn Chu trình Calvin</h3>
              <div className="flex flex-col gap-2 text-[12px]">
                <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between border border-blue-100/50">
                  <span className="font-bold text-[#0b1c30]">1. Cố định CO₂</span>
                  <span className="text-[#00288e] font-mono font-bold">RuBP + CO₂ → 3-PGA</span>
                </div>
                <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between border border-blue-100/50">
                  <span className="font-bold text-[#0b1c30]">2. Khử 3-PGA</span>
                  <span className="text-[#00563a] font-mono font-bold">Tiêu hao ATP + NADPH → G3P</span>
                </div>
                <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between border border-blue-100/50">
                  <span className="font-bold text-[#0b1c30]">3. Tái sinh chất nhận</span>
                  <span className="text-[#006398] font-mono font-bold">G3P → RuBP (Tiêu hao ATP)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KEYWORDS */}
        {activeTab === 'keywords' && (
          <div className="flex flex-col gap-3.5">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#00288e] font-bold">Thuật ngữ y sinh bắt buộc</span>
                <span className="text-[11px] bg-[#dce9ff] px-2 py-0.5 rounded-full text-slate-700 font-semibold">
                  7 thuật ngữ cốt lõi
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'RuBisCO',
                  'Photosystem II (P680)',
                  'Photosystem I (P700)',
                  'Quang phân ly nước',
                  'Phosphoryl hóa quang hóa',
                  'Thylakoid Lumen',
                  'Glyceraldehyde 3-phosphate (G3P)'
                ].map((kw, i) => (
                  <span
                    key={i}
                    className="bg-[#eff4ff] text-[#00288e] px-3 py-1.5 rounded-full text-[12px] font-bold border border-blue-100 shadow-2xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Micro Flashcard Preview */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#00563a]">bolt</span>
                  Xem nhanh định nghĩa
                </span>
                <span>Chạm để lật</span>
              </div>
              <div
                onClick={() => setIsKeywordFlipped(!isKeywordFlipped)}
                className={`w-full min-h-[105px] p-3.5 rounded-xl flex items-center justify-center text-center cursor-pointer transition-all border ${
                  isKeywordFlipped
                    ? 'bg-[#dce9ff] border-blue-200'
                    : 'bg-[#eff4ff] border-blue-100 hover:bg-[#e5eeff]'
                }`}
              >
                {isKeywordFlipped ? (
                  <p className="text-[12px] text-[#0b1c30] leading-relaxed">
                    <strong className="text-[#00288e] block mb-1">RuBisCO:</strong>
                    Ribulose-1,5-bisphosphate carboxylase-oxygenase: Enzyme xúc tác phản ứng cố định CO₂ đầu tiên trong chu trình Calvin ở chất nền lục lạp.
                  </p>
                ) : (
                  <p className="text-[14px] text-[#00288e] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">touch_app</span>
                    Enzyme RuBisCO là gì?
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AI Action Bridge: Next Cognitive Steps */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm border border-slate-100 gap-3 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00288e] text-[20px]">psychology</span>
              <h3 className="text-[14px] text-[#00288e] font-bold">Hành động ghi nhớ kế tiếp</h3>
            </div>
            <span className="text-[11px] text-[#00563a] font-bold bg-[#6ffbbe] px-2 py-0.5 rounded-full">
              AI Đề xuất
            </span>
          </div>
          <p className="text-[12px] text-slate-600 leading-relaxed">
            Chuyển hóa kiến thức tóm tắt thành trí nhớ dài hạn thông qua phương pháp lặp lại ngắt quãng (Spaced Repetition).
          </p>
          <div className="flex flex-col gap-2 mt-1">
            {/* Action 1: Quiz (Green) */}
            <button
              onClick={() => onNavigate('practice')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#6ffbbe] text-[#002113] text-[13px] font-bold active:scale-[0.98] transition-transform shadow-xs"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00563a]">quiz</span>
                <span>Tạo 15 câu Quiz từ tóm tắt này</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Action 2: Flashcards (Indigo) */}
            <button
              onClick={() => onNavigate('practice')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#dde1ff] text-[#001453] text-[13px] font-bold active:scale-[0.98] transition-transform shadow-xs"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00288e]">style</span>
                <span>Chuyển thành 12 Flashcard ghi nhớ</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Action 3: AI Planner (Purple / Container) */}
            <button
              onClick={() => onNavigate('planner-detail')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-[13px] font-bold active:scale-[0.98] transition-transform shadow-xs"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#006398]">event_upcoming</span>
                <span>Thêm vào AI Planner ôn trong 3 ngày</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
