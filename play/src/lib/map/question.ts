import { QuizQuestion } from "@/@types/quiz";
import { QuestionFormSchema } from "@/components/features/(admin)/ManageQuestions/variables/schema";

export function mapQuestionSchemaToQuizQuestion(
  raw: QuestionFormSchema
): QuizQuestion {
  return {
    ...raw,
    id: undefined,
    question: raw.question,
    timeLimitSeconds: Number(raw.timeLimitSeconds),
  };
}
