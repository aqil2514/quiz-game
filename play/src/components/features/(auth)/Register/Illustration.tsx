export default function Illustration() {
  return (
    <div
      className="hidden md:block relative w-full h-full min-h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden shadow-md border border-gray-200"
      style={{ backgroundImage: "url('/images/register-page.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
          Buat Akun Kuizmu Sekarang
        </h1>
        <p className="mt-4 text-white text-sm md:text-base max-w-md">
          Daftarkan dirimu dan mulai tantangan seru! Raih skor tertinggi dan
          puncaki leaderboard.
        </p>
      </div>
    </div>
  );
}
