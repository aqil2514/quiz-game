import { Button } from "@/components/ui/button";
import { fadeUpVariants } from "@/lib/motionVariants";
import { motion } from "framer-motion";
import { Pause } from "lucide-react";
import { useControllerButtonLogics } from "../hooks/useControllerButtonLogics";

export default function ControllerButton() {
  const { pauseHandler } = useControllerButtonLogics();
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-4 my-2 w-3/4"
    >
      <Button
        size={"icon"}
        className="bg-amber-500 hover:bg-amber-600 cursor-pointer active:scale-90 duration-200 text-white shadow-sm shadow-amber-700"
        onClick={pauseHandler}
      >
        <Pause />
      </Button>
    </motion.div>
  );
}
