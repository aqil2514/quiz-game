import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import DeleteDialog, { DataSummaryItem } from "../dialog/DeleteDialog";

export interface DropdownAdminContext {
  label: string;
  editLink: string;
  dataSummary?: DataSummaryItem[];
  onConfirm?: () => Promise<void> | void;
}

interface DropdownAdminProps {
  context: DropdownAdminContext;
}

export default function DropdownAdmin({ context }: DropdownAdminProps) {
  const { label, editLink, dataSummary, onConfirm } = context;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="hover:bg-slate-200">
          <IoIosMore />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={editLink}>
            <Edit /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteDialog dataSummary={dataSummary} onConfirm={onConfirm} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
