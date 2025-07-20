"use client";

import MainContainer from "@/components/layouts/Container/MainContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdAddCircle } from "react-icons/io";


export default function AdminManageQuestionsTemplate() {
  const pathname = usePathname();
  return (
    <MainContainer>
      <div>Header</div>
      <div>
        <Link href={`${pathname}/create`}>
          <Button className="bg-lime-500 hover:bg-lime-500/50"><IoMdAddCircle /> Tambah Soal</Button>
        </Link>
      </div>
      {/* <DataTable variants="default" /> */}
    </MainContainer>
  );
}
