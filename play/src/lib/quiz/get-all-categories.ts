import { QuizCategories } from "@/@types/quiz";
import axios from "axios";
import { endpointServer } from "../variables/endpoint";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${endpointServer}/quiz/all-categories`);

    return data as QuizCategories[]
  } catch (error) {
    console.error(error)
    throw error
  }
}