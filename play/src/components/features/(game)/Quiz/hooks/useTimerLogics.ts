import { useEffect, useMemo } from "react";
import { useQuizData } from "../Provider";

export function useTimerLogics() {
  const {
    setCurrentQuiz,
    timer,
    currentQuiz,
    questions,
  } = useQuizData();

  const time = new Date();
  const nowQuiz = questions[currentQuiz];

  const { seconds, restart: timerRestart } = timer;
  const initialTime = useMemo(() => {
    return nowQuiz.timeLimitSeconds;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuiz])

  useEffect(() => {
    if (currentQuiz === 0) {return};
    
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
    initialTime
  };
}
