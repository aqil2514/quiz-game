import NextAuth, { CredentialsSignin, User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export class InvalidLoginError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        identifier: {},
        password: {},
      },
      authorize(credentials) {
        let user: User | null = null;
        const { identifier, password } = credentials;

        if (identifier === "aqil2514" && password == "123456789") {
          user = {
            email: "Aqil123",
            name: "Aqil 231",
          };
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
