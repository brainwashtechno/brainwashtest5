import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Reveal from "@/components/reveal";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://brainwash.live"),
  title: {
    default: "Brainwash — Atlanta Underground Techno",
    template: "%s — Brainwash",
  },
  description:
    "Brainwash is an Atlanta underground techno collective. Warehouse raves, uncompromising sound, no VIP, no barriers.",
  openGraph: {
    title: "Brainwash — Atlanta Underground Techno",
    description: "Warehouse raves, uncompromising sound, no VIP, no barriers.",
    url: "https://brainwash.live",
    siteName: "Brainwash",
    images: ["/brainwash.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-reveal')" }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
        <Reveal />
      </body>
    </html>
  );
}
