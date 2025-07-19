import { QuizQuestion, QuizScore } from "@/@types/quiz";
import { GameTimer } from "@/@types/time";

export function getAndRunQuizTimer(question: QuizQuestion): GameTimer {
  return {
    current: question.timeLimitSeconds,
    isRunning: true,
    total: question.timeLimitSeconds,
  };
}

interface GetQuizScoreParams {
  questions: QuizQuestion[];
  correctAnswers: number;
  workTime: number[];
  userId?: string;
}
export function getQuizScore(params: GetQuizScoreParams): QuizScore {
  const { correctAnswers, questions, workTime, userId } = params;
  const totalQuestions = questions.length;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const duration = workTime.reduce((acc, curr) => acc + curr, 0);
  const timeQuestTotal = questions
    .map((q) => q.timeLimitSeconds)
    .reduce((acc, curr) => acc + curr, 0);

  const result: QuizScore = {
    category: questions[0].category,
    date: new Date().toISOString(),
    duration,
    score,
    totalQuestions,
    userId: userId ?? "public",
    timeQuestTotal,
  };
  return result;
}
