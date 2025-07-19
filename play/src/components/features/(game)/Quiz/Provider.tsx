"use client";
import { QuizQuestion, QuizState } from "@/@types/quiz";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { defaultQuizState } from "./variables";
import { GameTime } from "@/@types/time";
import { useRouter } from "next/navigation";
import { useConfigStore } from "@/store/config-store";

const getGameTime = (time: number): GameTime => {
  const maxValue = 100;
  const distance = maxValue / time;
  return {
    accumulate: 0,
    init: time,
    next: time,
    rest: 0,
    distance,
    current: time * distance,
  };
};

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
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [filteredQuestions, setFilteredQuestions] =
    useState<QuizQuestion[]>(questions);

  const { useQuestionTime, timer, setTimer } = useConfigStore();
  const [gameTime, setGameTime] = useState<GameTime>(() =>
    getGameTime(questions[0].timeLimitSeconds ?? 15)
  );

  const router = useRouter();
  const nextQuestions = questions[currentQuiz + 1];

  useEffect(() => {
    if (useQuestionTime && questions[0].timeLimitSeconds) {
      setTimer(questions[0].timeLimitSeconds);
    }
  }, [useQuestionTime, setTimer, questions]);

  useEffect(() => {
    if (timer) {
      setGameTime(getGameTime(timer));
    }
  }, [timer]);

  const resetHandler = () => {
    setQuizState(defaultQuizState);
    setCorrectAnswers(0);
    setCurrentQuiz(0);
    if (useQuestionTime && questions[0].timeLimitSeconds) {
      setTimer(questions[0].timeLimitSeconds);
    }
    router.refresh();
  };

  const skipHandler = () => {
    if (!nextQuestions) return;
    if (useQuestionTime && nextQuestions.timeLimitSeconds) {
      setTimer(nextQuestions.timeLimitSeconds);
    }
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
    setCorrectAnswers,
    filteredQuestions,
    setFilteredQuestions,
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
