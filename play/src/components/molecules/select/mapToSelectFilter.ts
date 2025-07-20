import { QuizCategories } from "@/@types/quiz";
import { FilterOptions } from ".";

export function mapQuizCategoryToFilterOptions(
  raw: QuizCategories[]
): FilterOptions[] {
  const result: FilterOptions[] = raw.map((r) => ({
    label: r.name,
    value: r.name as string,
  }));

  return result;
}
