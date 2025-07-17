import { useEffect } from "react";
import { useQuizData } from "../Provider";
import { defaultQuizState } from "../variables";
import { useConfigStore } from "@/store/config-store";

/**
 * Hook untuk menangani logika timer pada kuis.
 * Timer akan berjalan mundur dari nilai awal hingga 0,
 * lalu otomatis berpindah ke soal berikutnya atau mengakhiri kuis jika soal habis.
 *
 * Timer akan berhenti sementara saat status `isPaused` bernilai true.
 *
 * @returns {
 *   - seconds: Waktu tersisa dalam satuan detik (dibulatkan),
 *   - gameTime: Objek waktu yang berisi info seperti waktu saat ini, inisialisasi, akumulasi, dst.
 * }
 */
export function useTimerLogics() {
  const {
    setCurrentQuiz,
    setQuizState,
    nextQuestions,
    gameTime,
    setGameTime,
    quizState,
  } = useQuizData();
  const { timer, setTimer, useQuestionTime } = useConfigStore();

  /**
   * Menghitung sisa waktu dalam detik dari `gameTime.current`,
   * hasil dibulatkan dengan `.toFixed()` dan dikonversi ke number.
   */
  const seconds = Number(
    (gameTime.current / Number(gameTime.distance)).toFixed()
  );

  /**
   * useEffect ini akan memulai interval timer saat `quizState.isPaused` adalah false.
   * Setiap 1 detik, waktu (`gameTime.current`) akan dikurangi.
   * Jika mencapai 0, maka interval akan dihentikan.
   */
  useEffect(() => {
    if (quizState.isPaused || quizState.isPausedUser || quizState.isConfig)
      return;

    const interval = setInterval(() => {
      setGameTime((prev) => {
        if (prev.current <= 0) {
          clearInterval(interval);
          return { ...prev, current: 0 };
        }
        return { ...prev, current: prev.current - Number(gameTime.distance) };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    gameTime.distance,
    setGameTime,
    quizState.isPaused,
    quizState.isPausedUser,
    quizState.isConfig,
  ]);

  /**
   * useEffect ini akan dijalankan ketika `gameTime.current` mencapai 0.
   * Jika tidak ada soal berikutnya, maka kuis dianggap selesai (`isFinished = true`).
   * Jika masih ada soal berikutnya, akan lanjut ke soal berikutnya dan reset waktu.
   */
  useEffect(() => {
    if (gameTime.current <= 0) {
      if (!nextQuestions) {
        setQuizState((prev) => ({
          ...prev,
          isFinished: true,
          isPaused: true,
        }));
        return;
      }

      if (useQuestionTime) {
        setTimer(nextQuestions.timeLimitSeconds as number);
      }
      setCurrentQuiz((prev) => prev + 1);
      setQuizState(defaultQuizState);
      setGameTime((prev) => ({
        ...prev,
        current: prev.next * Number(prev.distance),
        next: timer,
      }));
    }
  }, [
    nextQuestions,
    gameTime,
    setCurrentQuiz,
    setQuizState,
    setTimer,
    timer,
    setGameTime,
    useQuestionTime,
  ]);

  return { seconds, gameTime };
}
