import { QuestionFormSchema } from "./schema";

export const questionFormDefaultValue:QuestionFormSchema = {
    answer: "",
    category: "",
    explanation: "",
    id: "",
    options: ["", "", "", ""],
    question: "",
    timeLimitSeconds: "0",
  }