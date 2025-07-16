"use client";
import { QuizQuestion } from "@/@types/quiz";
import MainContainer from "../layouts/Container/MainContainer";
import QuizCard from "../features/Quiz/components/QuizCard";
import { QuizProvider } from "../features/Quiz/Provider";
import Controller from "../features/Quiz/components/Controller";
import Timer from "../features/Quiz/components/Timer";
import ButtonControllers from "../features/Quiz/components/ButtonControllers";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import Loading from "@/app/loading";

interface QuizTemplateProps {
  questions: QuizQuestion[];
}

export default function QuizTemplate({ questions }: QuizTemplateProps) {
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return <Loading />;
  return (
    <QuizProvider questions={questions}>
      <MainContainer className="flex flex-col justify-center items-center space-y-4">
        <ButtonControllers />
        <QuizCard />
        <Timer />

        <Controller />
      </MainContainer>
    </QuizProvider>
  );
}
