import { useScoreData } from "../provider";
import ReviewDialog from "./ReviewDialog";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export default function ScoreComponent() {
  const { filteredScore } = useScoreData();

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredScore.map((s, index) => {
        const percentage = (s.totalCorrectAnswers / s.totalQuestions) * 100;
        const isHighScore = percentage >= 80;

        return (
          <div
            key={index}
            className="p-5 rounded-2xl shadow-md bg-white border border-gray-200 transition hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {dayjs(s.date).format("dddd, D MMMM YYYY HH:mm")}
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
                <span className="text-gray-800 font-medium">{s.duration}</span>
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
  );
}
