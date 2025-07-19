"use client";
import { QuizQuestion, QuizState } from "@/@types/quiz";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { defaultQuizState } from "./variables";
import { useRouter } from "next/navigation";
import { useConfigStore } from "@/store/config-store";
import { GameTimer } from "@/@types/time";
import { getAndRunQuizTimer } from "./utils";

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
  resetHandler: () => void;
  resumeHandler: () => void;
  skipHandler: () => void;
  exitHandler: () => void;
  quizTimer: GameTimer;
  setQuizTimer: Dispatch<SetStateAction<GameTimer>>;
  startTimer: () => void;
  stopTimer: () => void;
  workTime: number[];
  setWorkTime: Dispatch<SetStateAction<number[]>>;
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
  const [quizTimer, setQuizTimer] = useState<GameTimer>({
    current: Number(questions[currentQuiz].timeLimitSeconds),
    total: Number(questions[currentQuiz].timeLimitSeconds),
    isRunning: true,
  });
  const [workTime, setWorkTime] = useState<number[]>([]);

  const { useQuestionTime, setTimer } = useConfigStore();

  const router = useRouter();
  const nextQuestions = questions[currentQuiz + 1];

  useEffect(() => {
    if (useQuestionTime && questions[0].timeLimitSeconds) {
      setTimer(questions[0].timeLimitSeconds);
    }
  }, [useQuestionTime, setTimer, questions]);

  const resetHandler = () => {
    setQuizState(defaultQuizState);
    setCorrectAnswers(0);
    setCurrentQuiz(0);
    setWorkTime([]);
    if (useQuestionTime && questions[0].timeLimitSeconds) {
      setTimer(questions[0].timeLimitSeconds);
    }
    setQuizTimer(getAndRunQuizTimer(questions[0]));
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
    setQuizTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const exitHandler = () => {
    router.push("/");
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setQuizTimer((prev) => {
        const next = prev.current - 1;

        if (next <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return { ...prev, current: 0, isRunning: false };
        }

        return { ...prev, current: next };
      });
    }, 1000);

    setQuizTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setQuizTimer((prev) => ({ ...prev, isRunning: false }));
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
    resetHandler,
    resumeHandler,
    skipHandler,
    exitHandler,
    quizTimer,
    setQuizTimer,
    startTimer,
    stopTimer,
    workTime,
    setWorkTime,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuizData = () => useContext(QuizContext);
