import { useState } from "react";
import { useQuizData } from "../Provider";

/**
 * Hook logika utama untuk menangani interaksi pengguna dengan kuis.
 * Mengelola state soal saat ini, jawaban, dan status jawaban.
 *
 * @returns {
 *   - question: Soal saat ini yang sedang ditampilkan
 *   - setCurrentQuiz: Setter untuk mengubah index soal saat ini
 *   - clickHandler: Fungsi untuk menangani klik pilihan jawaban
 *   - currentQuiz: Index soal saat ini
 *   - quizState: Status kuis apakah sudah dijawab dan apakah jawabannya benar
 *   - option: Jawaban yang dipilih oleh pengguna
 *   - answer: Jawaban benar untuk soal saat ini
 * }
 */
export function useQuizCardLogics() {
  // Mengambil data dan setter dari konteks kuis
  const {
    filteredQuestions,
    currentQuiz,
    setCurrentQuiz,
    quizState,
    setQuizState,
    setCorrectAnswers,
    timer,
    stopwatch,
  } = useQuizData();

  // Menyimpan jawaban yang dipilih user (opsional, untuk UI highlight)
  const [option, setOption] = useState<string>("");

  // Soal dan jawaban saat ini berdasarkan currentQuiz
  const question = filteredQuestions[currentQuiz];
  const answer = filteredQuestions[currentQuiz].answer;

  /**
   * Fungsi yang dijalankan saat user memilih salah satu opsi jawaban.
   * Akan mengecek kebenaran jawaban, update skor, status kuis, dan menjeda timer.
   *
   * @param e - Event dari klik tombol jawaban
   */
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (quizState.isAnswered) return; // Jika sudah dijawab, abaikan klik selanjutnya

    const target = e.target as HTMLButtonElement;
    const optionSelected = target.dataset.option;
    if (!optionSelected) return;

    // Menentukan apakah jawaban benar
    const isCorrect = optionSelected.toLowerCase() === answer.toLowerCase();
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);

    // Menandai jawaban yang dipilih
    setOption(optionSelected);

    // Update status kuis (sudah dijawab & benar/tidak)
    setQuizState((prev) => ({ ...prev, isAnswered: true, isCorrect }));
    timer.pause();
    stopwatch.pause();
  };

  return {
    question,
    setCurrentQuiz,
    clickHandler,
    currentQuiz,
    quizState,
    option,
    answer,
  };
}
