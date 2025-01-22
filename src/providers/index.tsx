"use client";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useMediaQuery } from "usehooks-ts";
import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from "~/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1079px)");
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        enableColorScheme
        disableTransitionOnChange
        defaultTheme="dark"
      >
        <TooltipProvider>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </TooltipProvider>
        <Toaster
          richColors
          expand={isDesktop}
          position={isDesktop ? "bottom-right" : "top-center"}
        />
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
