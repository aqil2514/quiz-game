import { QuizQuestion } from "@/@types/quiz";
import { endpointServer } from "@/lib/variables/endpoint";
import axios from "axios";

export async function getQuestionById(id: string) {
  try {
    const { data } = await axios.get(`${endpointServer}/quiz/question/${id}`);

    return data as QuizQuestion;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
