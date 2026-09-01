import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calora — One link. Clients book themselves.",
  description:
    "Share a Calora page. They pick a time that already works for you. You get a confirmed slot, not another 'are you free Thursday?' thread.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
