"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import NoSessionNavbar from "./NoSessionNavbar";
import SessionNavbar from "./SessionNavbar";

export default function Header() {
  const session = useSession();
  return (
    <header className="w-full px-4 py-3 border-b flex justify-between items-center bg-blue-800 border-none fixed top-0 left-0 z-50">
      <Link href="/" className="text-xl font-bold text-yellow-500">
        Kuiz
      </Link>
      {session.data?.user ? <SessionNavbar /> : <NoSessionNavbar />}
    </header>
  );
}
