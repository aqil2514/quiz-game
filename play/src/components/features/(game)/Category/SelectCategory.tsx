import { QuizCategories } from "@/@types/quiz";
import { mapQuizCategoryToFilterOptions } from "@/components/molecules/select/mapToSelectFilter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeUpVariants } from "@/lib/motionVariants";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectCategory({
  categories,
}: {
  categories: QuizCategories[];
}) {
  const [category, setCategory] = useState<string>("");
  const router = useRouter();
  const categoryList = mapQuizCategoryToFilterOptions(categories);

  const playHandler = () => {
    router.push(`/quiz?category=${category}`);
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 w-full"
    >
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          {categoryList.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 duration-200 cursor-pointer"
        onClick={playHandler}
        disabled={!category}
      >
        Mulai Kuis
      </Button>
    </motion.div>
  );
}
