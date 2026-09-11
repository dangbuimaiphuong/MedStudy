import { Flashcard, QuizQuestion, DaySchedule, ReminderSetting } from '../types';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    category: 'Câu hỏi nhận diện',
    question: 'Sắc tố quang hợp chính ở thực vật bậc cao là gì và chúng hấp thụ mạnh nhất ở dải sóng nào?',
    answerTitle: 'Diệp lục (Chlorophyll a & b)',
    answerCore: 'Diệp lục a & b hấp thụ ánh sáng dải đỏ (660-680 nm) và xanh tím (430-450 nm)',
    answerExplanation: 'Phản chiếu ánh sáng xanh lục nên làm cho lá cây có màu xanh lục đặc trưng.'
  },
  {
    id: 2,
    category: 'Sinh hóa lâm sàng',
    question: 'Tại sao quang phân ly nước tại Photosystem II lại giữ vai trò sống còn đối với sinh quyển?',
    answerTitle: 'Tạo O₂ phân tử & cung cấp e⁻',
    answerCore: 'Phản ứng: 2H₂O → 4H⁺ + 4e⁻ + O₂',
    answerExplanation: 'Là nguồn oxy tự do duy nhất duy trì quá trình hô hấp tế bào ở sinh vật hiếu khí và con người.'
  },
  {
    id: 3,
    category: 'Cơ chế enzym',
    question: 'Enzyme RuBisCO thực hiện phản ứng nào trong pha tối của chu trình Calvin?',
    answerTitle: 'Cố định phân tử CO₂',
    answerCore: 'Xúc tác gắn CO₂ vào Ribulose-1,5-bisphosphate (RuBP)',
    answerExplanation: 'Tạo thành hợp chất 6 carbon không bền và nhanh chóng tách thành 2 phân tử 3-PGA.'
  },
  {
    id: 4,
    category: 'Câu hỏi nhận diện',
    question: 'Quang hợp ở thực vật chủ yếu diễn ra ở bào quan nào và cấu trúc nào thực hiện pha sáng?',
    answerTitle: 'Đáp án lâm sàng / giải phẫu',
    answerCore: 'Lục lạp (Chloroplast) • Pha sáng diễn ra tại màng Thylakoid',
    answerExplanation: 'Màng thylakoid chứa hệ thống sắc tố quang hợp (Diệp lục a/b) và phức hệ enzyme ATP synthase vận hành chuỗi truyền điện tử quang phosphoryl hóa.'
  },
  {
    id: 5,
    category: 'So sánh tế bào học',
    question: 'Điểm khác biệt cốt lõi trong cơ chế thích nghi giữa thực vật C4 và CAM là gì?',
    answerTitle: 'Không gian vs. Thời gian',
    answerCore: 'C4 tách biệt theo không gian (mô giậu và bao bó mạch), CAM tách biệt theo thời gian',
    answerExplanation: 'Thực vật CAM mở khí khổng ban đêm để hấp thụ CO₂ tránh mất nước trong điều kiện khô hạn sa mạc.'
  }
];

