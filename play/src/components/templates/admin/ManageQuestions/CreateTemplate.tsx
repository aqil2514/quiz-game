"use client";

import MainContainer from "@/components/layouts/Container/MainContainer";
import QuestionForm, {
  QustionFormContext,
} from "@/components/features/(admin)/ManageQuestions/QuestionForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addQuestions } from "@/components/features/(admin)/ManageQuestions/utils/addQuestions";
import { QuizCategories } from "@/@types/quiz";

interface ManageQuestionsCreateTemplateProps {
  categories: QuizCategories[];
}

export default function ManageQuestionsCreateTemplate({
  categories,
}: ManageQuestionsCreateTemplateProps) {
  const context: QustionFormContext = {
    onSubmit: async (values) => await addQuestions(values),
    categoryList: categories,
  };
  
  return (
    <MainContainer className="pb-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Buat Soal Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionForm context={context} />
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  );
}
