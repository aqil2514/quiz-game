import { useTimerLogics } from "../hooks/useTimerLogics";

export default function Timer() {
  const { seconds } = useTimerLogics();

  return <div className="my-auto">{seconds}</div>;
}
