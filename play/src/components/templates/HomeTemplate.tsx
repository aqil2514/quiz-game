"use client";

import MainContainer from "../layouts/Container/MainContainer";
import MenuItems from "../features/Home/MenuItems";
import AnimatedCard from "../molecules/cards/AnimatedCard";

export default function HomeTemplate() {
  return (
    <MainContainer className="min-h-screen flex items-center justify-center p-6">
      <AnimatedCard
        title="Selamat Datang di Kuis!"
        description="Pilih salah satu menu berikut untuk memulai"
      >
        <MenuItems />
      </AnimatedCard>
    </MainContainer>
  );
}
