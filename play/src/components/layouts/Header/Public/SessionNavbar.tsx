import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SessionAvatar from "./SessionAvatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { menuNavigation } from "./variables/menuNavigation";
import { cn } from "@/lib/utils";

export default function SessionNavbar() {
  const session = useSession();
  const user = session.data!.user!;
  const roles = user.roles;
  const isAdmin = roles.includes("admin");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer hover:scale-110 duration-200">
        <SessionAvatar />
      </SheetTrigger>
      <SheetContent className="bg-blue-400">
        <SheetHeader>
          <SheetTitle className="text-center text-white font-bold">
            {user.email}
          </SheetTitle>
          <div className="flex justify-center items-center gap-4">
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() =>
                signOut({ redirectTo: "/?sonner-logout-success=true" })
              }
            >
              <LogOut />
            </Button>
            {isAdmin && (
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                size={"icon"}
                onClick={() => router.push("/admin")}
              >
                <MdAdminPanelSettings />
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {menuNavigation.map((m) => {
              const isInPage = pathname === m.value;

              return (
                <Link
                  href={m.value}
                  key={m.value}
                  className={cn(
                    "font-bold text-white flex gap-2 items-center hover:bg-blue-500 px-4 py-2 rounded-sm duration-200 bg-none"
                  , isInPage && "bg-blue-500")}
                >
                  <m.icon className="w-5 h-5" />
                  <p>{m.label}</p>
                </Link>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
