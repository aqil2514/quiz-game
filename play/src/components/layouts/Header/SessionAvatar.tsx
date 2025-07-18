import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function SessionAvatar() {
  const session = useSession();
  const avatarImage = session!.data!.user!.image!;
  const fallbackImage = session!.data!.user!.name![0].toUpperCase();
  return (
    <Avatar>
      <AvatarImage src={avatarImage} />
      <AvatarFallback>{fallbackImage}</AvatarFallback>
    </Avatar>
  );
}
