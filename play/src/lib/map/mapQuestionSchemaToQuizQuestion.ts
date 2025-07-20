import { QuizQuestion } from "@/@types/quiz";
import { QuestionFormSchema } from "@/components/features/(admin)/ManageQuestions/QuestionForm";

export function mapQuestionSchemaToQuizQuestion(
  raw: QuestionFormSchema
): QuizQuestion {
  return {
    ...raw,
    id: undefined,
    // @ts-expect-error Ga dipakek. Jadi "question" yang dipakek
    questions: undefined,
    question: raw.questions,
    timeLimitSeconds: Number(raw.timeLimitSeconds),
  };
}
