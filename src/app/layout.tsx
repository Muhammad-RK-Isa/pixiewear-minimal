import "~/styles/globals.css";

import { type Metadata } from "next";

import { cn } from "~/lib/utils";
import Providers from "~/providers";
import { fontMono, fontSans, alenia } from "~/lib/fonts";

export const metadata: Metadata = {
  title: "Pixiewear",
  description: "Modern grace, timeless taste.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
