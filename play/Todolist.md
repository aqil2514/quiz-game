 ROADMAP — Step-by-Step Pengembangan Aplikasi Kuis
✅ STEP 1: Buat versi dasar (Frontend Only, tanpa backend)
Tujuan: Punya kuis yang bisa jalan dari soal statis

🔧 Fitur:
✅ Halaman beranda
✅ Halaman kuis (1 soal per langkah)
✅ Tipe soal: pilihan ganda
✅ Skor dihitung di akhir
✅ Soal disimpan dalam array di frontend

✅STEP 2: Tambahkan fitur-fitur menengah
Tujuan: Membuat aplikasi lebih dinamis

🔧 Tambahan Fitur:
✅Pilihan kategori kuis
✅Acak urutan soal
✅Timer per kuis
✅Review jawaban benar/salah
✅Simpan soal dalam file JSON berdasarkan kategori (misal data/math.json, data/language.json)
✅Load file soal berdasarkan kategori

✅STEP 3: Tambahkan Auth (Login/Daftar)
Tujuan: Mulai menyimpan skor per user

🔧 Fitur Tambahan:
✅ Halaman Login / Register
✅ Skor disimpan ke backend (misalnya Supabase atau Firebase)
✅ Hanya user login yang bisa melihat riwayat
⚙️ Teknologi:
Auth.js (kalau pakai Next.js)
Firebase Auth / Supabase Auth

STEP 4: Buat Admin Panel
Tujuan: Tambah/edit soal lewat UI

🔧 Fitur Tambahan:
Role-based access (admin / user)
Halaman untuk tambah/edit/hapus soal
Upload soal per kategori
Validasi input soal
📁 Struktur Tambahan:
⚙️ Backend:
Buat API endpoint (REST atau Supabase RPC) untuk CRUD soal
Gunakan database untuk simpan soal (PostgreSQL/Firebase)

STEP 5: Leaderboard & Statistik
Tujuan: Menarik user untuk bersaing

🔧 Fitur Tambahan:
Leaderboard global per kategori
Statistik pribadi (jumlah kuis, skor tertinggi, rata-rata)

STEP 6: Peningkatan UX/UI
Tujuan: Tampilan profesional, siap dipublikasikan

🔧 Upgrade:
Gunakan komponen ShadCN UI untuk UI modern
Tambahkan animasi transisi (Framer Motion)
Responsif mobile
Dark mode

STEP 7: Hosting dan Rilis
Tujuan: Bisa dipakai banyak orang

🔧 Platform Hosting:
Frontend: Vercel / Netlify
Backend: Firebase / Supabase / Railway
Database: Firestore / Supabase PostgreSQL

🚀 Extra (Opsional)
Jika ingin makin canggih:
Real-time multiplayer kuis (pakai WebSocket)
Kuis bertingkat (unlock soal selanjutnya)
PDF laporan hasil ujian
Export skor ke Excel