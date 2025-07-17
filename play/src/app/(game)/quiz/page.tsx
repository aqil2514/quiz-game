import QuizTemplate from "@/components/templates/QuizTemplate";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getQuestions } from "@/lib/quiz/get-questions";
import { shuffleQuestions } from "@/lib/quiz/shuffle-questions";

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

  const raw = await getQuestions(category);

  const questions = shuffleQuestions(raw);

  return <QuizTemplate questions={questions} />;
}
