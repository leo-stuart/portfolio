import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leonardo Stuart — Software Engineer",
  description:
    "Software engineer on the growth team at allu., working on customer-facing apps used by 1M+ people a month. Payments, distributed systems, AI integration. Belo Horizonte, Brazil.",
  keywords: [
    "software engineer",
    "growth engineering",
    "payments",
    "distributed systems",
    "AI integration",
    "Python",
    "TypeScript",
    "Go",
    "FastAPI",
    "MCP",
  ],
  authors: [{ name: "Leonardo Stuart" }],
  openGraph: {
    title: "Leonardo Stuart — Software Engineer",
    description:
      "Customer-facing software at scale, payments and AI integration.",
    type: "website",
  },
};

// Resolve theme before first paint so there is no flash. Mirrors the CSS
// fallback: saved choice > system preference.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
