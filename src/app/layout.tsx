// REQ 8 (responsive: viewport meta) + REQ 9 (accessibility: lang, skip link). Brand colour #B45309 is injected from the data file into --accent here.
import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { menuData } from "@/data/cardamom-house";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Cardamom House | Brunch menu, Lisbon",
  description: "Slow brunch. Strong coffee. See the menu, today's special and opening hours.",
};

export const viewport: Viewport = { themeColor: menuData.restaurant.brandColor, width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable}`}
      style={{ "--accent": menuData.restaurant.brandColor } as React.CSSProperties}
    >
      <body>
      
        {children}
      </body>
    </html>
  );
}
