import { QuizScore } from "@/@types/quiz";

const localStorageName = "quiz_public_user_score";

export function getPublicScore(): QuizScore[] {
  const raw = localStorage.getItem(localStorageName);
  try {
    const data = JSON.parse(raw || "[]");
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn("Gagal membaca data skor dari localStorage:", e);
    return [];
  }
}

export function updatePublicScore(raw: QuizScore) {
  const snapshot = getPublicScore();
  snapshot.push(raw);

  const payload = JSON.stringify(snapshot);
  localStorage.setItem(localStorageName, payload);
}
