"use client";
import { QuizQuestion, QuizState } from "@/@types/quiz";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useMemo,
} from "react";
import { defaultQuizState } from "./variables";
import { useRouter } from "next/navigation";
import { useConfigStore } from "@/store/config-store";
import { useStopwatch, useTimer } from "react-timer-hook";
import { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";
import { useTimerResultType } from "react-timer-hook/dist/types/src/useTimer";
import { toast } from "sonner";

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
  stopwatch: useStopwatchResultType;
  timer: useTimerResultType;
}

const QuizContext = createContext<QuizContextState>({} as QuizContextState);

interface QuizProviderProps {
  questions: QuizQuestion[];
  children: React.ReactNode;
}

export function QuizProvider({ children, questions }: QuizProviderProps) {
  const { useQuestionTime, timer: configTimer } = useConfigStore();

  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [filteredQuestions, setFilteredQuestions] =
    useState<QuizQuestion[]>(questions);

  const time = useMemo(() => {
    const time = new Date();
    if (useQuestionTime) {
      time.setSeconds(
        time.getSeconds() + questions[currentQuiz].timeLimitSeconds
      );
    } else {
      time.setSeconds(time.getSeconds() + configTimer);
    }

    return time;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useQuestionTime, currentQuiz]);

  const stopwatch = useStopwatch();
  const timer = useTimer({ expiryTimestamp: time });

  const router = useRouter();
  const nextQuestions = questions[currentQuiz + 1];

  const resetHandler = () => {
    toast.info("Permainan dimulai ulang");
    router.refresh();
    setQuizState(defaultQuizState);
    setCorrectAnswers(0);
    setCurrentQuiz(0);
    stopwatch.reset();
    timer.restart(time);
  };

  const skipHandler = () => {
    if (!nextQuestions) return;
    timer.restart(time);
    setCurrentQuiz((prev) => prev + 1);
    setQuizState((prev) => ({ ...prev, isPausedUser: false }));
  };

  const resumeHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: false }));
    timer.resume();
    stopwatch.start();
  };

  const exitHandler = () => {
    router.push("/");
  };

  const value: QuizContextState = {
    stopwatch,
    timer,
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
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuizData = () => useContext(QuizContext);
