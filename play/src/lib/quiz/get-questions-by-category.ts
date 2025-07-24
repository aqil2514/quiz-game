import axios from "axios";
import { endpointApiRoute } from "../variables/endpoint";

export async function getQuestionsByCategory(
  category: string,
  isServer = false
) {
  const endpoint = isServer
    ? `${endpointApiRoute}/api/quiz/question?category=${category}`
    : `/api/quiz/question?category=${category}`;
  
    const { data } = await axios.get(endpoint);

  return data;
}
