import { GameTime } from "@/@types/time";
import { QuizState } from "./interface";

export const defaultQuizState: QuizState = {
  isAnswered: false,
  isCorrect: false,
};

export const defaultGameTime: () => GameTime = () => {
  const maxValue = 100;
  const initTime = 10;
  const distance = maxValue / initTime;

  const gameTime: GameTime = {
    accumulate: 0,
    init: initTime,
    distance: maxValue / initTime,
    current: initTime * distance,
  };

  return gameTime;
};
