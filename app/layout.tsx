import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import GuideProvider from "@/components/GuideProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "Pakistan Tourism — A living atlas",
  description:
    "A considered starting point for exploring Pakistan's places, stories, and routes, with an AI-powered travel guide grounded in reviewed notes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSerif.variable} ${plexMono.variable}`}>
      <body>
        <ErrorBoundary>
          <TooltipProvider>
            <Toaster />
            <GuideProvider>
              <div className="app-shell">{children}</div>
            </GuideProvider>
          </TooltipProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
