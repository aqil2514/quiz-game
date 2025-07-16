import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizCardLogics } from "../hooks/useQuizCardLogics";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function QuizCard() {
  const { clickHandler, question, currentQuiz, quizState, answer } =
    useQuizCardLogics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center items-center"
    >
      <Card className="bg-blue-200/50 border-none shadow-blue-100 shadow-md w-3/4">
        <CardHeader className="flex flex-wrap">
          <CardTitle>Pertanyaan #{currentQuiz + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-bold">{question.question}</p>
          {quizState.isAnswered && (
            <p
              className={`${
                quizState.isCorrect
                  ? "bg-green-400 text-green-800"
                  : "bg-red-400 text-red-800 "
              }w-full p-2 rounded-2xl font-bold text-center`}
            >
              {quizState.isCorrect ? "Benar" : "Salah"}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((q) => {
              const isSelected = quizState.isAnswered;
              const isCorrectAnswer = isSelected && q === answer;

              return (
                <Button
                  key={q}
                  data-option={q}
                  className={cn(
                    "bg-blue-400 hover:bg-blue-500 active:scale-90 duration-200 cursor-pointer",
                    isCorrectAnswer && "bg-green-500"
                  )}
                  onClick={clickHandler}
                >
                  {q}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
