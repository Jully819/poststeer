import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Overridable so `npm run build:prod` can build while `next dev` is running
     without the two fighting over .next. See web dev agency/next.config.ts for
     the full story. `npm run build` -> out/ is the deployable. */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  /* Static pre-render. One page, no API routes, no request-time data. */
  output: "export",

  /* GitHub Pages serves a project site from /<repo>, so the export has to know
     its prefix. The deploy workflow passes it; locally it is empty and the
     site stays at the root. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,

  /* Static export has no image optimiser server. */
  images: { unoptimized: true },

  /* NO headers() BLOCK: it never runs under `output: "export"`. The security
     headers live in vercel.json, which Vercel applies to the static files it
     serves. That file is strict JSON and cannot hold comments, so the
     reasoning is here.

     WHAT IS SET. HSTS with includeSubDomains, COOP same-origin, X-Frame-
     Options DENY, nosniff, a strict-origin referrer policy, a Permissions-
     Policy denying camera, microphone and geolocation, and a CSP.

     THE CSP ALLOWS 'unsafe-inline' FOR SCRIPTS, AND HAS TO. A static export
     ships around 37 inline <script> blocks carrying Next's hydration payload.
     Nonces need a server to mint one per request and there is not one; hashing
     them means 37 hashes that change on every build. So the CSP cannot claim
     to stop injected inline script, and Lighthouse will keep saying so.

     IT IS STILL WORTH HAVING. script-src 'self' blocks an injected
     <script src="somewhere-else">, object-src 'none' closes the plugin
     vectors, base-uri 'self' stops base-tag injection, frame-ancestors 'none'
     stops framing, and connect-src limits where anything can phone home to
     api.emailjs.com, which the forms need.

     NO TRUSTED TYPES. require-trusted-types-for 'script' would very likely
     break React's DOM writes, and an audit point is not worth a white screen.

     NO preload ON HSTS. The preload list is a one-way door: getting off it
     takes months, and it binds every future subdomain to HTTPS. Add it
     deliberately, not to clear an audit. */
};

export default nextConfig;
