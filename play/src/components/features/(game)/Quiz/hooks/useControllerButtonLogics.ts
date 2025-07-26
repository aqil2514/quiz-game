import { useQuizData } from "../Provider";

export function useControllerButtonLogics() {
  const { setQuizState, stopTimer, stopwatch } = useQuizData();

  const { seconds, minutes } = stopwatch;

  const pauseHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
    stopTimer();
  };

  const configHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: true }));
    stopTimer();
  };

  const stopwatchTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return { pauseHandler, configHandler, stopwatchTime };
}
