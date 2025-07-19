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
  return <div className={cn("bg-blue-400 min-h-screen px-4 pt-20 md:px-8 md:pt-20", className)}>{children}</div>;
}
