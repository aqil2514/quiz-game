import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizCardLogics } from "../hooks/useQuizCardLogics";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motionVariants";

export default function QuizCard() {
  const { clickHandler, question, currentQuiz, quizState, answer } =
    useQuizCardLogics();

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex justify-center items-center"
    >
      <Card className="bg-blue-200/50 border-none shadow-blue-100 shadow-md w-3/4">
        <CardHeader className="flex flex-wrap">
          <CardTitle>Pertanyaan #{currentQuiz + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p
            className={cn(
              "text-xl font-bold",
              quizState.isPausedUser && "blur-sm"
            )}
          >
            {question.question}
          </p>
          {quizState.isAnswered ? (
            <p
              className={`${
                quizState.isCorrect
                  ? "bg-green-400 text-green-800"
                  : "bg-red-400 text-red-800 "
              }w-full p-2 rounded-2xl font-bold text-center`}
            >
              {quizState.isCorrect ? "Benar" : "Salah"}
            </p>
          ) : (
            <p className="h-10" />
          )}
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((q) => {
              const isSelected = quizState.isAnswered;
              const isCorrectAnswer = isSelected && q === answer;
              const isPaused = quizState.isPausedUser;

              return (
                <Button
                  key={q}
                  data-option={q}
                  className={cn(
                    "bg-blue-400 hover:bg-blue-500 active:scale-90 duration-200 cursor-pointer",
                    isCorrectAnswer && "bg-green-500",
                    isPaused && "blur-sm"
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
