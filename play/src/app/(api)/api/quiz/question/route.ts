import { QuestionFormSchema } from "@/components/features/(admin)/ManageQuestions/QuestionForm";
import { mapQuestionSchemaToQuizQuestion } from "@/lib/map/mapQuestionSchemaToQuizQuestion";
import { endpointServer } from "@/lib/variables/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const raw: QuestionFormSchema = await req.json();
  const formData = mapQuestionSchemaToQuizQuestion(raw);

  try {
    await axios.post(`${endpointServer}/quiz/question`, formData);

    return NextResponse.json(
      { message: "Soal berhasil ditambah" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.message, error },
        { status: 500 }
      );
    }
  }
}
