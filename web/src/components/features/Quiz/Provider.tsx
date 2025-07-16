"use client";
import { QuizQuestion, QuizState } from "@/@types/quiz";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { defaultGameTime, defaultQuizState } from "./variables";
import { GameTime } from "@/@types/time";
import { useRouter } from "next/navigation";
import { useConfigStore } from "@/store/config-store";

interface QuizContextState {
  questions: QuizQuestion[];
  filteredQuestions: QuizQuestion[];
  setFilteredQuestions: Dispatch<SetStateAction<QuizQuestion[]>>;
  currentQuiz: number;
  setCurrentQuiz: Dispatch<SetStateAction<number>>;
  quizState: QuizState;
  setQuizState: Dispatch<SetStateAction<QuizState>>;
  correctAnswers: number;
  setCorrectAnswers: Dispatch<SetStateAction<number>>;
  nextQuestions: QuizQuestion;
  setGameTime: Dispatch<SetStateAction<GameTime>>;
  gameTime: GameTime;
  resetHandler: () => void;
  resumeHandler: () => void;
  skipHandler: () => void;
  exitHandler: () => void;
}

const QuizContext = createContext<QuizContextState>({} as QuizContextState);

interface QuizProviderProps {
  questions: QuizQuestion[];
  children: React.ReactNode;
}

export function QuizProvider({ children, questions }: QuizProviderProps) {
  const { timer } = useConfigStore();
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [filteredQuestions, setFilteredQuestions] =
    useState<QuizQuestion[]>(questions);
  const [gameTime, setGameTime] = useState<GameTime>(defaultGameTime(timer));
  const router = useRouter();

  const nextQuestions = questions[currentQuiz + 1];

  /**
   * Handler untuk me-reset seluruh kuis dan mengembalikan ke kondisi awal.
   * Ini termasuk mengatur ulang index soal, skor, status kuis, dan timer.
   */
  const resetHandler = () => {
    setQuizState(defaultQuizState);
    setCorrectAnswers(0);
    setCurrentQuiz(0);
    setGameTime(defaultGameTime(timer));
    router.refresh();
  };

  const skipHandler = () => {
    if (!nextQuestions) return;

    setGameTime(defaultGameTime(timer));
    setCurrentQuiz((prev) => prev + 1);
    setQuizState((prev) => ({ ...prev, isPausedUser: false }));
  };

  const resumeHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: false }));
  };

  const exitHandler = () => {
    router.push("/");
  };

  const value: QuizContextState = {
    questions,
    currentQuiz,
    setCurrentQuiz,
    quizState,
    setQuizState,
    correctAnswers,
    filteredQuestions,
    setFilteredQuestions,
    setCorrectAnswers,
    nextQuestions,
    gameTime,
    setGameTime,
    resetHandler,
    resumeHandler,
    skipHandler,
    exitHandler,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuizData = () => useContext(QuizContext);
