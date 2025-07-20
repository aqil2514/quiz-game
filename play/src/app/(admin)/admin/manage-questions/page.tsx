import AdminManageQuestionsTemplate from "@/components/templates/admin/ManageQuestions";
import { getAllCategories } from "@/lib/quiz/get-all-categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Questions",
};

export default async function AdminManageQuestionsPage() {
  const categories = await getAllCategories();
  return <AdminManageQuestionsTemplate categories={categories} />;
}
