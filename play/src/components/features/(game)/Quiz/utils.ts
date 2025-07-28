import { QuizQuestion, QuizQuestionHistory, QuizScore } from "@/@types/quiz";
import { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";

interface GetQuizScoreParams {
  questions: QuizQuestion[];
  correctAnswers: number;
  stopwatch: useStopwatchResultType;
  userId?: string;
  questionHistory: QuizQuestionHistory[];
}
export function getQuizScore(params: GetQuizScoreParams): QuizScore {
  const { correctAnswers, questions, stopwatch, userId, questionHistory } =
    params;
  const totalQuestions = questions.length;
  const categories = questions.map((q) => q.category);
  const categorySet = new Set<string>(categories);
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const { seconds, minutes } = stopwatch;

  const duration = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const result: QuizScore = {
    category: categorySet.size === 1 ? questions[0].category : "Campuran",
    date: new Date().toISOString(),
    duration,
    totalCorrectAnswers: correctAnswers,
    score,
    totalQuestions,
    userId: userId ?? "public",
    questionHistory,
  };
  return result;
}
