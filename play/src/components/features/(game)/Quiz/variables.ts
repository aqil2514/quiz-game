import { QuizState } from "@/@types/quiz";
import { GameTimer } from "@/@types/time";

export const defaultQuizState: QuizState = {
  isAnswered: false,
  isCorrect: false,
  isFinished: false,
  isPaused: false,
  isPausedUser: false,
  isConfig: false,
};

export const defaultQuizTimer:GameTimer = {
    current: 0,
    isRunning: false,
    total: 0,
  }