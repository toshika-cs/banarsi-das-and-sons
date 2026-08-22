import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { site } from "@/lib/site";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — The Art of Chikankari`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — The Art of Chikankari`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — The Art of Chikankari`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fcfaf3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable}`}>
      {/*
        The Figma file provides a 1280px desktop frame only. Until responsive
        frames exist, hold that width so narrow viewports scroll the real design
        rather than reflowing into a layout nobody designed.
      */}
      <body className="min-w-[1280px] antialiased">{children}</body>
    </html>
  );
}
