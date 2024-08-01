import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// export { default } from "next-auth/middleware";
// import {NextAuthMiddlewareOptions} from "next-auth/middleware";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "es", "ar", "hi", "zh", "vi"],

//   // Used when no locale matches
//   defaultLocale: "en",
// });

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "ar", "hi", "zh", "vi"],
  defaultLocale: "en",
});



export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/",
    "/(es|en|ar|hi|zh|vi)/:path*",
    "/(es|en|ar|hi|zh|vi)/auth/sign-in",
    "/(es|en|ar|hi|zh|vi)/auth/sign-up",
    "/(es|en|ar|hi|zh|vi)/hippa-contract",
    "/(es|en|ar|hi|zh|vi)/patient/:path*",
    // "sign-up",
    // "/verify",
  ],
};

export async function middleware(request: NextRequest) {
  const intlResponse = await intlMiddleware(request);
  if (intlResponse) return intlResponse;

  // Apply next-auth middleware
  // const authResponse = await nextAuthMiddleware(request);
  // if (authResponse) return authResponse;

  const response = NextResponse.next();


  console.log({request})

  const isOnDashboard = request.nextUrl.pathname.startsWith("/vi");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/vi/admins");

  console.log('isOnDashboard:', isOnDashboard);
  console.log('isOnAdminArea:', isOnAdminArea);

  // if (isOnDashboard) {
  //   if (!user) {
  //     console.log('Redirecting to sign-in...');
  //     return NextResponse.redirect(new URL("/vi/auth/sign-in", request.nextUrl));
  //   }
  //   if (isOnAdminArea && !user.isAdmin) {
  //     console.log('Redirecting to dashboard...');
  //     return NextResponse.redirect(new URL("/vi", request.nextUrl));
  //   }
  //   return response;
  // } else if (user) {
  //   console.log('Redirecting to dashboard...');
  //   return NextResponse.redirect(new URL("/"));
  //   // return NextResponse.redirect(new URL("/en", request.nextUrl));
  // }

  return response;
}
