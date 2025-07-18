import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(20, "Username maksimal 20 karakter")
      .regex(/^[a-zA-Z0-9_.]+$/, "Hanya huruf, angka, titik, dan underscore"),

    email: z.email("Format email tidak valid"),

    password: z.string().min(6, "Password minimal 6 karakter"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"], // Menandakan error muncul di confirmPassword
  });
