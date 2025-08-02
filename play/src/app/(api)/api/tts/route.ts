// app/api/tts/route.ts
import { NextRequest } from "next/server";
import { getAudioUrl } from "google-tts-api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const lang = searchParams.get("lang");

  if (!text) {
    return new Response('Missing "text" query parameter', { status: 400 });
  }

  if (!lang) {
    return new Response('Missing "lang" query parameter', { status: 400 });
  }

  try {
    const url = getAudioUrl(text, {
      lang,
      slow: false,
      host: "https://translate.google.com",
    });

    const audioRes = await fetch(url);

    if (!audioRes.ok) {
      return new Response("Failed to fetch audio from Google", { status: 502 });
    }

    const arrayBuffer = await audioRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("TTS Error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
