import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuizScore } from "@/@types/quiz";

export default function ReviewDialog({ score }: { score: QuizScore }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">🔍 Review Jawaban</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Review Jawaban ({score.category})</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          {score.questionHistory.map((q, index) => {
            const isCorrect = q.userAnswer === q.answer;

            return (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gray-50 space-y-2"
              >
                <p className="font-medium">
                  {index + 1}. {q.question}
                </p>

                <div className="text-sm text-gray-600">
                  Pilihan Kamu:{" "}
                  <span
                    className={isCorrect ? "text-green-600" : "text-red-600"}
                  >
                    {q.userAnswer}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="text-sm text-gray-600">
                    Jawaban Benar:{" "}
                    <span className="text-green-600">{q.answer}</span>
                  </div>
                )}

                {q.explanation && (
                  <div className="text-sm text-gray-700 border-t pt-2 mt-2">
                    <strong>Penjelasan:</strong>
                    <p className="mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
