// app/admin/page.tsx (jika pakai Next.js App Router)
import MainContainer from "@/components/layouts/Container/MainContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminTemplate() {
  return (
    <MainContainer className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 p-4 border-r bg-muted/20">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/manage-questions">
            <Button variant="ghost" className="w-full justify-start">
              Kelola Soal
            </Button>
          </Link>
          <Link href="/admin/manage-users">
            <Button variant="ghost" className="w-full justify-start">
              Kelola User
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <section className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Selamat datang, Admin!</h1>
        <p className="text-muted-foreground">
          Pilih menu di sebelah kiri untuk mulai mengelola konten aplikasi.
        </p>
      </section>
    </MainContainer>
  );
}
