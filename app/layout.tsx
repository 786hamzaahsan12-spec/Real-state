import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Footer from "@/components/ui/layout/Footer";
import Navbar from "@/components/ui/layout/Navbar";
import MotionProvider from "@/components/ui/MotionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RealHome | Premium Real Estate in Pakistan",
    template: "%s | RealHome",
  },
  description:
    "RealHome is a premium property marketplace concept for Pakistan: houses, apartments, plots and commercial spaces in Multan, Lahore, Islamabad and Karachi.",
  keywords: ["real estate Pakistan", "properties Multan", "houses Lahore", "apartments Islamabad", "plots Karachi"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050B10",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-60 rounded-md bg-gold px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}