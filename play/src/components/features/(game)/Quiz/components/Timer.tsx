import { useTimerLogics } from "../hooks/useTimerLogics";

export default function Timer() {
  const { quizTimer } = useTimerLogics();
  
  return <div className="my-auto">{quizTimer.current}</div>;
}
