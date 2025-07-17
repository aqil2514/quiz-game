import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import { useControllerLogics } from "../hooks/useControllerLogics";
import { Button } from "@/components/ui/button";
import { Menu, RotateCcw } from "lucide-react";

export default function ContinueControllerFinish() {
  const {
    score,
    amountQuestion,
    correctAnswers,
    gameTime,
    resetHandler,
    exitHandler,
  } = useControllerLogics();
  const isPerfect = score === 100;
  const isGood = score >= 70;
  const emoji = isPerfect ? "🏆" : isGood ? "🎉" : "💪";

  return (
    <ControllerContainer>
      <div className="z-50 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto text-center space-y-4 border border-white/50">
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
          <p>Total Soal:</p>
          <p>{amountQuestion}</p>
          <p>Jawaban Benar:</p>
          <p>{correctAnswers}</p>
          <p>Sisa Waktu Mengerjakan:</p>
          <p>{gameTime.accumulate.toFixed()} detik</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={resetHandler}
            className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            <RotateCcw /> Mulai Lagi
          </Button>
          <Button
            onClick={exitHandler}
            className="cursor-pointer mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            <Menu /> Main Menu
          </Button>
        </div>
      </div>
    </ControllerContainer>
  );
}
