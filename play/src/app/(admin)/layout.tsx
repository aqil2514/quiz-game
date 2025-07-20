import { auth } from "@/auth";
import { redirect} from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }:{children:React.ReactNode}){
    const session = await auth();
    const user = session?.user;
    const isAllowed = user?.roles.includes("admin")

    // TODO : Nanti tambahin unauthorized page
    if(!isAllowed) redirect("/login")

    return children
}