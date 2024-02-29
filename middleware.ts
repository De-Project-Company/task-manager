import { cookies } from "next/headers";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  DEFAULT_REVALIDATE_REDIRECT,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetFromSessionStorage } from "./utils";

export default function middleware(request: NextRequest) {
  const hasCookie = cookies().has("access_token");
  const hasToken = GetFromSessionStorage("access_token");

  const isLoggedIn = hasCookie || hasToken;
  console.log("LOGGED IN?: ", isLoggedIn);
  if (!hasCookie) {
    if (!publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL(DEFAULT_REVALIDATE_REDIRECT, request.url)
      );
    }
  } else if (hasCookie) {
    if (
      publicRoutes.includes(request.nextUrl.pathname) &&
      !protectedRoutes.includes(request.nextUrl.pathname)
    ) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url)
      );
    }
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
