import { userCollection } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await userCollection.add(body);

  return NextResponse.json({ body });
}
