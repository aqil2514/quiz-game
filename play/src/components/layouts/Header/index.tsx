"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-4 py-3 border-b flex justify-between items-center bg-blue-800/50 border-none fixed top-0 left-0">
      <Link href="/" className="text-xl font-bold text-yellow-500">
        Kuiz
      </Link>
      <nav className="flex gap-4">
        <Link href="/login">
          <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer hover:scale-95 active:scale-90">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant={"outline"}
            className="cursor-pointer hover:scale-95 active:scale-90"
          >
            Register
          </Button>
        </Link>
      </nav>
    </header>
  );
}
