"use client";

import Illustration from "@/components/features/(auth)/Login/Illustration";
import LoginForm from "@/components/features/(auth)/Login/LoginForm";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { fadeUpVariants } from "@/lib/motionVariants";
import { motion } from "framer-motion";

export default function LoginTemplate() {
  return (
    <MainContainer className="flex items-center justify-center px-2 md:p-0">
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="bg-white w-full md:w-3/4 grid grid-cols-1 md:grid-cols-[65%_auto] rounded-2xl overflow-hidden shadow-2xl shadow-sky-300"
      >
        <Illustration />

        <LoginForm />
      </motion.div>
    </MainContainer>
  );
}
