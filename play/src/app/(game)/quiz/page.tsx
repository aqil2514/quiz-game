import QuizTemplate from "@/components/templates/QuizTemplate";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { shuffleQuestions } from "@/lib/quiz/shuffle-questions";
import { getQuestionsByCategory } from "@/lib/quiz/get-questions-by-category";

export const metadata: Metadata = {
  title: "Mulai Kuis",
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const category = (await searchParams).category;
  if (typeof category !== "string") redirect("/category");

  const raw = await getQuestionsByCategory(category, true);

  const questions = shuffleQuestions(raw);

  return <QuizTemplate questions={questions} />;
}
