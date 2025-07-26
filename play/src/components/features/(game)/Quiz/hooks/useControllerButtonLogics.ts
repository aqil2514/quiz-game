import { useQuizData } from "../Provider";

export function useControllerButtonLogics() {
  const { setQuizState, stopTimer, stopwatch } = useQuizData();

  const { seconds, minutes, pause:pauseStopwatch } = stopwatch;

  const pauseHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
    stopTimer();
    pauseStopwatch();
  };

  const configHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: true }));
    stopTimer();
    pauseStopwatch();
  };

  const stopwatchTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return { pauseHandler, configHandler, stopwatchTime };
}
