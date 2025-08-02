"use client";
import { QuizQuestionHistory, QuizQuestion, QuizState } from "@/@types/quiz";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { defaultQuizState } from "./variables";
import { useRouter } from "next/navigation";
import { useConfigStore } from "@/store/config-store";
import { useStopwatch, useTimer } from "react-timer-hook";
import { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";
import { useTimerResultType } from "react-timer-hook/dist/types/src/useTimer";
import { toast } from "sonner";
import { SoundEffects } from "@/lib/audio/sound-effects";
import { shuffleQuestions } from "@/lib/quiz/shuffle-questions";
import { getQuestionTime, GetQuestionTimeConfig } from "@/lib/quiz/get-time";

interface QuizContextState {
  questions: QuizQuestion[];
  filteredQuestions: QuizQuestion[];
  setFilteredQuestions: Dispatch<SetStateAction<QuizQuestion[]>>;
  questionHistory: QuizQuestionHistory[];
  setQuestionHistory: Dispatch<SetStateAction<QuizQuestionHistory[]>>;
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
  const {
    useQuestionTime,
    timer: configTimer,
    totalQuestion,
    sound,
    useTime,
  } = useConfigStore();

  // Hooks
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [filteredQuestions, setFilteredQuestions] =
    useState<QuizQuestion[]>(questions);
  const [questionHistory, setQuestionHistory] = useState<QuizQuestionHistory[]>(
    []
  );
  const router = useRouter();

  const getTimeConfig: GetQuestionTimeConfig = {
    configTimer,
    currentQuiz,
    questions: filteredQuestions,
    isUseGlobalTime: useQuestionTime,
  };

  const time = useMemo(
    () => getQuestionTime(getTimeConfig),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useQuestionTime, questions]
  );
  const stopwatch = useStopwatch();
  const timer = useTimer({ expiryTimestamp: time, autoStart: false });

  // EFFECTS
  useEffect(() => {
    setFilteredQuestions((prev) => prev.slice(0, totalQuestion));
  }, [totalQuestion]);

  useEffect(() => {
    if (quizState.isPausedUser) return; 

    if (useTime) {
      timer.restart(time);
    } else {  
      timer.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useTime, time, quizState.isPausedUser]);

  const nextQuestions = filteredQuestions[currentQuiz + 1];

  // Controller
  const resetHandler = () => {
    router.refresh();

    if (sound) SoundEffects.start();
    toast.info("Permainan dimulai ulang");
    const newQuest = shuffleQuestions(questions);
    setFilteredQuestions(newQuest.slice(0, totalQuestion));
    setQuizState(defaultQuizState);
    setCorrectAnswers(0);
    setCurrentQuiz(0);
    setQuestionHistory([]);
    stopwatch.reset();

    switch (useTime) {
      case true:
        timer.restart(time);
        break;
      default:
        timer.pause();
        break;
    }
  };

  const skipHandler = () => {
    if (sound) SoundEffects.wrong();

    if (!nextQuestions) return;
    setCurrentQuiz((prev) => prev + 1);
    setQuizState((prev) => ({ ...prev, isPausedUser: false }));

    switch (useTime) {
      case true:
        timer.restart(time);
        break;
      default:
        timer.pause();
        break;
    }
  };

  const resumeHandler = () => {
    if (sound) SoundEffects.start();
    setQuizState((prev) => ({ ...prev, isPausedUser: false }));
    switch (useTime) {
      case true:
        timer.restart(time);
        break;
      default:
        timer.pause();
        break;
    }
    stopwatch.start();
  };

  const exitHandler = () => {
    if (sound) SoundEffects.click();
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
    questionHistory,
    setQuestionHistory,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuizData = () => useContext(QuizContext);
