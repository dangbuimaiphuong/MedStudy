import { UserProfile, ChatMessage, Flashcard, QuizQuestion } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Phuong',
  email: 'dangbuimaiphuong@gmail.com',
  studentId: 'MED-2024-889',
  cohort: '2024 - 2030 (K120)',
  academicTrack: 'Y1 - Bác sĩ Đa khoa',
  avatar: '',
  dailyGoalMinutes: 60,
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome-1',
    role: 'assistant',
    content: `Chào bạn! Tôi là **Gia sư Y khoa AI MedStudy** đồng hành cùng bạn.\n\nTôi đã nạp toàn bộ dữ liệu từ:\n- 📄 **Tài liệu hiện tại**: *Sinh học tế bào: Quang hợp ở thực vật* (\`Giao_trinh_SinhHoc_Ch4.pdf\` - 48 trang)\n- 🧠 **Dữ liệu ôn tập cá nhân**: 18 thẻ Flashcard, bài kiểm tra trắc nghiệm vừa đạt **80% (4/5)**\n- 🎯 **Lộ trình học**: Chuỗi 7 ngày liên tục, mục tiêu 60 phút/ngày\n\nBạn có thể yêu cầu tôi giải thích chi tiết cơ chế, phân tích câu trắc nghiệm bạn vừa làm sai, tạo mẹo nhớ (Mnemonic), hoặc khảo bài vấn đáp phản xạ y khoa ngay bây giờ!`,
    timestamp: 'Vừa xong',
    sources: [
      'Giao_trinh_SinhHoc_Ch4.pdf (48 trang)',
      'Dữ liệu bài tập & Flashcard cá nhân',
      'Hồ sơ sinh viên Y1'
    ],
    suggestedQuestions: [
      'Tóm tắt 3 điểm mấu chốt của tài liệu vừa tải lên',
      'Phân tích tại sao tôi làm sai câu trắc nghiệm số 3?',
      'Khảo bài vấn đáp miệng cho tôi về bài này',
      'Liên hệ lâm sàng: Cơ chế độc tính của thuốc trừ sâu Paraquat?',
    ],
  },
];

interface ChatbotContext {
  userProfile: UserProfile;
  documentTitle: string;
  sourceFileName: string;
  flashcards?: Flashcard[];
  quizQuestions?: QuizQuestion[];
}

/**
 * Intelligent ground-based Q&A engine for medical students
 */
