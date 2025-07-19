import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../schema";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const errorLoginMap: Record<string, string> = {
  not_found_credentials: "Akun tidak ditemukan",
  unauthorized_credentials: "Password salah",
};

export function useLoginFormLogics() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");
  const authCode = searchParams.get("code");

  const submitLoginHandler = (values: z.infer<typeof loginFormSchema>) => {
    signIn("credentials", values);
  };

  const showPasswordHandler = () => setIsShowPassword(!isShowPassword);

  const registerHandler = () => router.push("/register");

  useEffect(() => {
    if (!authCode && !authError) return;
    toast.error(errorLoginMap[authCode as string]);
    router.replace("?");
  }, [authError, authCode, router]);

  return {
    form,
    submitLoginHandler,
    showPasswordHandler,
    isShowPassword,
    registerHandler,
  };
}
