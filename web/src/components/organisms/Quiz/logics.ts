import { useQuizData } from "@/components/organisms/Quiz/Provider";
import React, { useEffect, useState } from "react";
import { defaultGameTime, defaultQuizState } from "./variables";
import { useRouter } from "next/navigation";

export function useQuizCardLogics() {
  const {
    questions,
    currentQuiz,
    setCurrentQuiz,
    quizState,
    setQuizState,
    setCorrectAnswers,
    setIsPaused,
    setGameTime,
  } = useQuizData();
  const [option, setOption] = useState<string>("");
  const question = questions[currentQuiz];
  const answer = questions[currentQuiz].answer;

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (quizState.isAnswered) return;
    const target = e.target as HTMLButtonElement;
    const optionSelected = target.dataset.option;
    if (!optionSelected) return;

    setGameTime((prev) => ({
      ...prev,
      accumulate:
        prev.accumulate + prev.current / Number(prev.distance?.toFixed()),
    }));

    const isCorrect = optionSelected.toLowerCase() === answer.toLowerCase();
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);
    setOption(optionSelected);
    setQuizState({
      isAnswered: true,
      isCorrect,
    });
    setIsPaused(true);
  };

  return {
    question,
    setCurrentQuiz,
    clickHandler,
    currentQuiz,
    quizState,
    option,
    answer,
  };
}

export function useControllerLogics() {
  const {
    quizState,
    setCurrentQuiz,
    currentQuiz,
    setQuizState,
    correctAnswers,
    questions,
    setCorrectAnswers,
    isFinished,
    setIsFinished,
    nextQuestions,
    setIsPaused,
    setGameTime,
    gameTime
  } = useQuizData();

  const amountQuestion = questions.length;
  const score =
    amountQuestion > 0
      ? Math.round((correctAnswers / amountQuestion) * 100)
      : 0;
  const router = useRouter();

  const clickHandler = () => {
    if (!nextQuestions) {
      setIsFinished(true);
      return;
    }

    setCurrentQuiz(currentQuiz + 1);
    setQuizState(defaultQuizState);
    setIsPaused(false);
    setGameTime((prev) => {
      return {
        ...prev,
        current: prev.init * Number(prev.distance),
      };
    });
  };

  const resetHandler = () => {
    setQuizState(defaultQuizState);
    setCorrectAnswers(0);
    setIsFinished(false);
    setCurrentQuiz(0);
    setGameTime(defaultGameTime());
    router.refresh();
  };

  return {
    isFinished,
    clickHandler,
    quizState,
    amountQuestion,
    correctAnswers,
    score,
    nextQuestions,
    resetHandler,
    gameTime
  };
}

export function useTimerLogics() {
  const {
    setCurrentQuiz,
    setQuizState,
    isFinished,
    setIsFinished,
    nextQuestions,
    isPaused,
    gameTime,
    setGameTime,
  } = useQuizData();

  const seconds = Number(
    (gameTime.current / Number(gameTime.distance)).toFixed()
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setGameTime((prev) => {
        if (prev.current <= 0) {
          clearInterval(interval);
          return { ...prev, current: 0 };
        }
        return { ...prev, current: prev.current - Number(gameTime.distance) };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTime, setGameTime, isPaused]);

  useEffect(() => {
    if (gameTime.current <= 0) {
      if (!nextQuestions) {
        setIsFinished(true);
        return;
      }
      setCurrentQuiz((prev) => prev + 1);
      setQuizState(defaultQuizState);
      setGameTime((prev) => ({
        ...prev,
        current: prev.init * Number(prev.distance),
      }));
    }
  }, [
    setCurrentQuiz,
    gameTime,
    setQuizState,
    setIsFinished,
    isFinished,
    nextQuestions,
    setGameTime,
  ]);

  return { seconds, gameTime };
}
