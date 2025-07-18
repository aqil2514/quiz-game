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
import { useLoginFormLogics } from "./hooks/useLoginFormLogics";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginForm() {
  const {
    form,
    submitLoginHandler,
    showPasswordHandler,
    isShowPassword,
    registerHandler,
  } = useLoginFormLogics();
  return (
    <div className="px-4 py-16">
      {/* Login With Credentials */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitLoginHandler)}
          className="space-y-8"
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username atau Email</FormLabel>
                <FormControl>
                  <Input placeholder="Username atau Email..." {...field} />
                </FormControl>
                <FormDescription>Masukkan username atau email</FormDescription>
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
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Kata sandi..."
                      {...field}
                    />
                    <Button
                      type="button"
                      size={"icon"}
                      variant={"ghost"}
                      className="cursor-pointer"
                      onClick={showPasswordHandler}
                    >
                      {isShowPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Masukkan kata sandi</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 cursor-pointer"
            >
              Masuk
            </Button>
            <Button
              type="button"
              variant={"outline"}
              className="cursor-pointer"
              onClick={registerHandler}
            >
              Daftar
            </Button>
          </div>
        </form>
      </Form>

      {/* Login With Google */}
      <div>
        <p className="text-center font-bold text-lg">Atau</p>
        <Button className="w-full cursor-pointer py-6" variant={"outline"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/google.png" alt="Google Icons" className="w-8 h-8" />
          <p>Masuk dengan Google</p>
        </Button>
      </div>
    </div>
  );
}
