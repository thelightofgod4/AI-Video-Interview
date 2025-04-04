import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/interview(.*)",
    "/call(.*)",
    "/api/register-call(.*)",
    "/api/get-call(.*)",
    "/api/generate-interview-questions(.*)",
    "/api/create-interviewer(.*)",
    "/api/analyze-communication(.*)",
  ],
  ignoredRoutes: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
  afterAuth(auth, req: NextRequest) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
