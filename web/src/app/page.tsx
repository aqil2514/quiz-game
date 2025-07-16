import HomeTemplate from "@/components/templates/HomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Menu | Quiz",
};

export default function Home() {
  return <HomeTemplate />;
}
