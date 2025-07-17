import { QuizQuestion } from "@/@types/quiz";
import { promises as fs } from "fs";
import path from "path";

export const getQuestions = async (category: string): Promise<QuizQuestion[]> => {
  const filePath = path.join(process.cwd(), "public", "data", `${category}.json`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
};
