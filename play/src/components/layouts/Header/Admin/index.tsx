"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

export default function AdminHeader() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <header className="w-full px-4 py-3 border-b bg-gray-900 text-white">
      <div className="flex gap-2">
        <Button
          size={"icon"}
          onClick={toggleSidebar}
          className={cn(
            "hover:bg-gray-700 bg-none",
            open && "bg-gray-700"
          )}
        >
          {open ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </Button>
        <Link href={"/admin"}>
          <div className="text-xl font-bold text-yellow-400">Admin Panel</div>
        </Link>
      </div>
    </header>
  );
}
