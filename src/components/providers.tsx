"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import compose from "@/lib/compose";
import { InterviewerProvider } from "@/contexts/interviewers.context";
import { InterviewProvider } from "@/contexts/interviews.context";
import { ResponseProvider } from "@/contexts/responses.context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ClientProvider } from "@/contexts/clients.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Providers = ({ children }: ThemeProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const Provider = compose([
    InterviewProvider,
    InterviewerProvider,
    ResponseProvider,
    ClientProvider,
  ]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};

export default React.memo(Providers);