export const INITIAL_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pha tối của quang hợp (Chu trình Calvin) diễn ra tại vị trí nào trong lục lạp?',
    options: [
      { key: 'A', text: 'Màng ngoài lục lạp' },
      { key: 'B', text: 'Màng Thylakoid' },
      { key: 'C', text: 'Chất nền Stroma' },
      { key: 'D', text: 'Khoang xoang thylakoid' },
    ],
    correctAnswer: 'C',
    explanation: 'Chính xác! Pha sáng diễn ra tại thylakoid tạo ATP & NADPH, sau đó pha tối sử dụng ATP & NADPH diễn ra tại chất nền Stroma để cố định CO2 thành hợp chất hữu cơ (G3P / Glucose).'
  },
  {
    id: 2,
    question: 'Khí O₂ thoát ra trong quá trình quang hợp có nguồn gốc trực tiếp từ phân tử nào?',
    options: [
      { key: 'A', text: 'CO₂ hấp thụ từ khí khổng' },
      { key: 'B', text: 'Quang phân ly phân tử nước (H₂O)' },
      { key: 'C', text: 'Phân giải hợp chất Glucose' },
      { key: 'D', text: 'Sự khử ion NADP⁺' },
    ],
    correctAnswer: 'B',
    explanation: 'Chính xác! Thí nghiệm nguyên tử đánh dấu O¹⁸ chứng minh toàn bộ khí oxy thoát ra bắt nguồn từ quá trình quang phân ly nước ở màng thylakoid.'
  },
  {
    id: 3,
    question: 'Enzyme xúc tác phản ứng cố định CO₂ đầu tiên trong chu trình Calvin là:',
    options: [
      { key: 'A', text: 'PEP Carboxylase' },
      { key: 'B', text: 'ATP Synthase' },
      { key: 'C', text: 'RuBisCO' },
      { key: 'D', text: 'DNA Polymerase' },
    ],
    correctAnswer: 'C',
    explanation: 'Chính xác! RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) là loại protein dồi dào nhất sinh quyển, đảm nhận vai trò cố định CO₂.'
  }
];

export const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    dayKey: 'mon',
    dayName: 'Thứ 2',
    dateFull: '16/06/2025 (Thứ Hai)',
    duration: '30 phút',
    isToday: true,
    topic: 'Ôn Quang hợp + Làm Quiz 15 câu',
    tasks: [
      { id: 't-1', time: '08:00 - 08:30', title: 'Đọc tóm tắt bài giảng Quang hợp & Lục lạp', done: true },
      { id: 't-2', time: '14:00 - 14:30', title: 'Luyện 15 câu trắc nghiệm AI Question', done: false },
      { id: 't-3', time: '20:30 - 21:00', title: 'Ôn 12 Flashcard Spaced Repetition', done: false }
    ]
  },
  {
    dayKey: 'wed',
    dayName: 'Thứ 4',
    dateFull: '18/06/2025 (Thứ Tư)',
    duration: '30 phút',
    topic: 'Ôn Hô hấp tế bào & Ty thể + Tạo 10 Flashcards',
    tasks: [
      { id: 't-4', time: '08:30 - 09:00', title: 'Học lý thuyết Hô hấp tế bào & Ty thể', done: false },
      { id: 't-5', time: '15:00 - 15:30', title: 'Tạo 10 Flashcards chu trình Krebs', done: false },
      { id: 't-6', time: '20:30 - 21:00', title: 'Làm Quiz trắc nghiệm 15 câu', done: false }
    ]
  },
  {
    dayKey: 'fri',
    dayName: 'Thứ 6',
    dateFull: '20/06/2025 (Thứ Sáu)',
    duration: '45 phút',
    topic: 'Ôn tập tổng hợp chu trình Calvin & Krebs + Làm đề kiểm tra thử 30 câu',
    tasks: [
      { id: 't-7', time: '07:30 - 08:00', title: 'Ôn tập tổng hợp chu trình Calvin & Krebs', done: false },
      { id: 't-8', time: '08:00 - 09:00', title: 'Kỳ thi Đánh giá Sinh học Tế bào (30 câu)', done: false },
      { id: 't-9', time: '20:30 - 21:00', title: 'Rà soát Mistake Bank các câu làm sai', done: false }
    ]
  }
];

export const INITIAL_REMINDERS: ReminderSetting[] = [
  {
    id: 'r-1',
    title: 'Nhắc ôn buổi sáng',
    time: '07:30',
    enabled: true,
    icon: 'wb_sunny',
    type: 'morning'
  },
  {
    id: 'r-2',
    title: 'Nhắc ôn giữa ngày',
    time: '14:00',
    enabled: true,
    icon: 'schedule',
    type: 'midday'
  },
  {
    id: 'r-3',
    title: 'Nhắc ôn Spaced Repetition tối',
    time: '20:30',
    enabled: true,
    icon: 'replay',
    type: 'evening'
  }
];
