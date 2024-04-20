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
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
  const hasCookie = cookies().has("access_token");
  const session = await auth();
  const isLoggedIn = hasCookie || session;
  const cookie = cookies();

  // console.log(session);
  console.log("LOGGED IN?: ", isLoggedIn);

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  // if (!isLoggedIn && isProtectedRoute) {
  //   return NextResponse.redirect(
  //     new URL(DEFAULT_REVALIDATE_REDIRECT, request.url)
  //   );
  // }

  if ((isLoggedIn && isAuthRoute) || (isLoggedIn && isPublicRoute)) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
