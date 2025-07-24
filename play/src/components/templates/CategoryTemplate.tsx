"use client";
import { QuizCategories } from "@/@types/quiz";
import SelectCategory from "../features/(game)/Category/SelectCategory";
import MainContainer from "../layouts/Container/MainContainer";
import AnimatedCard from "../molecules/cards/AnimatedCard";

interface CategoryTemplateProps{
  categories : QuizCategories[]
}

export default function CategoryTemplate({ categories }: CategoryTemplateProps) {
  return (
    <MainContainer className="min-h-screen flex items-center justify-center p-6">
      <AnimatedCard title="Pilih Kategori" description="Silahkan pilih kaegori">
        <SelectCategory categories={categories} />
      </AnimatedCard>
    </MainContainer>
  );
}
