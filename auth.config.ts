import type { NextAuthConfig } from "next-auth";
import { protectedRoutes } from "./routes";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
