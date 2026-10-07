import { Geist, JetBrains_Mono } from "next/font/google";

/* Geist and JetBrains Mono, the two faces the reference loads. Both are
   served by next/font, so there is no render-blocking stylesheet and no
   layout shift when they arrive. Shared by the English and Chinese root
   layouts so each page loads them once. Geist has no CJK glyphs; the
   :lang(zh-CN) rule in globals.css supplies the Chinese fallback stack. */
export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
