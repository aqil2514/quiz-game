import { DefaultSession } from "next-auth";
import { User as BuiltInUSer } from "./user";

declare module "next-auth" {
  interface Session {
    user: BuiltInUSer & DefaultSession["user"];
  }

  interface User {
    readonly id: string;
    readonly userId: string;
    username: string;
    email: string;
    roles: string[];
  }
}
