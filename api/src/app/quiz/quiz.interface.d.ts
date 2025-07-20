export interface QuizCategories {
  readonly id?: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface QuizScore {
  userId: string;
  category: string;
  score: number;
  totalQuestions: number;
  timeQuestTotal: number;
  duration: number;
  date: string;
}

export interface QuizQuestion {
  readonly id?: string;
  category: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  timeLimitSeconds: number;
}