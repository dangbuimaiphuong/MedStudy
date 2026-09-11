export type ScreenType = 'home' | 'summary' | 'practice' | 'planner' | 'planner-detail' | 'library' | 'profile' | 'chatbot';

export interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  cohort: string;
  academicTrack: string;
  avatar: string;
  dailyGoalMinutes: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sources?: string[];
  suggestedQuestions?: string[];
  category?: 'document' | 'quiz_review' | 'flashcard' | 'clinical' | 'general';
}

export interface LibraryDocument {
  id: string;
  title: string;
  subject: string;
  sourceFile: string;
  pages: number;
  readTime: string;
  compression: string;
  date: string;
  coreConcepts: number;
  status: 'completed' | 'in_progress' | 'bookmarked';
  tags: string[];
}

export interface Flashcard {
  id: number;
  category: string;
  question: string;
  answerTitle: string;
  answerCore: string;
  answerExplanation: string;
  interval?: string;
  state?: 'new' | 'learning' | 'review';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
}

export interface TaskItem {
  id: string;
  time: string;
  title: string;
  done: boolean;
}

export interface DaySchedule {
  dayKey: string;
  dayName: string;
  dateFull: string;
  duration: string;
  isToday?: boolean;
  topic: string;
  tasks: TaskItem[];
}

export interface ReminderSetting {
  id: string;
  title: string;
  time: string;
  enabled: boolean;
  icon: string;
  type: 'morning' | 'midday' | 'evening' | 'custom';
}
