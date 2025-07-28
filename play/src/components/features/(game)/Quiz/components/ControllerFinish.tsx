import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import { useControllerLogics } from "../hooks/useControllerLogics";
import { Button } from "@/components/ui/button";
import { Menu, RotateCcw, Save } from "lucide-react";

export default function ContinueControllerFinish() {
  const {
    score,
    totalQuestions,
    correctAnswers,
    resetHandler,
    exitHandler,
    duration,
    isSavingScore,
    saveHandler,
    questionHistory,
  } = useControllerLogics();
  const isPerfect = score === 100;
  const isGood = score >= 70;
  const emoji = isPerfect ? "🏆" : isGood ? "🎉" : "💪";

  return (
    <ControllerContainer>
      <div className="z-50 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md p-8 rounded-2xl shadow-xl w-4/5 mx-auto text-center space-y-4 border border-white/50 grid grid-cols-2">
        <div>
          <div className="text-4xl">{emoji}</div>
          <h2 className="text-3xl font-bold text-blue-700">Hasil Akhir</h2>

          <div className="grid grid-cols-2 gap-4 text-lg font-medium text-gray-700 justify-items-start">
            <p className="col-span-2">
              Nilai:{" "}
              <span
                className={`text-2xl font-bold ${
                  score === 100
                    ? "text-green-600"
                    : score >= 70
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                {score}
              </span>
            </p>
            <p className="text-sm md:text-base">Total Soal:</p>
            <p className="text-sm md:text-base">{totalQuestions}</p>
            <p className="text-sm md:text-base">Jawaban Benar:</p>
            <p className="text-sm md:text-base">{correctAnswers}</p>
            <p className="text-sm md:text-base">Waktu Mengerjakan:</p>
            <p className="text-sm md:text-base">{duration}</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-700">Review</h2>
          <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2">
            {questionHistory.map((q, i) => {
              const isCorrect = q.userAnswer === q.answer;

              return (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  <p className="text-sm text-gray-500 mb-1">Soal {i + 1}</p>
                  <p className="font-medium text-gray-800 mb-2">{q.question}</p>

                  <div className="space-y-1 text-sm">
                    <p>
                      Jawaban Kamu:{" "}
                      <span
                        className={`font-semibold ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {q.userAnswer}
                      </span>{" "}
                      {isCorrect ? "✔️" : "❌"}
                    </p>
                    {!isCorrect && (
                      <p>
                        Jawaban Benar:{" "}
                        <span className="font-semibold text-green-600">
                          {q.answer}
                        </span>
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-gray-600 mt-1">
                        <span className="italic">Penjelasan:</span>{" "}
                        {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4 justify-center col-span-2">
          <Button
            onClick={resetHandler}
            disabled={isSavingScore}
            className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            <RotateCcw /> Mulai Lagi
          </Button>
          <Button
            onClick={exitHandler}
            disabled={isSavingScore}
            className="cursor-pointer mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            <Menu /> Main Menu
          </Button>
          <Button
            onClick={saveHandler}
            disabled={isSavingScore}
            className="cursor-pointer mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            <Save /> Simpan Hasil
          </Button>
        </div>
      </div>
    </ControllerContainer>
  );
}
