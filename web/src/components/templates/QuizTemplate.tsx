"use client";
import { QuizQuestion } from "@/@types/quiz";
import MainContainer from "../layouts/Container/MainContainer";
import QuizCard from "../features/Quiz/components/QuizCard";
import { QuizProvider } from "../features/Quiz/Provider";
import ContinueController from "../features/Quiz/components/ContinueController";
import Timer from "../features/Quiz/components/Timer";

interface QuizTemplateProps {
  questions: QuizQuestion[];
}

export default function QuizTemplate({ questions }: QuizTemplateProps) {
  return (
    <QuizProvider questions={questions}>
      <MainContainer className="flex flex-col justify-center items-center space-y-4">
        {/* Judul */}

        {/* Header */}

        {/* Controller */}
        <ContinueController />

        {/* Soal */}
        <QuizCard />
        <Timer />
      </MainContainer>
    </QuizProvider>
  );
}
