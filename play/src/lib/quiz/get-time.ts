import { QuizQuestion } from "@/@types/quiz";

export interface GetQuestionTimeConfig {
  isUseGlobalTime: boolean;
  questions: QuizQuestion[];
  currentQuiz: number;
  configTimer: number;
}
export function getQuestionTime(config: GetQuestionTimeConfig) {
  const { configTimer, currentQuiz, isUseGlobalTime, questions } = config;
  const time = new Date();

  if (isUseGlobalTime) {
    time.setSeconds(
      time.getSeconds() + questions[currentQuiz].timeLimitSeconds
    );
  } else {
    time.setSeconds(time.getSeconds() + configTimer);
  }

  return time;
}
