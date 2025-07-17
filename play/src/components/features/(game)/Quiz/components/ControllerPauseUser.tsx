import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useQuizData } from "../Provider";
import {
  PlayIcon,
  SkipForwardIcon,
  LogOutIcon,
  RotateCcw,
} from "lucide-react";

/**
 * Komponen yang ditampilkan ketika user mem-pause kuis secara manual.
 */
export default function ControllerPauseUser() {
  const { resumeHandler, resetHandler, skipHandler, exitHandler } = useQuizData();

  const actions = [
    {
      label: "Lanjutkan",
      icon: <PlayIcon className="w-5 h-5" />,
      onClick: resumeHandler,
      className:
        "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Lewati",
      icon: <SkipForwardIcon className="w-5 h-5" />,
      onClick: skipHandler,
      className:
        "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      label: "Reset Kuis",
      icon: <RotateCcw className="w-5 h-5" />,
      onClick: resetHandler,
      className:
        "bg-red-600 hover:bg-red-700 text-white",
    },
    {
      label: "Keluar",
      icon: <LogOutIcon className="w-5 h-5" />,
      onClick: exitHandler,
      className:
        "bg-zinc-200 hover:bg-zinc-300 text-black",
    },
  ] as const;

  return (
    <ControllerContainer>
      <div className="text-center space-y-6">
        <motion.h2
          className="text-white text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Kuismu sedang dijeda
        </motion.h2>

        <motion.p
          className="text-white/80 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Pilih aksi berikut untuk melanjutkan atau mengatur ulang kuismu.
        </motion.p>

        <motion.div
          className="grid gap-3 grid-cols-2 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {actions.map((action) => (
            <Button
              key={action.label}
              onClick={action.onClick}
              className={`text-lg px-4 py-2 flex gap-2 justify-center items-center rounded-md font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.03] cursor-pointer ${action.className}`}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </motion.div>
      </div>
    </ControllerContainer>
  );
}
