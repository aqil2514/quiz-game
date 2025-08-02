import { useSession } from "next-auth/react";
import { useQuizData } from "../Provider";
import { getQuizScore } from "../utils";
import { useConfigStore } from "@/store/config-store";
import { SoundEffects } from "@/lib/audio/sound-effects";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { updatePublicScore } from "@/lib/local-storage/score";

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
    questionHistory,
    stopwatch,
  } = useQuizData();
  const { sound, useTime } = useConfigStore();

  const quizScore = getQuizScore({
    correctAnswers,
    questions: filteredQuestions,
    userId: session.data?.user.userId,
    stopwatch,
    questionHistory,
  });

  const [isSavingScore, setIsSavingScore] = useState<boolean>(false);

  // Jumlah total soal

  /**
   * Handler untuk berpindah ke soal berikutnya.
   * Jika sudah soal terakhir, maka akan menandai kuis sebagai selesai.
   * Jika masih ada soal, akan reset status soal dan timer.
   */
  const clickHandler = () => {
    if (!nextQuestions) {
      if (sound) {
        const { score } = quizScore;
        if (score === 100) {
          SoundEffects.perfect();
        } else if (score >= 70) {
          SoundEffects.win();
        } else {
          SoundEffects.lose();
        }
      }

      setQuizState((prev) => ({ ...prev, isFinished: true }));
      return;
    }

    if (sound) SoundEffects.click();
    setCurrentQuiz((prev) => prev + 1);
    setQuizState((prev) => ({ ...prev, isAnswered: false }));
    stopwatch.start();
  };

  const closeConfigHandler = () => {
    if (sound) SoundEffects.click();
    setQuizState((prev) => ({ ...prev, isConfig: false }));
    stopwatch.start();
    switch (useTime) {
      case true:
        timer.resume();
        break;
      default:
        timer.pause();
        break;
    }
  };

  const saveHandler = async () => {
    const { data } = session;
    if (!data) {
      updatePublicScore(quizScore);
      toast.info("Skor disimpan secara lokal!");
      return;
    }

      try {
      setIsSavingScore(true);
      await axios.post("/api/quiz/score", quizScore);
      toast.success("Skor berhasil disimpan!");
    } catch (error) {
      updatePublicScore(quizScore);
      toast.warning("Gagal simpan ke server. Disimpan secara lokal.");
      console.error(error);
    } finally {
      setIsSavingScore(false);
    }
  };

  const current = filteredQuestions[currentQuiz];

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
    isSavingScore,
    saveHandler,
    ...quizScore,
  };
}
