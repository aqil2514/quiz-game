import { QuizScore } from "@/@types/quiz";
import { endpointServer } from "@/lib/variables/endpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const raw: QuizScore = await req.json();

  try {
    await axios.post(`${endpointServer}/quiz/score`, raw);
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({}, { status: 200 });
}