import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { jwtDecode } from "jwt-decode";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
export const BASE_PATH = "/api/auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },

  ...authConfig,
  basePath: BASE_PATH,
  secret: process.env.NEXT_PUBLIC_SECRET as string,
});

/**
 * This function checks if the user credentials are valid and access token is valid
 * - req is the cookies for next/server
 * @param req
 * @type {string | null}
 * @returns
 */

export async function getCredentials(req: ReadonlyRequestCookies) {
  // getting the token from the cookie
  let tokens = req.get("access_token")?.value;
  if (!tokens) return null;
  const decodedToken = jwtDecode(tokens);
  const credentials = { token: tokens, expires: decodedToken.exp };
  return credentials;
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      companyName?: string;
      website?: string;
      role?: string;
      createdAt?: string;
      image?: string;
      token?: string;
      type?: "authenticated" | "guest" | "anonymous" | "unauthenticated";
    } & DefaultSession["user"];
    access_token?: string;
  }
}
