import { Infinity } from "lucide-react";
import { useTimerLogics } from "../hooks/useTimerLogics";

export default function Timer() {
  const { seconds, initialTime, useTime } = useTimerLogics();
  const timeSeconds = String(seconds).padStart(2, "0");

  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = ((initialTime - seconds) / initialTime) * circumference;

  return (
    <div className="relative w-[80px] h-[80px]">
      <svg height="80" width="80">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="40"
          cy="40"
        />
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="40"
          cy="40"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white font-mono text-lg">
        {useTime ? timeSeconds : <Infinity /> }
      </div>
    </div>
  );
}
