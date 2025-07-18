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

export default function SessionNavbar() {
  const session = useSession();
  const user = session.data!.user!;

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
          <div className="flex justify-center items-center">
            <Button size={"icon"} variant={"destructive"} onClick={() => signOut({redirectTo:"/?sonner-logout-success=true"})} >
              <LogOut />
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
