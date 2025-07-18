import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../schema";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const submitLoginHandler = (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
  };

  const showPasswordHandler = () => setIsShowPassword(!isShowPassword);
  
  const registerHandler = () => router.push("/register")

  return { form, submitLoginHandler, showPasswordHandler, isShowPassword, registerHandler };
}
