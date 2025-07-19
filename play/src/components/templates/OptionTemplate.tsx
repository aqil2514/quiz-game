"use client";
import MainContainer from "../layouts/Container/MainContainer";
import Config from "../features/Option/components/Config";

export default function OptionTemplate() {
  return (
    <MainContainer className="flex items-center flex-col space-y-8">
      <h1 className="font-bold text-4xl text-white">Pengaturan</h1>

      <Config />
    </MainContainer>
  );
}
