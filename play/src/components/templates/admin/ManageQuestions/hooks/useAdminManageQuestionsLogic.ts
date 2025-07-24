import { QuizCategories, QuizQuestion } from "@/@types/quiz";
import { AdminPageHeaderContext } from "@/components/molecules/header/AdminPageHeader";
import { SelectFilterContext } from "@/components/molecules/select";
import { mapQuizCategoryToFilterOptions } from "@/components/molecules/select/mapToSelectFilter";
import { getQuestionsByCategory } from "@/lib/quiz/get-questions-by-category";
import { useState } from "react";
import AddRoute from "../components/QuizAddRoute";

export function useAdminManageQuestionLogics(categories: QuizCategories[]) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  const filterSelectContext: SelectFilterContext<QuizQuestion[]> = {
    filterSelect: mapQuizCategoryToFilterOptions(categories),
    selectLabel: "Kategori",
    async retrieveHandler(value) {
      return await getQuestionsByCategory(value);
    },
    setData: setQuestions,
  };

  const adminPageHaderContext: AdminPageHeaderContext<QuizQuestion[]> = {
    filterSelectContext,
    RightSide: AddRoute,
  };

  return {questions, adminPageHaderContext, filterSelectContext};
}
