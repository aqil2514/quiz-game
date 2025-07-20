import ManageQuestionsCreateTemplate from "@/components/templates/admin/ManageQuestions/CreateTemplate";
import { getAllCategories } from "@/lib/quiz/get-all-categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Soal",
};

export default async function ManageQuestionsCreatePage() {
  const categories = await getAllCategories();

  return <ManageQuestionsCreateTemplate categories={categories} />;
}
