import { auth } from "@/auth";
import { QuestionFormSchema } from "@/components/features/(admin)/ManageQuestions/variables/schema";
import { mapQuestionSchemaToQuizQuestion } from "@/lib/map/question";
import { endpointServer } from "@/lib/variables/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const raw: QuestionFormSchema = await req.json();
  const formData = mapQuestionSchemaToQuizQuestion(raw);

  try {
    await axios.post(`${endpointServer}/quiz/question`, formData, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

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
      `${endpointServer}/quiz/question/category/${category}`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi Kesalahan" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("questionId");
  if (!id) throw new Error("ID tidak ditemukan");

  try {
    await axios.delete(`${endpointServer}/quiz/question`, {
      params: { id },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return NextResponse.json({ message: "ok" });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  const raw = await req.json();
  const data = {
    ...raw,
    timeLimitSeconds: Number(raw.timeLimitSeconds),
  };

  try {
    await axios.put(`${endpointServer}/quiz/question`, data, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
