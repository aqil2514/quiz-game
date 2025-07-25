import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export default function SessionAvatar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Skeleton className="h-10 w-10 rounded-full" />
    );
  }

  const avatarImage = session?.user?.image;
  const fallbackImage = session?.user?.username?.[0]?.toUpperCase() ?? "?";

  return (
    <Avatar>
      <AvatarImage src={String(avatarImage)} />
      <AvatarFallback className="bg-amber-500">{fallbackImage}</AvatarFallback>
    </Avatar>
  );
}
