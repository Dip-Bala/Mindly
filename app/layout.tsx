import {Inter} from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const satoshi = localFont({
  src: [
    {path: '../public/fonts/Satoshi-Regular.woff2', weight: "400", style: "normal"},
    {path: '../public/fonts/Satoshi-Medium.woff2', weight: "500", style: "normal"},
    {path: '../public/fonts/Satoshi-Bold.woff2', weight: "700", style: "normal"},
  ],
  variable: "--font-santoshi",
  display: "swap"
})

import type { Metadata } from "next";
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: "Memoir – Your Second Brain for the Web",
    template: "%s | Memoir",
  },
  description:
    "Memoir is your second brain for the web. Save videos, tweets, links, articles, and documents — all in one beautifully organized dashboard. Query your knowledge base and get contextual answers.",
  keywords: [
    "second brain app",
    "save links",
    "knowledge management",
    "personal knowledge base",
    "bookmark manager",
    "organize web content",
    "productivity app",
  ],
  authors: [{ name: "Dipanwita Bala" }],
  creator: "Dipanwita Bala",
  metadataBase: new URL("https://appmindly.live"), // change later
  openGraph: {
    title: "Memoir – Your Second Brain for the Web",
    description:
      "Save videos, tweets, links, articles, and documents in one organized space. Build your second brain with Memoir.",
    url: "https://appmindly.live",
    siteName: "Memoir",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Memoir – Your Second Brain for the Web",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memoir – Your Second Brain for the Web",
    description:
      "Save and organize everything you find online. Your second brain, built for the web.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable}`}
    suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const stored = localStorage.getItem("theme");
                  if (stored === "dark" || stored === "light") {
                    document.documentElement.setAttribute("data-theme", stored);
                  } else {
                    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    document.documentElement.setAttribute(
                      "data-theme",
                      prefersDark ? "dark" : "light"
                    );
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
    <body>
  <Providers>{children}</Providers>
</body>

    </html>
  );
}

