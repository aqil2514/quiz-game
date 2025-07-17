"use client";
import SelectCategory from "../features/(game)/Category/SelectCategory";
import MainContainer from "../layouts/Container/MainContainer";
import AnimatedCard from "../molecules/cards/AnimatedCard";

export default function CategoryTemplate() {
  return (
    <MainContainer className="min-h-screen flex items-center justify-center p-6">
      <AnimatedCard title="Pilih Kategori" description="Silahkan pilih kaegori">
        <SelectCategory />
      </AnimatedCard>
    </MainContainer>
  );
}
