import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Overridable so `npm run build:prod` can build while `next dev` is running
     without the two fighting over .next. See web dev agency/next.config.ts for
     the full story. `npm run build` -> out/ is the deployable. */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  /* Static pre-render. One page, no API routes, no request-time data. */
  output: "export",

  /* Static export has no image optimiser server. */
  images: { unoptimized: true },

  /* No headers() block: it never runs under `output: "export"`. Security
     headers belong in vercel.json before the first real deploy. */
};

export default nextConfig;
