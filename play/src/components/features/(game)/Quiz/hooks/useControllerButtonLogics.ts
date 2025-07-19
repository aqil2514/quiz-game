import { useQuizData } from "../Provider";

export function useControllerButtonLogics() {
  const { setQuizState, stopTimer } = useQuizData();

  const pauseHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
    stopTimer();
  };

  const configHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: true }));
    stopTimer();
  };

  return { pauseHandler, configHandler };
}
