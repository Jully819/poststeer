import type { Metadata, Viewport } from "next";
import { seo, SITE_URL } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatBubble } from "@/components/chat-bubble";
import { DemoBar } from "@/components/demo-bar";
import { geist, jetbrains } from "../fonts";
import "../globals.css";

/* Layout clone for adjustment. No canonical or social tags yet: this is not a
   site that should be indexed or shared while it says PostSteer on every line. */
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
