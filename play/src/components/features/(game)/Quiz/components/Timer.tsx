import { Progress } from "@/components/ui/progress";
import { useTimerLogics } from "../hooks/useTimerLogics";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motionVariants";
import { useConfigStore } from "@/store/config-store";

export default function Timer() {
  const { seconds, gameTime } = useTimerLogics();
  const { timer } = useConfigStore();

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="w-3/4"
    >
      <p className="text-white font-bold text-2xl">Timer</p>
      <p className="text-white font-bold text-2xl">
        {seconds} / {timer}
      </p>
      <Progress value={gameTime.current} className="bg-slate-300 h-3" />
    </motion.div>
  );
}
