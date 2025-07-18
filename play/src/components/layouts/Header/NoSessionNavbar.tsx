import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoSessionNavbar(){
    return(
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
    )
}