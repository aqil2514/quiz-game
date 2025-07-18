import { useForm } from "react-hook-form";
import z from "zod";
import { registerFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";

export function useRegisterFormLogics() {
  const router = useRouter();
  const [isShow, setIsShow] = useState<{
    password: boolean;
    confirm: boolean;
  }>({
    password: false,
    confirm: false,
  });
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      confirmPassword: "",
      password: "",
    },
  });

  const registerSubmitHandler = async (
    values: z.infer<typeof registerFormSchema>
  ) => {
    try {
      const { data } = await axios.post("/api/user", values);
      console.log(data);
    } catch (error) {
      console.log(values);
      if (isAxiosError(error)) {
        const data = error.response?.data;
        console.log(data);
      }
    }
  };

  const showPasswordHandler = (name: "password" | "confirm-password") => {
    if (name === "password") {
      setIsShow((prev) => ({ ...prev, password: !prev.password }));

      return;
    } else {
      setIsShow((prev) => ({ ...prev, confirm: !prev.confirm }));

      return;
    }
  };

  const loginHandler = () => router.push("/login");

  return {
    form,
    registerSubmitHandler,
    isShow,
    showPasswordHandler,
    loginHandler,
  };
}
