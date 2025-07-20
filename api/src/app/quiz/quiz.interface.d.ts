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