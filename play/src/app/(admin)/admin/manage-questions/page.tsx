import AdminManageQuestionsTemplate from "@/components/templates/admin/ManageQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Questions",
};

export default function AdminManageQuestionsPage() {
    return <AdminManageQuestionsTemplate />
}
