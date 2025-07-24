import NextAuth, { CredentialsSignin, User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios, { isAxiosError } from "axios";
import { endpointServer } from "./lib/variables/endpoint";

export class NotFoundLoginError extends CredentialsSignin {
  code = "not_found_credentials";
}

export class UnauthorizedLoginError extends CredentialsSignin {
  code = "unauthorized_credentials";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      async profile(profile) {
        const { data } = await axios.post(
          `${endpointServer}/auth/google-login`,
          profile
        );

        const user: User = {
          email: data.email,
          username: data.username,
          roles: data.roles,
          id: data.id,
          userId: data.userId,
        };
        return { ...user };
      },
    }),
    Credentials({
      credentials: {
        identifier: {},
        password: {},
      },
      async authorize(credentials) {
        let user: User | null = null;

        try {
          const { data } = await axios.post(
            `${endpointServer}/auth/login`,
            credentials
          );
          user = data.user as User;
          return user;
        } catch (error) {
          console.error(error);
          if (isAxiosError(error)) {
            const data = error.response?.data;
            const status = error.status;
            if (status === 404) throw new NotFoundLoginError(data.message);
            if (status === 401) throw new UnauthorizedLoginError(data.message);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.userId = user.userId;
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          roles: token.roles as string[],
          email: token.email as string,
          username: token.username as string,
          userId: token.userId as string,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
});
