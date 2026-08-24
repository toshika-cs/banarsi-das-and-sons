import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { RevealObserver } from "@/components/ui/reveal-observer";
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
  // suppressHydrationWarning: the head script below stamps `data-reveal-ready`
  // on <html> before React hydrates, so the client DOM legitimately differs
  // from the server HTML on this one element.
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <head>
        {/*
          Runs before first paint so the scroll-reveal hidden state applies
          without a flash. Without JavaScript the attribute is never set and
          every section renders fully visible — the reveals are additive only.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-reveal-ready','')`,
          }}
        />
      </head>
      {/*
        The 1280 floor now lives on <main> and <footer> rather than here, so the
        header can go responsive while every section still awaiting a responsive
        design keeps rendering at its exact Figma width.
      */}
      <body className="antialiased">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
