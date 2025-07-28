import { Button } from "@/components/ui/button";
import { SoundEffects } from "@/lib/audio/sound-effects";
import { useConfigStore } from "@/store/config-store";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdScore } from "react-icons/md";
import { toast } from "sonner";

export default function MenuItems() {
  const router = useRouter();
  const { sound } = useConfigStore();

  const menuItems = [
    {
      label: "Mulai Kuis",
      icon: <PlayCircle className="w-5 h-5" />,
      onClick: () => {
        if (sound) SoundEffects.start();
        router.push("/category");
      },
      className: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Panduan",
      icon: <BookOpen className="w-5 h-5" />,
      onClick: () => {
        if (sound) SoundEffects.wrong();
        toast.error("Panduan belum tersedia.");
      },
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    {
      label: "Opsi",
      icon: <Settings className="w-5 h-5" />,
      onClick: () => {
        if (sound) SoundEffects.click();
        router.push("/option");
      },
      className: "bg-gray-500 hover:bg-gray-600 text-white",
    },
    {
      label: "Skor",
      icon: <MdScore className="w-5 h-5" />,
      onClick: () => {
        if (sound) SoundEffects.click();
        router.push("/score");
      },
      className: "bg-yellow-500 hover:bg-yellow-600 text-white",
    },
  ] as const;
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {menuItems.map((item) => (
        <Button
          key={item.label}
          onClick={item.onClick}
          className={`text-lg py-6 px-4 font-semibold flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all duration-200 ${item.className}`}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </motion.div>
  );
}
