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


export default function RootLayout({children}: {children : React.ReactNode}){
  return(
    <html lang="en" className={`${inter.variable} ${satoshi.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}

// dangerouslySetInnerHTML is a React property that serves as the replacement for using the browser DOM's innerHTML attribute

<script
  dangerouslySetInnerHTML={{
    __html: `
      (() => {
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
      })();
    `,
  }}
/>
