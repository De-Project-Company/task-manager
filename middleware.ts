import { auth } from "./auth";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { deleteCookie } from "cookies-next";
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
import { checkSession } from "@/actions/session";
import { redirect } from "next/navigation";

// export default auth((req) => {
//   const access_token = cookies().get("access_token");

//   const decodedToken = access_token?.value && jwtDecode(access_token.value);
//   console.log("decodedToken", decodedToken);

//   const { nextUrl } = req;
//   const hasCookie = cookies().has("access_token");
//   const isLoggedIn = !!req.auth || hasCookie;
//   console.log("LOGGED IN?: ", isLoggedIn);

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) return null;

//   if (isAuthRoute) {
//     return null;
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/auth/sign-in", nextUrl));
//   }

//   return null;
// });

export default function middleware(request: NextRequest) {
  const hasCookie = cookies().has("access_token");
  const isLoggedIn = hasCookie;
  console.log("LOGGED IN?: ", isLoggedIn);
  if (!hasCookie) {
    if (!publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL(DEFAULT_REVALIDATE_REDIRECT, request.url)
      );
    }
  } else if (hasCookie) {
    if (publicRoutes.includes(request.nextUrl.pathname)) {
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
