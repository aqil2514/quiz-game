import SessionAvatar from "@/components/layouts/Header/Public/SessionAvatar";
import { useSession } from "next-auth/react";

export default function ScoreProfileSection() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border p-5 flex items-center gap-4 mb-6">
      <SessionAvatar />
      <div>
        <p className="font-semibold text-lg">{user?.username ?? "Guest"}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
}
