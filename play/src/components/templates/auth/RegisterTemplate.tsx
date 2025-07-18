"use client";

import Illustration from "@/components/features/(auth)/Register/Illustration";
import RegisterForm from "@/components/features/(auth)/Register/RegisterForm";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { fadeUpVariants } from "@/lib/motionVariants";
import { motion } from "framer-motion";

export default function RegisterTemplate() {
  return (
    <MainContainer className="flex items-center justify-center px-2 md:p-0">
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="bg-white w-full min-h-[510px] md:w-3/4 grid grid-cols-1 md:grid-cols-[auto_65%] rounded-2xl overflow-hidden shadow-2xl shadow-sky-300"
      >
        <RegisterForm />

        <Illustration />
      </motion.div>
    </MainContainer>
  );
}
