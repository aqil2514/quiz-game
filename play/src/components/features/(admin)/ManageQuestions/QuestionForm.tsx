import { QuizCategories } from "@/@types/quiz";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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

export interface QustionFormContent {
  values?: QuestionFormSchema;
  categoryList: QuizCategories[];
  onSubmit: (values: QuestionFormSchema) => void;
}

interface QuestionFormProps {
  content: QustionFormContent;
}

export default function QuestionForm({ content }: QuestionFormProps) {
  const { values, onSubmit, categoryList } = content;
  const [isReset, setIsReset] = useState<boolean>(true);
  const defaultValues: QuestionFormSchema = values ?? {
    answer: "",
    category: "",
    explanation: "",
    id: "",
    options: ["", "", "", ""],
    questions: "",
    timeLimitSeconds: "0",
  };

  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;
  const isSuccess = form.formState.isSubmitSuccessful;

  useEffect(() => {
    if (!isReset) return;
    form.reset();

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      form.setFocus("category");
    });
  }, [isSuccess, form, isReset]);

  const categoryName = categoryList.map((category) => category.name);

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
                <Input
                  disabled={isSubmitting}
                  placeholder="Contoh: Matematika"
                  list="category-list"
                  {...field}
                />
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
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Tulis pertanyaannya di sini"
                  {...field}
                />
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
                    <Input
                      disabled={isSubmitting}
                      placeholder={`Opsi ${label}`}
                      {...field}
                    />
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
                <Input
                  disabled={isSubmitting}
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
                <Textarea
                  placeholder="Tulis penjelasan jika perlu"
                  {...field}
                />
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
                <Input
                  disabled={isSubmitting}
                  type="number"
                  placeholder="Contoh: 30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Checkbox
              id="create-again-checkbox"
              checked={isReset}
              onClick={() => setIsReset(!isReset)}
            />
            <Label htmlFor="create-again-checkbox">Buat Lagi?</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Memproses..."
                : values
                ? "Perbarui Soal"
                : "Buat Soal"}
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              disabled={isSubmitting}
              onClick={() => form.reset()}
            >
              Reset Form
            </Button>
          </div>
        </div>
      </form>

      <datalist id="category-list">
        {categoryName.map((val) => (
          <option value={val} key={val} />
        ))}
      </datalist>
    </Form>
  );
}
