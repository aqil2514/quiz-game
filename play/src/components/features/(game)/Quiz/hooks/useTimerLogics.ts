import { useEffect, useMemo } from "react";
import { useQuizData } from "../Provider";
import { useConfigStore } from "@/store/config-store";

export function useTimerLogics() {
  const { setCurrentQuiz, timer, currentQuiz, filteredQuestions } = useQuizData();
  const { useQuestionTime, timer: configTimer } = useConfigStore();

  const time = useMemo(() => {
    const time = new Date();
    if (useQuestionTime) {
      time.setSeconds(
        time.getSeconds() + filteredQuestions[currentQuiz].timeLimitSeconds
      );
    } else {
      time.setSeconds(time.getSeconds() + configTimer);
    }

    return time;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useQuestionTime, currentQuiz]);

  const nowQuiz = filteredQuestions[currentQuiz];

  const { seconds, restart: timerRestart } = timer;
  const initialTime = useMemo(() => {
    if (useQuestionTime) return nowQuiz.timeLimitSeconds;

    return configTimer;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuiz]);

  // Jika terjadi perpindahan soal, restart waktunya
  useEffect(() => {
    timerRestart(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuiz]);

  //** Jika waktunya 0, langsung ke soal berikutnya */
  useEffect(() => {
    if (seconds !== 0) return;

    setCurrentQuiz((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return {
    seconds,
    initialTime,
  };
}
