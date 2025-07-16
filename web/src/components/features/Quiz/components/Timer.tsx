import { Progress } from "@/components/ui/progress";
import { useTimerLogics } from "../hooks/useTimerLogics";

export default function Timer() {
const { seconds, gameTime } = useTimerLogics()

  return (
    <div className="w-3/4">
      <p className="text-white font-bold text-2xl">Timer</p>
      <p className="text-white font-bold text-2xl">{seconds} / {gameTime.init}</p>
      <Progress value={gameTime.current} className="bg-slate-300 h-3" />
    </div>
  );
}
