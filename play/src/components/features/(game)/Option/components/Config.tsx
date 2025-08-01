import { fadeUpVariants } from "@/lib/motionVariants";
import { motion } from "framer-motion";
import ConfigSound from "./ConfigSound";
import ConfigTimer from "./ConfigTimer";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, X } from "lucide-react";
import { toast } from "sonner";
import { FaSave } from "react-icons/fa";
import { useConfigData } from "../provider";
import ConfigQuestion from "./ConfigQuestion";
import { useConfigStore } from "@/store/config-store";
import { SoundEffects } from "@/lib/audio/sound-effects";

interface ConfigProps {
  isInGame?: boolean;
  closeHandler?: () => void;
}

export default function Config({
  isInGame = false,
  closeHandler,
}: ConfigProps) {
  const router = useRouter();
  const { saveConfig } = useConfigData();
  const { sound } = useConfigStore();

  const backHandler = () => {
    if (sound) SoundEffects.click();
    router.push("/");
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="bg-black/30 p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-6"
    >
      <ConfigSound />
      {!isInGame && <ConfigTimer />}
      {!isInGame && <ConfigQuestion />}

      <div className="flex flex-col md:flex-row gap-4 justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={backHandler}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          {isInGame ? "Menu" : "Kembali"}
        </motion.button>

        {isInGame && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeHandler}
            className="cursor-pointer bg-red-500 hover:bg-red-600 flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg transition"
          >
            <X /> Batal
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            saveConfig();
            toast.success("Perubahan disimpan");
            if (isInGame) {
              if (closeHandler) closeHandler();
              router.refresh();
            } else {
              router.push("/");
            }
          }}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
        >
          <FaSave className="w-5 h-5" />
          Simpan
        </motion.button>
      </div>
    </motion.div>
  );
}
