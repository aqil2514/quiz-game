import { Progress } from "@/components/ui/progress";
import { useQuizData } from "../Provider";

export default function ProgressBar() {
  const { questions, currentQuiz } = useQuizData();
  const totalQuiz = questions.length;
  const value = ((currentQuiz + 1) / totalQuiz) * 100;

  return (
    <div className="w-3/4">
      <p className="text-sm mb-1 text-muted-foreground">
        Soal ke-{currentQuiz + 1} dari {totalQuiz} soal
      </p>
      <Progress value={value} />
    </div>
  );
}
