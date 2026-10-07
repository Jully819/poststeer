import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/content";
import {
  zhChat,
  zhDemoBar,
  zhFooter,
  zhHeader,
  zhSeo,
  zhServicesMenu,
  zhSkipLink,
} from "@/lib/content-zh";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatBubble } from "@/components/chat-bubble";
import { DemoBar } from "@/components/demo-bar";
import { geist, jetbrains } from "../fonts";
import "../globals.css";

/**
 * ROOT LAYOUT FOR THE CHINESE HOME PAGE.
 *
 * It is a second root layout, not a nested one, because the language of the
 * document is set on <html> and a nested layout cannot reach it. That is why
 * the English routes sit in the (en) group: /zh needs lang="zh-CN" in the
 * served HTML for screen readers, translation prompts and search engines,
 * and setting it from script after load would not give it any of those.
 *
 * Canonical and hreflang live here and on the English home page, pointing at
 * each other. Each side has to name the other, or both are ignored.
 */
export const metadata: Metadata = {
  title: zhSeo.title,
  description: zhSeo.description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/zh",
    languages: { en: "/", "zh-CN": "/zh", "zh-Hant": "/zh-hant", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/zh",
    title: zhSeo.title,
    description: zhSeo.description,
    siteName: "PostSteer",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geist.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          {zhSkipLink}
        </a>
        <SiteHeader copy={zhHeader} menu={zhServicesMenu} />
        <main id="main">{children}</main>
        <SiteFooter footer={zhFooter} />
        <DemoBar copy={zhDemoBar} />
        <ChatBubble copy={zhChat} />
      </body>
    </html>
  );
}
