import { useSession } from "next-auth/react";
import { useQuizData } from "../Provider";
import { getQuizScore } from "../utils";
import { useEffect, useRef } from "react";
import axios from "axios";

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
    filteredQuestions,
    resetHandler,
    nextQuestions,
    exitHandler,
    timer,
    stopwatch,
  } = useQuizData();
  const hasPosted = useRef<boolean>(false);

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

    setCurrentQuiz(prev => prev + 1);
    setQuizState((prev) => ({ ...prev, isAnswered: false }));
    stopwatch.start();
  };

  const closeConfigHandler = () => {
    setQuizState((prev) => ({ ...prev, isConfig: false }));
    timer.resume();
    stopwatch.start();
  };

  const current = filteredQuestions[currentQuiz];

  const quizScore = getQuizScore({
    correctAnswers,
    questions:filteredQuestions,
    userId: session.data?.user.userId,
    stopwatch
  });

  useEffect(() => {
    if (!quizState.isFinished || hasPosted.current) return;

    // TODO : Nanti fix ini. Sering 2x hit api
    const postScore = async () => {
      hasPosted.current = true;
      try {
        await axios.post("/api/quiz/score", quizScore);
      } catch (error) {
        console.error(error);
      }
    };

    postScore();
  }, [quizState.isFinished, quizScore]);

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
