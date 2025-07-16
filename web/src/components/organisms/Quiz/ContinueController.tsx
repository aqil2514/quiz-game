import ControllerContainer from "@/components/layouts/Container/ControllerContainer";
import { useControllerLogics } from "./logics";
import { Button } from "@/components/ui/button";

export default function ContinueController() {
  const {
    clickHandler,
    isFinished,
    quizState,
    amountQuestion,
    correctAnswers,
    score,
    nextQuestions,
    resetHandler,
    gameTime,
  } = useControllerLogics();

  if (isFinished) {
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
            <p>Waktu Mengerjakan:</p>
            <p>{gameTime.accumulate} detik</p>
          </div>

          <Button
            onClick={resetHandler}
            className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            🔄 Mulai Lagi
          </Button>
        </div>
      </ControllerContainer>
    );
  }

  if (quizState.isAnswered) {
    return (
      <ControllerContainer onClick={clickHandler}>
        <p className="text-2xl text-white font-bold absolute bottom-36 animate-pulse">
          {nextQuestions
            ? "Klik di mana pun untuk melanjutkan..."
            : "Klik di manapun untuk melihat nilai..."}
        </p>
      </ControllerContainer>
    );
  }

  return null;
}
