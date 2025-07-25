"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, Plus } from "lucide-react";
import Link from "next/link";

import { questionGroup } from "./variables";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/admin"}>Admin Panel</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuButton asChild isActive={pathname === "/admin"}>
          <Link href={"/admin"}>
            <Home />
            <span>Beranda</span>
          </Link>
        </SidebarMenuButton>
        <SidebarGroup>
          <SidebarGroupLabel>Kelola Soal</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only">Tambah Soal</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            {questionGroup.map((q) => (
              <SidebarMenuButton
                key={q.value}
                asChild
                isActive={q.value === pathname}
              >
                <Link href={q.value}>
                  <q.icon />
                  <span>{q.label}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
