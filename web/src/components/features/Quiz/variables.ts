import { QuizState } from "@/@types/quiz";
import { GameTime } from "@/@types/time";

export const defaultQuizState: QuizState = {
  isAnswered: false,
  isCorrect: false,
  isFinished: false,
  isPaused: false,
  isPausedUser: false,
};

export const defaultGameTime: () => GameTime = () => {
  const maxValue = 100;
  const initTime = 60;
  const distance = maxValue / initTime;

  const gameTime: GameTime = {
    accumulate: 0,
    init: initTime,
    distance: maxValue / initTime,
    current: initTime * distance,
  };

  return gameTime;
};
