"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Heart,
  Image as ImageIcon,
  LayoutGrid,
  Mail,
  Megaphone,
  MessageCircle,
  Plus,
  Send,
  Smartphone,
  Video,
} from "lucide-react";
import { gallery as defaultGallery, work, type WorkIndustry } from "@/lib/content";
import { cn, withBase } from "@/lib/utils";

/**
 * The portfolio: a row of service tabs, a row of industry pills, and one grid
 * under both.
 *
 * TWO AXES, ONE LIBRARY. Every card comes from `work.items`; the tabs narrow
 * it by service and the pills by industry, and the two compose. The counts on
 * the pills are COUNTED, not written down — against the selected tab, so the
 * number beside "Food & Drink" is how many food cards that tab can actually
 * show, and a pill that would open an empty grid is disabled rather than
 * left to disappoint.
 *
 * The heart, comment, send and bookmark row under each card is chrome. It is
 * aria-hidden and unclickable: it says "this is a post" and nothing else, and
 * a control that looks live but does nothing is worse than no control.
 */

const typeIcons = {
  all: LayoutGrid,
  posts: ImageIcon,
  stories: Smartphone,
  video: Video,
  ads: Megaphone,
  email: Mail,
};

export type TypeId = (typeof defaultGallery.types)[number]["id"];
/** The industry row also carries the two filters that are not industries. */
export type Scope = "featured" | "all" | WorkIndustry;

export function WorkGrid({
  gallery = defaultGallery,
  initialScope = "featured",
  initialType = "all",
}: { gallery?: typeof defaultGallery; initialScope?: Scope; initialType?: TypeId } = {}) {
  const [type, setType] = useState<TypeId>(initialType);
  const [scope, setScope] = useState<Scope>(initialScope);
  const [visible, setVisible] = useState(gallery.pageSize);

  /* Narrowed by the tab alone: both the grid and the pill counts start here. */
  const byType = useMemo(
    () => (type === "all" ? work.items : work.items.filter((item) => item.type === type)),
    [type],
  );

  const matches = useMemo(() => {
    if (scope === "featured") return byType.filter((item) => item.featured);
    if (scope === "all") return byType;
    return byType.filter((item) => item.industry === scope);
  }, [byType, scope]);

  const shown = matches.slice(0, visible);

  /* Changing either filter puts the grid back to one page: keeping a tall
     grid open across a filter change hides the fact that it changed. */
  function pickType(next: TypeId) {
    setType(next);
    setVisible(gallery.pageSize);
  }

  function pickScope(next: Scope) {
    setScope(next);
    setVisible(gallery.pageSize);
  }

  function showEverything() {
    setType("all");
    setScope("all");
    setVisible(work.items.length);
  }

  const scopes: { id: Scope; label: string; count: number }[] = [
    {
      id: "featured",
      label: gallery.featuredLabel,
      count: byType.filter((item) => item.featured).length,
    },
    { id: "all", label: gallery.allLabel, count: byType.length },
    ...gallery.industries.map((industry) => ({
      id: industry.id as Scope,
      label: industry.label,
      count: byType.filter((item) => item.industry === industry.id).length,
    })),
  ];

  return (
    <div className="mt-10">
      {/* Service tabs on the left, the escape hatch on the right. */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-hairline bg-paper p-1">
          {gallery.types.map((tab) => {
            const Icon = typeIcons[tab.icon];
            const isActive = tab.id === type;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => pickType(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 font-display text-[0.85rem] font-semibold transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:outline-none",
                  isActive ? "bg-ink text-white" : "text-body hover:text-ink",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <button type="button" onClick={showEverything} className="btn btn-ghost">
          {gallery.seeAll}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Industry pills. Counts are against the selected tab. */}
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-hairline bg-paper p-2 sm:rounded-full sm:px-3">
        {scopes.map((item) => {
          const isActive = item.id === scope;
          const isEmpty = item.count === 0;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              disabled={isEmpty}
              onClick={() => pickScope(item.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 font-display text-[0.85rem] font-semibold transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "border-transparent bg-accent-tint text-accent-ink"
                  : "border-hairline text-body hover:border-ink hover:text-ink",
                isEmpty && "cursor-not-allowed opacity-40 hover:border-hairline hover:text-body",
              )}
            >
              {item.label}
              {/* "Featured" is a selection, not a shelf — a number on it would
                  read as inventory. */}
              {item.id === "featured" ? null : (
                <span className={cn("font-mono text-[0.75rem]", isActive ? "" : "text-muted")}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="body-text mt-10 text-center">{gallery.empty}</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((item) => (
            <li key={item.src}>
              <figure className="card overflow-hidden">
                {/* The grid runs 2 columns, then 3, then 4, so a tile is
                    about 178px on a phone and 273px at the container's full
                    width. The masters are 520px wide, which is roughly three
                    times the pixels a phone can use. `sizes` describes the
                    columns so the browser picks the small rendition there and
                    the master only where the tile is actually wide.

                    THE 400w EXISTS FOR REAL PHONES, NOT THE AUDIT. A tile is
                    about 165px at 375px wide, which a 2x screen needs 330px
                    for. With only 320 and 520 to choose from that rounds up
                    to the master and the commonest phone saves nothing, while
                    Lighthouse's 1.75x device lands at 317px and takes the
                    320. The middle step is what makes the saving real. */}
                <img
                  src={withBase(`/work/${item.src}.webp`)}
                  srcSet={`${withBase(`/work/${item.src}-320.webp`)} 320w, ${withBase(`/work/${item.src}-400.webp`)} 400w, ${withBase(`/work/${item.src}.webp`)} 520w`}
                  sizes="(min-width: 1024px) 273px, (min-width: 640px) 32vw, 44vw"
                  alt={item.alt}
                  width={work.tileWidth}
                  height={work.tileHeight}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[9/16] w-full object-cover"
                />
                <figcaption
                  className="flex items-center gap-4 px-3 py-2.5 text-muted"
                  aria-hidden="true"
                >
                  <Heart className="size-[1.15rem]" strokeWidth={1.75} />
                  <MessageCircle className="size-[1.15rem]" strokeWidth={1.75} />
                  <Send className="size-[1.15rem]" strokeWidth={1.75} />
                  <Bookmark className="ml-auto size-[1.15rem]" strokeWidth={1.75} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}

      {shown.length < matches.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + gallery.pageSize)}
            className="btn btn-ghost"
          >
            {gallery.more}
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
