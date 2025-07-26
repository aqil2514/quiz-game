import ConfigProvider from "@/components/features/(game)/Option/provider";
import React from "react";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider>{children}</ConfigProvider>;
}
