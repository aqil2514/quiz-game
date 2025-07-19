import { endpointServer } from "@/lib/variables/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data } = await axios.post(`${endpointServer}/user`, body);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;
      const status = error.status;

      return NextResponse.json(data, { status });
    }
  }

  return NextResponse.json({ body });
}
