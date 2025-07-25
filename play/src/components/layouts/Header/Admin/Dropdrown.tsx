import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SessionAvatar from "../Public/SessionAvatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { dropdownActions } from "./variables";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";

export default function AdminDropdown() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SessionAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownActions.map((action) => (
          <DropdownMenuItem key={action.value}>
            <Link href={action.value} className="flex gap-2">
              <action.icon className="my-auto" />
              <span>{action.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Button
          variant={"destructive"}
          className="w-full"
          onClick={() => signOut({ redirectTo: "/" })}
        >
          <IoIosLogOut />
          <span>Logout</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
