import { auth } from "@/auth";
import AdminHeader from "@/components/layouts/Header/Admin";
import AdminSidebar from "@/components/layouts/Sidebar/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  const isAllowed = user?.roles.includes("admin");
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // TODO : Nanti tambahin unauthorized page
  if (!isAllowed) redirect("/login");

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <main className="w-full">
        <AdminHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
