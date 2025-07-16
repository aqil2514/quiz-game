import { useQuizData } from "../Provider";

export function useControllerButtonLogics() {
  const { setQuizState } = useQuizData();

  const pauseHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
  };

  const configHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: true }));
  };

  return { pauseHandler, configHandler };
}
