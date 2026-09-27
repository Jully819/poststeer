import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/** Required by `output: "export"`. */
export const dynamic = "force-static";

/* Closed to crawlers: this is a layout mock, not a site.
   The sitemap pointer is here anyway, so the day the disallow becomes an
   allow there is nothing else to remember. See the warning in app/sitemap.ts
   for the other two switches that flip with it. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
