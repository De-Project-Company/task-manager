import { cookies } from "next/headers";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  DEFAULT_REVALIDATE_REDIRECT,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";
import { auth } from "./auth";

// @ts-expect-error
export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  console.log("isLoggedIn: ", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_REVALIDATE_REDIRECT, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
