import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useScoreData } from "../provider";
import { useEffect, useState } from "react";

export default function NoScoreComponent() {
  const { filteredScore } = useScoreData();
  const [isPublicSource, setIsPublicScore] = useState<boolean>(false);

  useEffect(() => {
    if (filteredScore[0]?.userId === "public") setIsPublicScore(true);

    return setIsPublicScore(false);
  }, [filteredScore]);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl text-gray-600">
      <p className="text-lg mb-4">Belum ada skor yang tersimpan 😕</p>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="outline">🔁 Kembali ke Beranda</Button>
        </Link>
        <Link href={isPublicSource ? "/quiz" : "/login"}>
          <Button>{isPublicSource ? "🚀 Mulai Kuis" : "Login"}</Button>
        </Link>
      </div>
    </div>
  );
}
