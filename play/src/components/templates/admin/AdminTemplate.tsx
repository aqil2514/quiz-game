import MainContainer from "@/components/layouts/Container/MainContainer";

export default function AdminTemplate() {
  return (
    <MainContainer className="flex min-h-screen">
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
