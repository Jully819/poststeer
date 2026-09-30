import type { MetadataRoute } from "next";
import { SITE_URL, blogPage, servicesMenu } from "@/lib/content";
import { cities, industries } from "@/lib/landing";

/** Required by `output: "export"`. */
export const dynamic = "force-static";

/**
 * Every indexable route, built from the same lists the routes themselves use.
 *
 * NOTHING IS HARDCODED THAT A ROUTE DERIVES. The city, industry, service and
 * post lists come from the modules their `generateStaticParams` read, so a
 * name added to one of those appears here without anyone remembering to add
 * it. The only literal paths below are the pages that exist as a single file.
 *
 * /pricing/brief IS NOT IN HERE. It carries its own `robots: { index: false }`
 * independent of the site-wide placeholder state — it is a step in a flow, not
 * a destination, and a sitemap is a list of destinations.
 *
 * /pricing IS. It was the first step of the funnel back when it lived at
 * /start; it is a nav item now, so it is a destination like any other.
 *
 * ⚠️ THE SITE IS STILL CLOSED TO CRAWLERS. app/robots.ts disallows everything
 * and every page sets `robots: { index: false }` while the figures are
 * placeholders. This file is the structure waiting for that switch; flip all
 * three together, not one at a time.
 */

type Change = MetadataRoute.Sitemap[number]["changeFrequency"];

/* One build stamp for the lot. Per-page dates would be fiction: nothing here
   tracks when a given page's copy last changed. */
const lastModified = new Date();

/** Priorities are relative and only meaningful against each other. */
const staticRoutes: { path: string; priority: number; changeFrequency: Change }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/service-areas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/marketing-glossary", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

function entry(path: string, priority: number, changeFrequency: Change) {
  return { url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const services = servicesMenu.groups.flatMap((group) =>
    group.items.map((item) => entry(`/services/${item.slug}`, 0.8, "monthly")),
  );

  return [
    ...staticRoutes.map((route) => entry(route.path, route.priority, route.changeFrequency)),
    ...services,
    ...cities.map((city) => entry(`/service-areas/${city.slug}`, 0.7, "monthly")),
    ...industries.map((industry) => entry(`/industries/${industry.slug}`, 0.7, "monthly")),
    ...blogPage.posts.map((post) => entry(`/blog/${post.slug}`, 0.5, "yearly")),
  ];
}
