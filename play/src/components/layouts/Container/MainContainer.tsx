import { cn } from "@/lib/utils";
import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainContainer({
  children,
  className,
}: MainContainerProps) {
  return <div className={cn("bg-blue-400 min-h-screen", className)}>{children}</div>;
}
