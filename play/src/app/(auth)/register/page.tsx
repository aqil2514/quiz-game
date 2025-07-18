import RegisterTemplate from "@/components/templates/auth/RegisterTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun",
};

export default function RegisterPage() {
  return <RegisterTemplate />;
}
