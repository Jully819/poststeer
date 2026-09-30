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
 * THE SITE IS OPEN TO CRAWLERS. app/robots.ts allows everything and the
 * per-page noindex is gone, so this file is now load-bearing rather than
 * structure waiting for a switch. A route that belongs in search has to be
 * here, and two routes deliberately are not: /pricing/brief and /thank-you
 * keep their own `robots: { index: false }` and say why on it.
 *
 * WHAT STILL CARRIES BRACKETS. The legal documents render unconfirmed values
 * inside square brackets on purpose, so a reader sees a blank rather than a
 * claim, and those pages are now indexed with the brackets visible. Governing
 * law, the sub-processor list, the data locations and the response windows are
 * the open ones. See references/stats.md.
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
  /* THE THREE LEGAL PAGES ARE OUT WHILE THEY STILL CARRY BLANKS. They set
     their own `robots: { index: false }` and say why on it. A sitemap entry
     for a noindexed page is a contradiction: it asks a crawler to fetch a
     page that then tells it to go away. Put these back the same day the
     brackets come out, not before. */
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
