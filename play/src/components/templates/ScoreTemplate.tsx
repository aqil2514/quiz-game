import { QuizScore } from "@/@types/quiz";
import MainContainer from "../layouts/Container/MainContainer";

export default function ScoreTemplate({ score }: { score: QuizScore[] }) {
  return (
    <MainContainer>
      <h2 className="text-2xl font-bold mb-4">Riwayat Skor</h2>
      <div className="grid grid-cols-1 gap-4">
        {score.map((s) => (
          <div
            key={s.id}
            className="p-4 rounded-xl shadow-md bg-white border"
          >
            <div className="font-semibold text-lg">{s.category}</div>
            <div className="text-sm text-gray-500 mb-2">{new Date(s.date).toLocaleString()}</div>
            <div className="flex justify-between text-sm">
              <div>Skor: <span className="font-medium">{s.score}/{s.totalQuestions}</span></div>
              <div>Durasi: <span className="font-medium">{formatSeconds(s.duration)}</span></div>
              <div>Time/Quest: <span className="font-medium">{s.timeQuestTotal}s</span></div>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}

function formatSeconds(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}m ${sec}s`;
}
