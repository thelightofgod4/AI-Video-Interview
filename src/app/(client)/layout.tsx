"use client";

import "../globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import SideMenu from "@/components/sideMenu";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "AI Video Interview",
  description: "AI-powered Video Interviews",
  openGraph: {
    title: "AI Video Interview",
    description: "AI-powered Video Interviews",
    siteName: "AI Video Interview",
    images: [
      {
        url: "/foloup.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>AI Video Interview</title>
        <meta name="description" content="AI-powered Video Interviews" />
        <link rel="icon" href="/browser-client-icon.ico" />
      </head>
      <body
        className={cn(
          inter.className,
          "antialiased min-h-screen flex flex-col",
        )}
      >
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          afterSignOutUrl="/sign-in"
        >
          <Providers>
            <Suspense fallback={null}>
              {!pathname.includes("/sign-in") &&
                !pathname.includes("/sign-up") && <Navbar />}
              <div className="flex flex-row flex-1">
                {!pathname.includes("/sign-in") &&
                  !pathname.includes("/sign-up") && (
                    <div className="hidden md:block">
                      <SideMenu />
                    </div>
                  )}
                <div className="md:ml-[200px] pt-[64px] flex-1 overflow-y-auto">
                  {children}
                </div>
              </div>
              <Footer />
            </Suspense>
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-white",
                  title: "text-black",
                  description: "text-red-400",
                  actionButton: "bg-indigo-400",
                  cancelButton: "bg-orange-400",
                  closeButton: "bg-white-400",
                },
              }}
            />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
