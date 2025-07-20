import ManageQuestionsCreateTemplate from "@/components/templates/admin/ManageQuestions/CreateTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Soal",
};

export default function ManageQuestionsCreatePage() {
  return <ManageQuestionsCreateTemplate />;
}
