import { useConfigStore } from "@/store/config-store";
import { useQuizData } from "../Provider";
import { defaultQuizState } from "../variables";

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
    resetHandler,
    nextQuestions,
    setGameTime,
    gameTime,
    exitHandler,
  } = useQuizData();
  const { timer } = useConfigStore();

  // Jumlah total soal
  const amountQuestion = questions.length;

  // Nilai akhir berdasarkan jumlah benar
  const score =
    amountQuestion > 0
      ? Math.round((correctAnswers / amountQuestion) * 100)
      : 0;

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
        current: prev.next * Number(prev.distance),
        next: timer,
      };
    });
  };

  const closeConfigHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: false }));
  };

  const current = questions[currentQuiz]

  return {
    clickHandler,
    quizState,
    amountQuestion,
    correctAnswers,
    score,
    nextQuestions,
    resetHandler,
    gameTime,
    setQuizState,
    exitHandler,
    closeConfigHandler,
    current
  };
}
