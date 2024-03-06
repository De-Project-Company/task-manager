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

export default function middleware(request: NextRequest) {
  const hasCookie = cookies().has("access_token");
  const isLoggedIn = hasCookie;
  console.log("LOGGED IN?: ", isLoggedIn);

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(DEFAULT_REVALIDATE_REDIRECT, request.url)
    );
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
