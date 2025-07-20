"use client";

import MainContainer from "@/components/layouts/Container/MainContainer";
import QuestionForm from "@/components/features/(admin)/ManageQuestions/QuestionForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addQuestions } from "@/components/features/(admin)/ManageQuestions/utils/addQuestions";

export default function ManageQuestionsCreateTemplate() {
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
            <QuestionForm
              content={{
                async onSubmit(values) {
                  return await addQuestions(values);
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  );
}
