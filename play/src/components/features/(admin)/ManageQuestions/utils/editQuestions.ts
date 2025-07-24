import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { QuestionFormSchema } from "../variables/schema";

export async function editQuestions(values: QuestionFormSchema) {
  try {
    await axios.put("/api/quiz/question", values);
    toast.success("Data berhasil diperbarui");
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      toast.error("Terjadi Kesalahan");
    }
  }
}
