import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sriya Smita Sahoo | AI Agent Engineer & Full-Stack Developer",
  description:
    "Portfolio of Sriya Smita Sahoo, an AI agent engineer and full-stack developer building agentic systems, RAG platforms, and the products that put them in front of real users.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-full antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
