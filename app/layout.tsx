import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Readex_Pro, Aref_Ruqaa } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

const hand = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Fatma ✨",
  description: "A little gift, made by hand.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#05030a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      className={`${display.variable} ${sans.variable} ${arabic.variable} ${hand.variable}`}
    >
      <body className="min-h-dvh bg-ink-950 font-sans">{children}</body>
    </html>
  );
}
