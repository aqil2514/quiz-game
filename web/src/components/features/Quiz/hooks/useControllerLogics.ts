import { useRouter } from "next/navigation";
import { useQuizData } from "../Provider";
import { defaultGameTime, defaultQuizState } from "../variables";

  /**
   * Hook logika utama untuk mengelola alur kuis dan kontrol navigasi soal.
   * Digunakan oleh komponen controller (seperti tombol lanjut atau hasil akhir).
   *
   * @returns {
   *   - isFinished: Apakah kuis sudah selesai,
   *   - clickHandler: Fungsi untuk pindah ke soal berikutnya,
   *   - quizState: Status soal saat ini (sudah dijawab atau belum, benar atau salah),
   *   - amountQuestion: Total jumlah soal,
   *   - correctAnswers: Jumlah jawaban benar,
   *   - score: Nilai akhir kuis (dalam persen),
   *   - nextQuestions: Soal berikutnya (jika masih ada),
   *   - resetHandler: Fungsi untuk mereset semua state ke awal,
   *   - gameTime: Objek yang berisi informasi timer
   * }
   */
  export function useControllerLogics() {
    // Mengambil semua state dan updater yang dibutuhkan dari context
    const {
      quizState,
      setCurrentQuiz,
      currentQuiz,
      setQuizState,
      correctAnswers,
      questions,
      setCorrectAnswers,
      nextQuestions,
      setGameTime,
      gameTime,
    } = useQuizData();

    // Jumlah total soal
    const amountQuestion = questions.length;

    // Nilai akhir berdasarkan jumlah benar
    const score =
      amountQuestion > 0
        ? Math.round((correctAnswers / amountQuestion) * 100)
        : 0;

    const router = useRouter();

    /**
     * Handler untuk berpindah ke soal berikutnya.
     * Jika sudah soal terakhir, maka akan menandai kuis sebagai selesai.
     * Jika masih ada soal, akan reset status soal dan timer.
     */
    const clickHandler = () => {
      if (!nextQuestions) {
        setQuizState((prev) => ({ ...prev, isFinished: true, isPaused: true }));
        return;
      }

      setCurrentQuiz(currentQuiz + 1);
      setQuizState(defaultQuizState);
      setQuizState((prev) => ({ ...prev, isPaused: false }));
      setGameTime((prev) => {
        return {
          ...prev,
          current: prev.init * Number(prev.distance),
        };
      });
    };

    /**
     * Handler untuk me-reset seluruh kuis dan mengembalikan ke kondisi awal.
     * Ini termasuk mengatur ulang index soal, skor, status kuis, dan timer.
     */
    const resetHandler = () => {
      setQuizState(defaultQuizState);
      setCorrectAnswers(0);
      setCurrentQuiz(0);
      setGameTime(defaultGameTime());
      router.refresh(); // Refresh halaman agar kondisi kembali segar
    };

    return {
      clickHandler,
      quizState,
      amountQuestion,
      correctAnswers,
      score,
      nextQuestions,
      resetHandler,
      gameTime,
    };
  }

