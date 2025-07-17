"use client";

import MainContainer from "@/components/layouts/Container/MainContainer";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <MainContainer className="flex flex-col items-center justify-center gap-6 min-h-screen text-white">
      <motion.div
        className="text-2xl font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Memuat halaman...
      </motion.div>

      <motion.div
        className="flex space-x-3"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="visible"
        animate="visible"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full bg-teal-400"
            variants={{
              visible: {
                y: [0, -8, 0],
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
        ))}
      </motion.div>
    </MainContainer>
  );
}
