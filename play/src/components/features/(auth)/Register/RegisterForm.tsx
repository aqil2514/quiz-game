import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRegisterFormLogics } from "./hooks/useRegisterFormLogics";
import { Eye, EyeClosed } from "lucide-react";

export default function RegisterForm() {
  const { form, registerSubmitHandler, isShow, showPasswordHandler, loginHandler } =
    useRegisterFormLogics();

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerSubmitHandler)}
          className="space-y-4 w-full"
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan email..." {...field} />
                </FormControl>
                <FormDescription>
                  Untuk autentikasi dan pemulihan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type={isShow.password ? "text" : "password"}
                      placeholder="Masukkan password..."
                      {...field}
                    />
                    <Button
                      type="button"
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => showPasswordHandler("password")}
                    >
                      {isShow.password ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Konfirmasi Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type={isShow.confirm ? "text" : "password"}
                      placeholder="Konfirmasi password..."
                      {...field}
                    />
                    <Button
                      type="button"
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => showPasswordHandler("confirm-password")}
                    >
                      {isShow.confirm ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 cursor-pointer"
            >
              Daftar
            </Button>
            <Button
              type="button"
              variant={"outline"}
              className="cursor-pointer"
              onClick={loginHandler}
            >
              Masuk
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
