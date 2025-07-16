"use client";

import MainContainer from "../layouts/Container/MainContainer";
import { motion } from "framer-motion";
import MenuItems from "../features/Home/MenuItems";

export default function HomeTemplate() {
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

        <MenuItems />
      </motion.div>
    </MainContainer>
  );
}
