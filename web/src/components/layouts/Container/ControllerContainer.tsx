import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface ControllerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function ControllerContainer({
  children,
  className,
  ...props
}: ControllerContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-screen h-screen bg-black/50 absolute flex justify-center items-center",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
