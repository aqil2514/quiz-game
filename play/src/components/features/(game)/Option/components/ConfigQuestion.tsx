"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConfigData } from "../provider";

export default function ConfigQuestion() {
  const { totalQuiz, setTotalQuiz } = useConfigData();
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="total-questions" className="text-base text-white">
          Jumlah Soal
        </Label>
        <Input
          id="total-questions"
          type="number"
          value={totalQuiz}
          onChange={(e) => setTotalQuiz(Number(e.target.value))}
          className="text-white font-bold font-mono"
        />
        <p className="text-sm text-white">
          Tentukan berapa banyak soal yang ingin ditampilkan.
        </p>
      </div>
    </div>
  );
}
