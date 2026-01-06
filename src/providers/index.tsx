"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        enableColorScheme
        forcedTheme="light"
      >
        <TooltipProvider>
          <NuqsAdapter>
            {children}
            <SpeedInsights />
          </NuqsAdapter>
        </TooltipProvider>
        <Toaster position="bottom-right" richColors />
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
