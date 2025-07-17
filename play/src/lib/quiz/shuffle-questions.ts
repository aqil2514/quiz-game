import { QuizQuestion } from "@/@types/quiz";
import { shuffle } from "../utils";

export const shuffleQuestions = (questions: QuizQuestion[]): QuizQuestion[] => {
  return shuffle(questions).map((q) => ({
    ...q,
    options: shuffle(q.options),
  }));
};
