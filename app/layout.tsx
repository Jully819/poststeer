import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { seo, SITE_URL } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatBubble } from "@/components/chat-bubble";
import { DemoBar } from "@/components/demo-bar";
import "./globals.css";

/* Geist and JetBrains Mono, the two faces the reference loads. Both are
   served by next/font, so there is no render-blocking stylesheet and no
   layout shift when they arrive. */
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* Layout clone for adjustment. No canonical or social tags yet: this is not a
   site that should be indexed or shared while it says PostSteer on every line. */
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  /* ⚠️ STILL NOINDEX, DELIBERATELY. The figures on this site are placeholders
     — "[20,000]+ businesses", "[99.9]% uptime", "[4.6]/5" — and every image is
     a labelled grey box. Flip this and app/robots.ts together, once those are
     real. */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <DemoBar />
        <ChatBubble />
      </body>
    </html>
  );
}
