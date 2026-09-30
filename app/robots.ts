import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/** Required by `output: "export"`. */
export const dynamic = "force-static";

/*
 * OPEN TO CRAWLERS.
 *
 * This disallowed everything while the site was a layout mock with invented
 * reviews and a placeholder founding year on every page. Those are gone: the
 * testimonials are parked in lib/content.ts, and the year, the guarantee, the
 * contact address, the prices and the payment processor are confirmed and
 * recorded in references/stats.md.
 *
 * TWO PAGES STILL OPT OUT, and they do it individually rather than here.
 * /pricing/brief is a half-filled form and /thank-you is where Stripe lands
 * someone after payment. Neither is a destination, both would be useless
 * reached cold from a search result, and neither is in the sitemap. See the
 * notes on their own `robots` blocks.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
