"use client";
import { QuizScore } from "@/@types/quiz";
import MainContainer from "../layouts/Container/MainContainer";
import ScoreProfileSection from "../features/(game)/score/ProfileSection";
import { getPublicScore } from "@/lib/local-storage/score";
import { useEffect, useState } from "react";
import ReviewDialog from "../features/(game)/score/ReviewDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScoreTemplate({ score }: { score: QuizScore[] }) {
  const [finalScore, setFinalScore] = useState<QuizScore[]>(score);

  useEffect(() => {
    if (score.length === 0) {
      setFinalScore(getPublicScore());
    }
  }, [score]);

  return (
    <MainContainer>
      <ScoreProfileSection />

      <h2 className="text-2xl font-bold mb-4 mt-6">📊 Riwayat Skor Kamu</h2>

      {finalScore.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl text-gray-600">
          <p className="text-lg mb-4">Belum ada skor yang tersimpan 😕</p>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline">🔁 Kembali ke Beranda</Button>
            </Link>
            <Link href="/quiz">
              <Button>🚀 Mulai Kuis</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {finalScore.map((s, index) => {
            const percentage = (s.totalCorrectAnswers / s.totalQuestions) * 100;
            const isHighScore = percentage >= 80;

            return (
              <div
                key={index}
                className="p-5 rounded-2xl shadow-md bg-white border border-gray-200 transition hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(s.date).toLocaleString()}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      isHighScore
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {s.category}
                  </span>
                </div>

                <div className="text-xl font-semibold mb-2">
                  {s.totalCorrectAnswers}/{s.totalQuestions} Skor
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full ${
                      isHighScore ? "bg-green-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="text-sm flex justify-between text-gray-600 mt-2">
                  <span>
                    Durasi:{" "}
                    <span className="text-gray-800 font-medium">
                      {s.duration}
                    </span>
                  </span>
                  <ReviewDialog score={s} />
                  <span>
                    Nilai:{" "}
                    <span className="text-gray-800 font-medium">{s.score}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </MainContainer>
  );
}
