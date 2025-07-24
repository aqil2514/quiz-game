import { getQuestionById } from "@/components/features/(admin)/ManageQuestions/utils/getQuestionById";
import EditQuestionTemplate from "@/components/templates/admin/ManageQuestions/EditTemplate";
import { getAllCategories } from "@/lib/quiz/get-all-categories";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [question, categories] = await Promise.all([
    getQuestionById(id),
    getAllCategories(),
  ]);

  return <EditQuestionTemplate question={question} categories={categories} />;
}
