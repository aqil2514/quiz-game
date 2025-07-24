import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export async function deleteQuestion(questionId: string) {
  try {
    await axios.delete("/api/quiz/question", {
      params: { questionId },
    });
    toast.success("Data berhasil dihapus");
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      toast.error("Terjadi Kesalahan");
    }
  }
}
