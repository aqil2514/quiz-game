"use client";

import { QuizCategories, QuizQuestion } from "@/@types/quiz";
import { quizColumns } from "@/components/features/(admin)/ManageQuestions/columns";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { DataTable } from "@/components/molecules/data-tables";
import AdminPageHeader, {
  AdminPageHeaderContext,
} from "@/components/molecules/header/AdminPageHeader";
import { SelectFilterContext } from "@/components/molecules/select";
import { mapQuizCategoryToFilterOptions } from "@/components/molecules/select/mapToSelectFilter";
import { Button } from "@/components/ui/button";
import { getQuestionsByCategory } from "@/lib/quiz/get-questions-by-category";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

interface AdminManageQuestionsTemplateProps {
  categories: QuizCategories[];
}

const AddRoute = () => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/create`}>
      <Button className="bg-lime-500 hover:bg-lime-500/50">
        <IoMdAddCircle /> Tambah Soal
      </Button>
    </Link>
  );
};

export default function AdminManageQuestionsTemplate({
  categories,
}: AdminManageQuestionsTemplateProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const fiterSelectContext: SelectFilterContext<QuizQuestion[]> = {
    filterSelect: mapQuizCategoryToFilterOptions(categories),
    selectLabel: "Kategori",
    async retrieveHandler(value) {
      return await getQuestionsByCategory(value);
    },
    setData: setQuestions,
  };

  const adminPageHaderContext: AdminPageHeaderContext = {
    fiterSelectContext,
    righSide: <AddRoute />,
  };

  return (
    <MainContainer>
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
