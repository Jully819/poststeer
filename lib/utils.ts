import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names, with later Tailwind utilities winning over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a site-root path with the base the site is served from.
 *
 * GITHUB PAGES SERVES A PROJECT SITE FROM /<repo>. Next rewrites its own asset
 * URLs and `next/link` hrefs for that prefix, but this site uses plain <a> and
 * <img>, and nothing rewrites a raw attribute. Every internal href and src
 * therefore goes through here.
 *
 * Anything that is not a site-root path is returned untouched, so wrapping an
 * anchor, a hash link, a mailto or an external URL is always safe.
 */
export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base || !path.startsWith("/") || path.startsWith("//")) return path;
  /* Idempotent on purpose. A path often passes through here twice, once at
     the call site and again inside the component that renders the anchor,
     and a doubled prefix is a 404 nobody notices until production. */
  if (path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
