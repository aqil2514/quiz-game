import { useEffect } from "react";
import { useQuizData } from "../Provider";

export function useTimerLogics() {
  const {
    setCurrentQuiz,
    timer,
    currentQuiz,
    questions,
  } = useQuizData();

  const time = new Date();

  const { seconds, restart: timerRestart } = timer;

  useEffect(() => {
    if (currentQuiz === 0) return;
    const nowQuiz = questions[currentQuiz];
    time.setSeconds(time.getSeconds() + nowQuiz.timeLimitSeconds);
    timerRestart(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuiz]);

  useEffect(() => {
    if (seconds !== 0) return;
    setCurrentQuiz((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return {
    seconds,
  };
}
