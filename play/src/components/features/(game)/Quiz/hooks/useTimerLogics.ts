import { useEffect } from "react";
import { useQuizData } from "../Provider";
import { getAndRunQuizTimer } from "../utils";

export function useTimerLogics() {
  const { startTimer, quizTimer, setCurrentQuiz, nextQuestions, setQuizTimer } =
    useQuizData();

  useEffect(() => {
    if (!quizTimer.isRunning) return;
    startTimer();
  }, [startTimer, quizTimer]);

  useEffect(() => {
    const isCurrentZero = quizTimer.current === 0;
    const isRunning = quizTimer.isRunning;

    if (isRunning || !isCurrentZero) return;

    if (nextQuestions) {
      setQuizTimer(getAndRunQuizTimer(nextQuestions));
      setCurrentQuiz((prev) => prev + 1);
    }
  }, [quizTimer, nextQuestions, setQuizTimer, setCurrentQuiz]);

  return {
    startTimer,
    quizTimer,
  };
}
