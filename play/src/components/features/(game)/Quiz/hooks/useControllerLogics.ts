import { useSession } from "next-auth/react";
import { useQuizData } from "../Provider";
import { getAndRunQuizTimer, getQuizScore } from "../utils";

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
  const session = useSession();
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
    exitHandler,
    setQuizTimer,
    workTime,
  } = useQuizData();

  // Jumlah total soal

  /**
   * Handler untuk berpindah ke soal berikutnya.
   * Jika sudah soal terakhir, maka akan menandai kuis sebagai selesai.
   * Jika masih ada soal, akan reset status soal dan timer.
   */
  const clickHandler = () => {
    if (!nextQuestions) {
      setQuizState((prev) => ({ ...prev, isFinished: true }));
      return;
    }

    setQuizTimer(getAndRunQuizTimer(nextQuestions));
    setCurrentQuiz(currentQuiz + 1);
    setQuizState((prev) => ({ ...prev, isAnswered: false }));
  };

  const closeConfigHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: false }));
    setQuizTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const current = questions[currentQuiz];

  const quizScore = getQuizScore({
    correctAnswers,
    questions,
    userId: session.data?.user.id,
    workTime,
  });

  return {
    clickHandler,
    quizState,
    correctAnswers,
    nextQuestions,
    resetHandler,
    setQuizState,
    exitHandler,
    closeConfigHandler,
    current,
    ...quizScore,
  };
}
