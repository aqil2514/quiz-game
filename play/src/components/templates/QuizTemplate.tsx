"use client";
import { QuizQuestion } from "@/@types/quiz";
import MainContainer from "../layouts/Container/MainContainer";
import QuizCard from "../features/(game)/Quiz/components/QuizCard";
import { QuizProvider } from "../features/(game)/Quiz/Provider";
import Controller from "../features/(game)/Quiz/components/Controller";
import ButtonControllers from "../features/(game)/Quiz/components/ButtonControllers";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import Loading from "@/app/loading";
import Timer from "../features/(game)/Quiz/components/Timer";

interface QuizTemplateProps {
  questions: QuizQuestion[];
}

export default function QuizTemplate({ questions }: QuizTemplateProps) {
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return <Loading />;
  return (
    <QuizProvider questions={questions}>
      <MainContainer className="flex flex-col justify-center items-center space-y-4">
        <div className="flex justify-between w-3/4">
          <ButtonControllers />
          <Timer />
        </div>
        <QuizCard />

        <Controller />
      </MainContainer>
    </QuizProvider>
  );
}
