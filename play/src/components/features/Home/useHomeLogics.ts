import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useHomeLogics() {
  const searchParams = useSearchParams();
  const isAuthenticated = Boolean(searchParams.get("sonner-auth-success"));
  const isLogoutSuccess = Boolean(searchParams.get("sonner-logout-success"));
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLogoutSuccess) return;
    if (isAuthenticated) {
      toast.success("Anda berhasil login");
    } else if (isLogoutSuccess) {
      toast.success("Anda berhasil logout");
    }
    router.replace("?");
  });
}
