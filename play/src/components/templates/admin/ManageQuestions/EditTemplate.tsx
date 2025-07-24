"use client";

import { QuizCategories, QuizQuestion } from "@/@types/quiz";
import QuestionForm, {
  QustionFormContext,
} from "@/components/features/(admin)/ManageQuestions/QuestionForm";
import { editQuestions } from "@/components/features/(admin)/ManageQuestions/utils/editQuestions";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditQuestionTemplateProps {
  question: QuizQuestion;
  categories: QuizCategories[];
}

export default function EditQuestionTemplate({
  categories,
  question,
}: EditQuestionTemplateProps) {
  const context: QustionFormContext = {
    categoryList: categories,
    values: {
      ...question,
      timeLimitSeconds: String(question.timeLimitSeconds),
    },
    async onSubmit(values) {
      await editQuestions(values)
    },
  };
  return (
    <MainContainer className="pb-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Edit Soal
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
