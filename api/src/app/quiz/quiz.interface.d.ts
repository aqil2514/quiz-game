export interface QuizScore {
  userId: string;
  category: string;
  score: number;
  totalQuestions: number;
  timeQuestTotal: number;
  duration: number;
  date: string;
}