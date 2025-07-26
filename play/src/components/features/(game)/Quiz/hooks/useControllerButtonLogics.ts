import { useQuizData } from "../Provider";

export function useControllerButtonLogics() {
  const { setQuizState, stopwatch, timer } = useQuizData();

  const { seconds, minutes, pause: pauseStopwatch } = stopwatch;
  const { pause: pauseTimer } = timer;

  const pauseHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
    pauseTimer();
    pauseStopwatch();
  };

  const configHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: true }));
    pauseTimer();
    pauseStopwatch();
  };

  const stopwatchTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return { pauseHandler, configHandler, stopwatchTime };
}
