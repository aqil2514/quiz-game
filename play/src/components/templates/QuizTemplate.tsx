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
import ProgressBar from "../features/(game)/Quiz/components/ProgresBar";

interface QuizTemplateProps {
  questions: QuizQuestion[];
}

export default function QuizTemplate({ questions }: QuizTemplateProps) {
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return <Loading />;
  return (
    <QuizProvider questions={questions}>
      <MainContainer className="flex flex-col items-center space-y-4 pt-8">
        <div className="flex justify-between items-center w-3/4">
          <ButtonControllers />
          <Timer />
        </div>
        <QuizCard />
        <ProgressBar />

        <Controller />
      </MainContainer>
    </QuizProvider>
  );
}
