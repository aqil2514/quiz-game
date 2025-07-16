import { useQuizData } from "../Provider";

export function useControllerButtonLogics() {
  const { setQuizState } = useQuizData();
  
  const pauseHandler = () => {
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
  };

  return { pauseHandler };
}
