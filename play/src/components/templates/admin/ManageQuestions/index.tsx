"use client";

import { QuizCategories } from "@/@types/quiz";
import { quizColumns } from "@/components/features/(admin)/ManageQuestions/variables/columns";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { DataTable } from "@/components/molecules/data-tables";
import AdminPageHeader from "@/components/molecules/header/AdminPageHeader";
import { useAdminManageQuestionLogics } from "./hooks/useAdminManageQuestionsLogic";

interface AdminManageQuestionsTemplateProps {
  categories: QuizCategories[];
}

export default function AdminManageQuestionsTemplate({
  categories,
}: AdminManageQuestionsTemplateProps) {
  const { adminPageHaderContext, questions } =
    useAdminManageQuestionLogics(categories);

  return (
    <MainContainer className="pb-8">
      <div>Header</div>
      <AdminPageHeader context={adminPageHaderContext} />
      <DataTable
        variants="default"
        context={{
          columns: quizColumns,
          data: questions,
        }}
      />
    </MainContainer>
  );
}
