import CategoryTemplate from "@/components/templates/CategoryTemplate";
import { getAllCategories } from "@/lib/quiz/get-all-categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
};

export default async function CategoryPage() {
  const categories = await getAllCategories();

  return <CategoryTemplate categories={categories} />;
}
