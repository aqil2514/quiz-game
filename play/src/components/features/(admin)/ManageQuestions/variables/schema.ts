import z from "zod";

export const formSchema = z
  .object({
    id: z.string().optional(),
    category: z.string().min(1, { error: "Kategori soal wajib diisi" }),
    question: z.string().min(1, { error: "Pertanyaan wajib diisi" }),
    options: z
      .array(z.string().min(1, { error: "Opsi tidak boleh kosong" }))
      .length(4, { error: "Harus ada tepat 4 opsi jawaban" }),
    answer: z.string().min(1, { error: "Jawaban wajib diisi" }),
    explanation: z.string().optional(),
    timeLimitSeconds: z.string().min(1, { error: "Waktu soal wajib diisi" }),
  })
  .refine((data) => data.options.includes(data.answer), {
    message: "Jawaban harus ada di dalam opsi",
    path: ["answer"],
  });

export type QuestionFormSchema = z.infer<typeof formSchema>;