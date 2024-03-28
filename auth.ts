import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { jwtDecode } from "jwt-decode";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async signIn({ user }) {
      console.log("signIn", user.email);
    },
  },

  ...authConfig,
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
