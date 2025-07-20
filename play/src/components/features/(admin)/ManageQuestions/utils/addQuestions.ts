import axios, { isAxiosError } from "axios";
import { QuestionFormSchema } from "../QuestionForm";
import { toast } from "sonner";

export async function addQuestions(values: QuestionFormSchema) {
  try {
    await axios.post("/api/quiz/question", values);
    toast.success("Data berhasil ditambah");
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      toast.error("Terjadi Kesalahan");
    }
  }
}
