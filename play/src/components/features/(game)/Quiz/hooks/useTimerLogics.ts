import { useEffect, useMemo } from "react";
import { useQuizData } from "../Provider";
import { useConfigStore } from "@/store/config-store";
import { SoundEffects } from "@/lib/audio/sound-effects";
import { QuizQuestionHistory } from "@/@types/quiz";

export function useTimerLogics() {
  const {
    setCurrentQuiz,
    timer,
    currentQuiz,
    filteredQuestions,
    setQuestionHistory,
  } = useQuizData();
  const {
    useQuestionTime,
    timer: configTimer,
    sound,
    useTime,
  } = useConfigStore();

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
  }, [useQuestionTime, currentQuiz, filteredQuestions]);

  const nowQuiz = filteredQuestions[currentQuiz];

  const { seconds, restart: timerRestart, pause } = timer;
  const initialTime = useMemo(() => {
    if (useQuestionTime) return nowQuiz.timeLimitSeconds;

    return configTimer;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuiz]);

  // Jika terjadi perpindahan soal, restart waktunya
  useEffect(() => {
    if (useTime) {
      timerRestart(time);
    } else {
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuiz]);

  //** Jika waktunya 0, langsung ke soal berikutnya */
  useEffect(() => {
    const history: QuizQuestionHistory = {
      ...nowQuiz,
      userAnswer: "Tidak menjawab",
    };
    if (sound) {
      switch (seconds) {
        case 3:
          SoundEffects.timePassing();
          break;
        case 0:
          SoundEffects.timeEnd();
          setCurrentQuiz((prev) => prev + 1);
          setQuestionHistory((prev) => [...prev, history]);
          break;
        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (useTime) pause();
  }, [useTime, pause]);

  return {
    seconds,
    initialTime,
    useTime,
  };
}
