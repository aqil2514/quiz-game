import { fadeUpVariants } from "@/lib/motionVariants";
import { motion } from "framer-motion";
import ConfigSound from "./ConfigSound";
import ConfigTimer from "./ConfigTimer";
import { useRouter } from "next/navigation";
import { PlayIcon, ArrowLeftIcon, RefreshCcw } from "lucide-react";

export default function Config({ isInGame = false }: { isInGame?: boolean }) {
  const router = useRouter();

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="bg-black/30 p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-6"
    >
      <ConfigSound />
      <ConfigTimer />

      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          {isInGame ? "Kembali ke Menu" : "Kembali"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isInGame) {
              location.reload();
              return;
            }
            router.push("/quiz");
          }}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
        >
          {isInGame ? (
            <RefreshCcw className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
          {isInGame ? "Mulai Ulang" : "Mulai Kuis"}
        </motion.button>
      </div>
    </motion.div>
  );
}
