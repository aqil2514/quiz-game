import { QuizQuestion, QuizScore } from "@/@types/quiz";
import { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";

interface GetQuizScoreParams {
  questions: QuizQuestion[];
  correctAnswers: number;
  stopwatch: useStopwatchResultType;
  userId?: string;
}
export function getQuizScore(params: GetQuizScoreParams): QuizScore {
  const { correctAnswers, questions, stopwatch, userId } = params;
  const totalQuestions = questions.length;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const { seconds, minutes } = stopwatch;

  const duration = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const result: QuizScore = {
    id: "",
    category: questions[0].category,
    date: new Date().toISOString(),
    duration,
    score,
    totalQuestions,
    userId: userId ?? "public",
  };
  return result;
}
