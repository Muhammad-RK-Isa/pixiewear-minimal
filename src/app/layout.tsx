import "~/styles/globals.css";

import type { Viewport, Metadata } from "next";

import { cn } from "~/lib/utils";
import Providers from "~/providers";
import { fontMono, fontSans, alenia } from "~/lib/fonts";
import { env } from "~/env";
import { siteConfig } from "~/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "socks",
    "cotton socks",
    "quality socks",
    "best socks in bd",
    "socks price in bd",
    "socks combo",
  ],
  authors: [
    {
      name: "Pixiewear",
      url: "https://www.pixiewear.store",
    }
  ],
  creator: "muhammad-rk-isa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: `${env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        fontSans.variable,
        fontMono.variable,
        alenia.variable,
        "antialiased scroll-smooth"
      )}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