export async function generateChatbotResponse(
  userQuery: string,
  context: ChatbotContext
): Promise<{
  content: string;
  sources: string[];
  suggestedQuestions: string[];
  category?: 'document' | 'quiz_review' | 'flashcard' | 'clinical' | 'general';
}> {
  const queryLower = userQuery.toLowerCase().trim();
  const userName = context.userProfile.name || 'bạn';
  const docTitle = context.documentTitle;
  const fileName = context.sourceFileName;

  // Try calling server-side API first if available
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        context: {
          userName: context.userProfile.name,
          academicTrack: context.userProfile.academicTrack,
          documentTitle: docTitle,
          sourceFileName: fileName,
          quizScore: '4/5 (80%)',
          mistakeTopic: 'Cơ chế tiêu thụ ATP/NADPH và enzyme RuBisCO trong chu trình Calvin',
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return {
          content: data.reply,
          sources: [
            `${fileName} • Trích dẫn ngữ cảnh AI`,
            `Hồ sơ học tập sinh viên ${userName}`,
          ],
          suggestedQuestions: data.suggestedQuestions || [
            'Hỏi thêm về cơ chế liên quan',
            'Khảo bài câu hỏi tiếp theo',
            'Tạo thẻ ghi nhớ Flashcard từ ý này',
          ],
          category: 'document',
        };
      }
    }
  } catch {
    // Graceful fallback to client-side grounded reasoning engine
  }

  // 1. Phân tích câu hỏi trắc nghiệm làm sai (Quiz review)
  if (
    queryLower.includes('làm sai') ||
    queryLower.includes('câu sai') ||
    queryLower.includes('câu 3') ||
    queryLower.includes('trắc nghiệm') ||
    queryLower.includes('quiz')
  ) {
    return {
      content: `### 🔍 Phân tích câu hỏi trắc nghiệm bạn vừa làm sai (Câu 3)

**Đề bài câu 3:** *"Trong chu trình Calvin, để tổng hợp được 1 phân tử đường Glucose (hoặc xuất khẩu 1 phân tử G3P), tế bào tiêu tốn bao nhiêu ATP và NADPH?"*

- **Lỗi phổ biến của bạn:** Bạn đã nhầm lẫn giữa tỉ lệ cố định 1 phân tử $CO_2$ với việc tạo thành 1 phân tử triose phosphate G3P (3 Carbon).
- **Đáp án chính xác theo giáo trình:**
  - Để cố định **3 phân tử $CO_2$** và tạo ra **1 phân tử G3P** tự do rời chu trình, tế bào cần:
    $$\\mathbf{9\\ ATP} \\quad \\text{và} \\quad \\mathbf{6\\ NADPH}$$
  - Để tổng hợp hoàn chỉnh **1 phân tử Glucose (6C)**, chu trình Calvin phải quay 6 vòng (cố định 6 $CO_2$), tiêu tốn tổng cộng **18 ATP** và **12 NADPH**!

💡 **Mẹo ghi nhớ nhanh (Mnemonic khi đi thi):**
> Nhớ tỷ lệ năng lượng Calvin theo quy tắc **"3 : 2"** (Cứ 3 ATP đi kèm 2 NADPH). 
> Cho 1 G3P (3C) $\\rightarrow$ Nhân 3: $3 \\times 3 = 9\\text{ ATP}$ và $3 \\times 2 = 6\\text{ NADPH}$!`,
      sources: [
        `${fileName} • Chương 4: Chu trình Calvin (Mục 4.3 trang 16)`,
        'Dữ liệu bài tập trắc nghiệm đã làm (Kết quả: 4/5 - 80%)',
      ],
      suggestedQuestions: [
        'Enzyme RuBisCO có vai trò gì trong chu trình này?',
        'Tại sao khi thiếu NADPH thì chu trình Calvin bị đình trệ?',
        'Khảo bài tiếp cho tôi 1 câu trắc nghiệm tương tự',
      ],
      category: 'quiz_review',
    };
  }

  // 2. Tóm tắt tài liệu vừa tải lên
  if (
    queryLower.includes('tóm tắt') ||
    queryLower.includes('điểm mấu chốt') ||
    queryLower.includes('tài liệu vừa tải') ||
    queryLower.includes('nội dung bài')
  ) {
    return {
      content: `### 📑 3 Trọng tâm cốt lõi của tài liệu *${docTitle}*

Dựa trên file giáo trình **${fileName}**, đây là 3 khối kiến thức trọng điểm mà sinh viên ${context.userProfile.academicTrack} cần nắm vững:

1. **Pha sáng (Thylakoid):**
   - Hấp thụ năng lượng ánh sáng tại **Quang hệ II (P680)** $\\rightarrow$ Quang phân ly nước:
     $$2H_2O \\rightarrow O_2 + 4H^+ + 4e^-$$
   - Dòng electron kích hoạt bơm proton vào xoang Thylakoid, tạo thế năng hóa thẩm (**Chemiosmosis**) để enzym **ATP Synthase** quay và tổng hợp ATP.
   - **Quang hệ I (P700)** chuyển electron khử $NADP^+$ thành $NADPH$.

2. **Pha tối (Chu trình Calvin tại Stroma):**
   - 3 giai đoạn: **Cố định Carbon (nhờ RuBisCO)** $\\rightarrow$ **Khử (tiêu tốn ATP & NADPH)** $\\rightarrow$ **Tái sinh RuBP**.
   - Cứ 3 $CO_2$ vào chu trình sinh ra 1 phân tử G3P (nguyên liệu cấu tạo Glucose, acid amin, acid béo).

3. **Cơ chế thích nghi C3, C4, CAM:**
   - **C3**: Dễ bị hiện tượng hô hấp sáng (Photorespiration) lãng phí năng lượng khi thời tiết khô nóng.
   - **C4**: Tách biệt không gian (Tế bào mô giậu cố định bằng PEP carboxylase $\\rightarrow$ Tế bào bao bó mạch giải phóng cho RuBisCO).
   - **CAM**: Tách biệt thời gian (Mở khí khổng ban đêm để lấy $CO_2$).`,
      sources: [
        `${fileName} • Mục 4.1 đến 4.4 (Trang 8 - 22)`,
        '18 thẻ Flashcard đang học trong hệ thống',
      ],
      suggestedQuestions: [
        'Hô hấp sáng là gì và tại sao lại gây lãng phí năng lượng?',
        'Sự khác nhau cơ bản giữa tế bào C3 và C4?',
        'Tạo 3 câu hỏi trắc nghiệm kiểm tra tôi về 3 điểm này',
      ],
      category: 'document',
    };
  }

  // 3. Khảo bài vấn đáp / Vấn đáp Socratic
  if (
    queryLower.includes('khảo bài') ||
    queryLower.includes('vấn đáp') ||
    queryLower.includes('kiểm tra tôi') ||
    queryLower.includes('hỏi tôi') ||
    queryLower.includes('test')
  ) {
    return {
      content: `### 🎯 Câu hỏi vấn đáp lâm sàng & sinh học tế bào dành cho ${userName}

Xin mời bạn trả lời câu hỏi vấn đáp sau:

**Tình huống:**
*"Một nhà nghiên cứu thêm chất ức chế **DCMU (Diuron)** vào dịch huyền phù lục lạp đang quang hợp. Chất này gắn đặc hiệu và chẹn vị trí chuyền điện tử của Plastoguinone tại Quang hệ II (PSII).*

1. *Theo bạn, nồng độ $O_2$ thoát ra từ quang phân ly nước và sự tích lũy NADPH sẽ thay đổi như thế nào?*
2. *Hiện tượng này có tương đồng gì với cơ chế ngộ độc chuỗi hô hấp tế bào ở người không?*"

👉 **Gợi ý cách trả lời:** Bạn hãy gõ ngắn gọn câu trả lời theo suy luận của mình, tôi sẽ nhận xét, chỉ ra điểm đúng và bổ sung những khía cạnh y khoa chuyên sâu!`,
      sources: [
        `${fileName} • Ứng dụng & Chất ức chế quang hợp (Trang 34)`,
        'Mô-đun Khảo bài vấn đáp phản xạ y khoa',
      ],
      suggestedQuestions: [
        'O2 giảm và NADPH giảm vì chuỗi electron bị tắc',
        'Cho tôi gợi ý chi tiết hơn về DCMU',
        'Đổi sang một câu hỏi khác về chu trình Calvin',
      ],
      category: 'quiz_review',
    };
  }

  // 4. Liên hệ lâm sàng & Độc chất học (Paraquat / Diuron)
  if (
    queryLower.includes('lâm sàng') ||
    queryLower.includes('paraquat') ||
    queryLower.includes('độc tính') ||
    queryLower.includes('ngộ độc') ||
    queryLower.includes('bệnh học')
  ) {
    return {
      content: `### 🏥 Mối liên hệ Lâm sàng & Độc chất học từ bài học: Ngộ độc Paraquat

Từ kiến thức chuỗi chuyền điện tử trong tài liệu **${fileName}**, trên lâm sàng có một ca bệnh độc chất học kinh điển:

- **Cơ chế tác động:**
  - **Paraquat** (thuốc diệt cỏ diệp lục) là chất nhận electron ngoại sinh, cạnh tranh electron trực tiếp tại **Photosystem I (PSI)** trong thực vật và **Phức hệ I chuỗi hô hấp ty thể** ở tế bào người.
  - Khi nhận electron, Paraquat chuyển thành gốc tự do Paraquat monocationic radical, lập tức phản ứng với oxy tạo ra **Gốc tự do Superoxide ($O_2^{\\bullet-}$)** và các gốc oxy hóa phản ứng (**ROS**).
- **Biểu hiện lâm sàng ở người:**
  - Tế bào phế nang type I và II tích lũy Paraquat với nồng độ gấp 10-20 lần huyết tương qua hệ thống vận chuyển polyamine.
  - Gây phá hủy màng lipid (Peroxy hóa lipid), dẫn đến **Tổn thương phổi cấp (ARDS)**, hoại tử phế nang và **Xơ phổi tiến triển tử vong nhanh chóng** (tỉ lệ tử vong lên tới 70-90%).
- **Ý nghĩa thực hành y khoa:**
  - Tuyệt đối không cho bệnh nhân ngộ độc Paraquat thở oxy liều cao sớm (trừ khi $SpO_2 < 85\\%$) vì oxy sẽ xúc tác sinh thêm vô số gốc ROS làm phổi tổn thương nhanh hơn!`,
      sources: [
        `${fileName} • Khung liên hệ y sinh & độc chất (Trang 41)`,
        'Dược lý học đại cương & Độc chất học lâm sàng',
      ],
      suggestedQuestions: [
        'Tại sao không được thở oxy nồng độ cao khi ngộ độc Paraquat?',
        'Gradient proton ở màng Thylakoid giống màng ty thể người thế nào?',
        'Lưu nội dung này thành 1 thẻ Flashcard',
      ],
      category: 'clinical',
    };
  }

  // 5. RuBisCO và Hô hấp sáng
  if (
    queryLower.includes('rubisco') ||
    queryLower.includes('hô hấp sáng') ||
    queryLower.includes('calvin') ||
    queryLower.includes('c3') ||
    queryLower.includes('c4')
  ) {
    return {
      content: `### 🧬 Cơ chế Enzyme RuBisCO & Hiện tượng Hô hấp sáng

Dựa trên tài liệu **${fileName}** (Mục 4.3):

1. **Bản chất của RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase):**
   - Đây là enzyme phong phú nhất trên Trái Đất, chiếm tới 40-50% protein hòa tan trong lá cây.
   - RuBisCO có tính **"lưỡng năng"** (Bifunctional): Nó có thể gắn cả $CO_2$ (hoạt tính Carboxylase) lẫn $O_2$ (hoạt tính Oxygenase) tại cùng một trung tâm hoạt động!

2. **Tại sao xảy ra Hô hấp sáng (Photorespiration)?**
   - Khi trời nắng nóng, cây C3 đóng khí khổng để tránh bốc hơi nước $\\rightarrow$ Nồng độ $CO_2$ trong gian bào giảm mạnh, trong khi $O_2$ từ pha sáng tích tụ cao.
   - RuBisCO sẽ gắn $O_2$ vào RuBP $\\rightarrow$ Tạo ra **1 phân tử 3-PGA + 1 phân tử 2-Phosphoglycolate** (chất độc chuyển hóa).
   - Tế bào phải tiêu tốn ATP và phối hợp giữa 3 bào quan (**Lục lạp $\\rightarrow$ Peroxisome $\\rightarrow$ Ty thể**) để tái chế, làm tiêu hao tới **25 - 50% sản phẩm quang hợp** mà không tạo ra bất kỳ phân tử ATP hay đường nào!

3. **Giải pháp tiến hóa của thực vật C4:**
   - Dùng enzyme **PEP Carboxylase** (hoàn toàn không có ái lực với $O_2$) để "bơm" $CO_2$ nồng độ cao vào tế bào bao bó mạch, vô hiệu hóa hoàn toàn hoạt tính oxy hóa của RuBisCO.`,
      sources: [
        `${fileName} • Cơ chế enzym RuBisCO & So sánh C3/C4 (Trang 18 - 25)`,
      ],
      suggestedQuestions: [
        '3 bào quan nào tham gia vào quá trình hô hấp sáng?',
        'Cây mía và ngô thuộc nhóm C3 hay C4?',
        'Thực vật CAM mở khí khổng vào ban ngày hay ban đêm?',
      ],
      category: 'document',
    };
  }

  // 6. Kế hoạch học tập & Dữ liệu tiến độ của sinh viên
  if (
    queryLower.includes('kế hoạch') ||
    queryLower.includes('tiến độ') ||
    queryLower.includes('hôm nay') ||
    queryLower.includes('lịch học') ||
    queryLower.includes('streak')
  ) {
    return {
      content: `### 📊 Báo cáo tiến độ học tập của ${userName} (${context.userProfile.studentId})

- 🔥 **Chuỗi học tập (Streak):** 7 ngày liên tiếp (Tuyệt vời!).
- ⏱️ **Thời gian hôm nay:** Đã học 45 phút / Mục tiêu ${context.userProfile.dailyGoalMinutes || 60} phút (còn 15 phút).
- 🧠 **Trạng thái Spaced Repetition:**
  - 18 thẻ Flashcard thuộc bài *${docTitle}*.
  - Có **6 thẻ cần ôn tập lặp lại** trước 22:00 tối nay để duy trì trí nhớ dài hạn.
  - Điểm trắc nghiệm: **80% (4/5)** - Cần khắc phục câu hỏi số 3 về chu trình Calvin.

🎯 **Đề xuất hành động ngay bây giờ:**
1. Ôn 6 thẻ Flashcard còn lại (khoảng 5 phút).
2. Làm lại câu hỏi trắc nghiệm số 3 để đạt điểm tuyệt đối 100%.
3. Hoàn thành bài đọc Giải phẫu hệ tuần hoàn vào ngày mai theo Lộ trình!`,
      sources: [
        `Hồ sơ cá nhân: ${context.userProfile.name} • Niên khóa ${context.userProfile.cohort}`,
        'Thống kê học tập thời gian thực & Lộ trình học (Planner)',
      ],
      suggestedQuestions: [
        'Bắt đầu ôn 6 thẻ Flashcard ngay',
        'Làm lại bài kiểm tra trắc nghiệm',
        'Xem chi tiết lịch học ngày mai',
      ],
      category: 'flashcard',
    };
  }

  // 7. Câu hỏi chung hoặc trả lời khảo bài
  return {
    content: `Chào ${userName}, về câu hỏi: *"**${userQuery}**"*

Dựa trên dữ liệu tài liệu **${fileName}** và lộ trình học ${context.userProfile.academicTrack}:

1. **Bản chất vấn đề:** 
   - Khái niệm này nằm trong phần cơ chế quang sinh học và sinh hóa tế bào. Các phản ứng oxy hóa khử và truyền năng lượng tuân theo nguyên lý bảo toàn gradient proton và thế năng điện hóa màng.
2. **Điểm quan trọng đối với kỳ thi Y khoa:**
   - Cần phân biệt rõ vị trí diễn ra: **Pha sáng** tại màng Thylakoid (cần ánh sáng, nước), **Pha tối (Calvin)** tại chất nền Stroma (sử dụng ATP và NADPH từ pha sáng để cố định $CO_2$).
   - Nhớ liên hệ sự tương đồng giữa enzyme ATP Synthase ở màng Thylakoid với màng trong ty thể người.

Bạn có muốn tôi ra một câu hỏi ngắn để bạn thử phản xạ kiến thức về phần này không?`,
    sources: [
      `${fileName} • Giáo trình học tập chính`,
      `Dữ liệu học tập sinh viên ${userName}`,
    ],
    suggestedQuestions: [
      'Cho tôi 1 câu hỏi phản xạ nhanh về phần này',
      'Phân tích sâu hơn về cơ chế hoá thẩm (Chemiosmosis)',
      'Tạo ghi chú nhanh vào sổ tay',
    ],
    category: 'general',
  };
}
