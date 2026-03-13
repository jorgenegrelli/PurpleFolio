import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claude — Your Intelligent Collaborator",
  description:
    "Claude helps you write, think, code and create — effortlessly. Discover what AI can do for you.",
  openGraph: {
    title: "Claude — Your Intelligent Collaborator",
    description: "Claude helps you write, think, code and create — effortlessly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${instrumentSerif.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
