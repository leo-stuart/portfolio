import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Leonardo Stuart — Software Engineer",
  description:
    "Software engineer specializing in AI systems, backend infrastructure, and full-stack development. Building scalable systems at the intersection of AI and infrastructure.",
  keywords: ["software engineer", "AI engineer", "full-stack developer", "Python", "TypeScript", "FastAPI", "MCP"],
  authors: [{ name: "Leonardo Stuart" }],
  openGraph: {
    title: "Leonardo Stuart — Software Engineer",
    description: "Building scalable systems at the intersection of AI and infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
