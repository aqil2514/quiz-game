import {
  Timer,
  Info,
  ListChecks,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import { useControllerLogics } from "../hooks/useControllerLogics";

export default function ContinueControllerAnswered() {
  const { nextQuestions, clickHandler, current, quizState } = useControllerLogics();

  const isCorrect = quizState.isCorrect;

  return (
    <ControllerContainer onClick={clickHandler}>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="bg-gradient-to-br from-[#1f2937]/80 to-[#111827]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-white max-w-2xl w-full shadow-2xl space-y-6 animate-fade-in">

          {/* Judul */}
          <div className="text-center space-y-2">
            <h2 className={`text-3xl font-bold flex justify-center items-center gap-2 ${
              isCorrect ? "text-green-400" : "text-red-400"
            }`}>
              {isCorrect ? <ThumbsUp /> : <ThumbsDown />}
              {isCorrect ? "Jawaban Kamu Benar!" : "Sayang, Jawabanmu Salah!"}
            </h2>
            <p className="text-white/70">
              {nextQuestions
                ? "Klik di mana pun untuk melanjutkan ke soal berikutnya"
                : "Kuis telah selesai. Lihat hasil akhir!"}
            </p>
          </div>

          {/* Konten */}
          <div className="space-y-4 text-base md:text-lg">

            {/* Kategori */}
            <div className="flex items-start gap-3">
              <ListChecks className="text-blue-400 mt-1" />
              <div>
                <span className="font-semibold text-blue-300">Kategori:</span> {current.category}
              </div>
            </div>

            {/* Pertanyaan */}
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-400 mt-1" />
              <div>
                <span className="font-semibold text-yellow-300">Pertanyaan:</span> {current.question}
              </div>
            </div>

            {/* Jawaban Benar */}
            <div className="flex items-start gap-3">
              <Info className={`${isCorrect ? "text-green-400" : "text-red-400"} mt-1`} />
              <div>
                <span
                  className={`font-semibold ${
                    isCorrect ? "text-green-300" : "text-red-300"
                  }`}
                >
                  Jawaban Benar:
                </span>{" "}
                <span
                  className={`font-bold ${
                    isCorrect ? "text-green-200" : "text-red-200"
                  }`}
                >
                  {current.answer}
                </span>
              </div>
            </div>

            {/* Penjelasan */}
            {current.explanation && (
              <div className="flex items-start gap-3">
                <Lightbulb className="text-orange-400 mt-1" />
                <div>
                  <span className="font-semibold text-orange-300">Penjelasan:</span>{" "}
                  {current.explanation}
                </div>
              </div>
            )}

            {/* Timer */}
            {current.timeLimitSeconds && (
              <div className="flex items-start gap-3">
                <Timer className="text-purple-400 mt-1" />
                <div>
                  <span className="font-semibold text-purple-300">Batas Waktu:</span>{" "}
                  {current.timeLimitSeconds} detik
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center pt-4">
            <p className="text-xl font-bold animate-pulse">
              {nextQuestions
                ? "🖱 Klik untuk lanjut ke soal berikutnya"
                : "🏁 Klik untuk melihat skor akhir"}
            </p>
          </div>
        </div>
      </div>
    </ControllerContainer>
  );
}
