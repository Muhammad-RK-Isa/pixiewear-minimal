import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

export const fontSans = GeistSans;
export const fontMono = GeistMono;

export const alenia = localFont({
  src: "./NewAleniaBold.ttf",
  variable: "--font-alenia",
});
