import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    id: z.string().optional(),
    category: z.string().min(1, { error: "Kategori soal wajib diisi" }),
    questions: z.string().min(1, { error: "Pertanyaan wajib diisi" }),
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

interface QustionFormContent {
  values?: QuestionFormSchema;
  onSubmit: (values: QuestionFormSchema) => void;
}

interface QuestionFormProps {
  content: QustionFormContent;
}

export default function QuestionForm({ content }: QuestionFormProps) {
  const { values, onSubmit } = content;
  const defaultValues: QuestionFormSchema = values ?? {
    answer: "",
    category: "",
    explanation: "",
    id: "",
    options: [],
    questions: "",
    timeLimitSeconds: "0",
  };

  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Kategori */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Contoh: Matematika" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pertanyaan */}
        <FormField
          control={form.control}
          name="questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pertanyaan</FormLabel>
              <FormControl>
                <Textarea disabled={isSubmitting} placeholder="Tulis pertanyaannya di sini" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Opsi Jawaban */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {["A", "B", "C", "D"].map((label, i) => (
            <FormField
              key={i}
              control={form.control}
              name={`options.${i}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opsi {label}</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder={`Opsi ${label}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Jawaban */}
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jawaban Benar</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting}
                  placeholder="Salin salah satu opsi sebagai jawaban"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Penjelasan */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penjelasan (opsional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Tulis penjelasan jika perlu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Waktu */}
        <FormField
          control={form.control}
          name="timeLimitSeconds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waktu (detik)</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} type="number" placeholder="Contoh: 30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Memproses..." : values ? "Perbarui Soal" : "Buat Soal"}
        </Button>
      </form>
    </Form>
  )
}
