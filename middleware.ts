import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";
import {
  publicRoutes,
  protectedRoutes,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_REVALIDATE_REDIRECT,
  authRoutes,
  apiAuthPrefix,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const hasCookie = cookies().has("access_token");
  const isLoggedIn = !!req.auth || hasCookie;
  console.log("LOGGED IN?: ", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isPublicRoute && isLoggedIn && isAuthRoute)
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
