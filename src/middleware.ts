import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/register-call(.*)",
    "/api/get-call(.*)",
  ],
  ignoredRoutes: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)"
  ],
  afterAuth(auth, req: NextRequest) {
    // Handle users who aren't authenticated
    if (!auth.userId) {
      // If they're trying to access a protected route, redirect to sign-in
      if (!auth.isPublicRoute) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
      }
      // If they're trying to access the root path, redirect to sign-in
      if (req.nextUrl.pathname === '/') {
        const signInUrl = new URL('/sign-in', req.url);
        return NextResponse.redirect(signInUrl);
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
