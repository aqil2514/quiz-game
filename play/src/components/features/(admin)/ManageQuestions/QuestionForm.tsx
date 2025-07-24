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
import { formSchema, QuestionFormSchema } from "./variables/schema";
import { questionFormDefaultValue } from "./variables/defaultValues";
import { useRouter } from "next/navigation";


export interface QustionFormContext {
  values?: QuestionFormSchema;
  categoryList: QuizCategories[];
  onSubmit: (values: QuestionFormSchema) => void;
}

interface QuestionFormProps {
  context: QustionFormContext;
}

export default function QuestionForm({ context }: QuestionFormProps) {
  const { values, onSubmit, categoryList } = context;
  const [isReset, setIsReset] = useState<boolean>(true);
  const router = useRouter();
  const defaultValues: QuestionFormSchema = values ?? questionFormDefaultValue;

  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const submitHandler = form.handleSubmit(async (values) => {
  try {
    await onSubmit(values);
    router.refresh();
  } catch (error) {
    console.error(error);
  }
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
      <form onSubmit={submitHandler} className="space-y-6">
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
          name="question"
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
          {!values && (
            <div className="flex gap-2">
              <Checkbox
                id="create-again-checkbox"
                checked={isReset}
                onClick={() => setIsReset(!isReset)}
              />
              <Label htmlFor="create-again-checkbox">Buat Lagi?</Label>
            </div>
          )}
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
