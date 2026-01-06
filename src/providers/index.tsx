"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useMediaQuery } from "usehooks-ts";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1079px)");
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
        <Toaster
          expand={isDesktop}
          position={isDesktop ? "bottom-right" : "top-center"}
          richColors
        />
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
