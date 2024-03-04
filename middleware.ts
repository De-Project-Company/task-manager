// import { cookies } from "next/headers";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   DEFAULT_REVALIDATE_REDIRECT,
//   authRoutes,
//   protectedRoutes,
//   publicRoutes,
//   DEFAULT_ACCEPTPROJECT_ROUTE,
// } from "./routes";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default function middleware(request: NextRequest) {
//   const hasCookie = cookies().has("access_token");

//   const isLoggedIn = hasCookie;
//   console.log("LOGGED IN?: ", isLoggedIn);

//   const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);

//   if (isApiAuthRoute) return null;

//   // if (!hasCookie) {
//   //   if (!publicRoutes.includes(request.nextUrl.pathname)) {
//   //     return NextResponse.redirect(
//   //       new URL(DEFAULT_REVALIDATE_REDIRECT, request.url)
//   //     );
//   //   }
//   // } else if (hasCookie) {
//   //   if (
//   //     publicRoutes.includes(request.nextUrl.pathname) &&
//   //     !protectedRoutes.includes(request.nextUrl.pathname)
//   //   ) {
//   //     return NextResponse.redirect(
//   //       new URL(DEFAULT_LOGIN_REDIRECT, request.url)
//   //     );
//   //   }
//   // }
//   // if (!isLoggedIn && protectedRoutes.includes(request.nextUrl.pathname)) {
//   //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
//   // }
//   // if (isLoggedIn && authRoutes.includes(request.nextUrl.pathname)) {
//   //   return NextResponse.redirect(
//   //     new URL(DEFAULT_REVALIDATE_REDIRECT, request.url)
//   //   );
//   // }

// }

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import { auth } from "./auth";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
// import { deleteCookie } from "cookies-next";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
//   DEFAULT_REVALIDATE_REDIRECT,
// } from "./routes";
// import { NextResponse } from "next/server";

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
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL(DEFAULT_REVALIDATE_REDIRECT, nextUrl));
//   }

//   return null;
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { cookies } from "next/headers";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  DEFAULT_REVALIDATE_REDIRECT,
  authRoutes,
  protectedRoutes,
  publicRoutes,
  DEFAULT_ACCEPTPROJECT_ROUTE,
} from "./routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetFromSessionStorage } from "./utils";

export default function middleware(request: NextRequest) {
  const hasCookie = cookies().has("access_token");
  const hasToken = GetFromSessionStorage("access_token");
  console.log(hasToken);

  const isLoggedIn = hasCookie || hasToken;
  console.log("LOGGED IN?: ", isLoggedIn);

  const isAcceptProjectRoute =
    request.nextUrl.pathname === DEFAULT_ACCEPTPROJECT_ROUTE;

  
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
