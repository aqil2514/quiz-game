import z from "zod";

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Terlalu panjang")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_.-]+$/.test(val),
      {
        message: "Masukkan email atau username yang valid",
      }
    ),
  password: z.string().min(6, "Password minimal 6 karakter"),
});