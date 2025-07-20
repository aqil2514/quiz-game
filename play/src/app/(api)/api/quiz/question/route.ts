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

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  if (!category)
    return NextResponse.json(
      { message: "Kategori belum dipilih" },
      { status: 400 }
    );

  try {
    const { data } = await axios.get(
      `${endpointServer}/quiz/category/${category}`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi Kesalahan" }, { status: 500 });
  }
}
