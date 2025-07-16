export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  timeLimitSeconds?: number;
}

export interface QuizState {
  isCorrect: boolean;
  isAnswered: boolean;
  isFinished: boolean;
  isPaused: boolean;
  isPausedUser: boolean;
}
