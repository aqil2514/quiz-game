import axios from "axios";

export async function getQuestionsByCategory(category: string) {
  const { data } = await axios.get(`/api/quiz/question?category=${category}`);

  return data;
}
