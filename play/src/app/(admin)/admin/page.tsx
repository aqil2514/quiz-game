import AdminTemplate from "@/components/templates/admin/AdminTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return <AdminTemplate />;
}
