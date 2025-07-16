"use client";

import { HistoryIcon, InfoIcon, PlayIcon } from "lucide-react";
import MainContainer from "../layouts/Container/MainContainer";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function HomeTemplate() {
  const router = useRouter();
  const menuItems = [
    {
      label: "Mulai Kuis",
      icon: <PlayIcon className="w-5 h-5" />,
      onClick: () => router.push("/quiz"),
      bg: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Petunjuk",
      icon: <InfoIcon className="w-5 h-5" />,
      onClick: () => alert("Fitur belum tersedia."),
      bg: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      label: "Riwayat Skor",
      icon: <HistoryIcon className="w-5 h-5" />,
      onClick: () => alert("Fitur belum tersedia."),
      bg: "bg-zinc-200 hover:bg-zinc-300 text-black",
    },
  ] as const;
  return (
    <MainContainer className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-10 max-w-md w-full text-center space-y-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Selamat Datang di Kuis!
        </motion.h1>

        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Pilih salah satu menu berikut untuk memulai
        </motion.p>

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
              className={`text-lg py-6 px-4 font-semibold flex items-center justify-center gap-2 rounded-xl transition-all duration-200 ${item.bg}`}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </motion.div>
      </motion.div>
    </MainContainer>
  );
}
