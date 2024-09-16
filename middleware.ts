import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "ar", "hi", "zh", "vi"],
  defaultLocale: "en"
});

export function onError(error: Error) {
  console.error('Error in middleware', error);
  return NextResponse.redirect('/500'); // Redirect to a custom error page if needed
}



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
  try {
    // Apply next-intl middleware for locale handling
    const intlResponse = await intlMiddleware(request);
    if (intlResponse) return intlResponse;

    // Apply additional middlewares, such as next-auth if needed
    // const authResponse = await nextAuthMiddleware(request);
    // if (authResponse) return authResponse;

    // Continue with the next response
    return NextResponse.next();
    
  } catch (error: any) {
    console.error('Error in middleware:', error);
    return onError(error); // Handle error, redirect to 500
  }
}
