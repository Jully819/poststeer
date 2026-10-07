import { Check, ChevronDown, ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { deliverables as defaultDeliverables } from "@/lib/content";
import { PlatformLogo } from "@/components/platform-logos";
import { withBase } from "@/lib/utils";

/**
 * How it works: the heading sits beside the four steps rather than above
 * them.
 *
 * WHY IT MOVED AND WHY IT TURNED SIDEWAYS. This is the first thing after the
 * channel row, so it is the page's answer to "what actually happens if I
 * buy". A centred heading over four cards pushed the steps below the fold at
 * that position; running the heading down the left keeps the whole sequence
 * on one screen, which is the only way four steps read as one process.
 *
 * THE ART SLOT IS A FIXED HEIGHT. All four illustrations are drawn into the
 * same box, so the cards stay identical to each other and the block keeps
 * the size it had before the mocks got detailed. Everything inside is set at
 * around half the body scale, because a card 190px wide cannot carry a
 * screenshot at readable size — these are read at a glance or not at all.
 */

/* Fixed so the four cards match and the block keeps roughly the height it
   had. overflow-hidden is a guard, not a layout tool: every mock below is
   sized to fit inside it, and the clip only exists so that a future edit
   that outgrows the box crops instead of spilling up over the body text —
   which is exactly what the first pass at this did. */
const ART_SLOT = "h-[7rem] overflow-hidden";

export function Deliverables({
  deliverables = defaultDeliverables,
}: { deliverables?: typeof defaultDeliverables } = {}) {
  return (
    <section id="how-it-works" aria-labelledby="deliverables-title" className="section-pad bg-sage">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(16rem,1fr)_3fr] lg:gap-14">
        <div className="lg:pt-2">
          <p className="kicker">{deliverables.kicker}</p>
          {/* Smaller than a full-width h2: this one lives in a quarter-width
              column, where the section scale wraps it to five lines. */}
          <h2 id="deliverables-title" className="h2 mt-4 text-[clamp(1.55rem,2.1vw,2.1rem)]">
            {deliverables.titleLead}
            <br />
            <span className="font-normal text-accent-ink italic">
              {deliverables.titleAccent}
            </span>
          </h2>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deliverables.steps.map((step, i) => (
            <li
              key={step.title}
              className="card row-span-4 grid grid-rows-subgrid gap-y-0 p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(10_11_16/0.35)]"
            >
              <span className="grid size-7 place-items-center rounded-full bg-ink font-display text-[0.78rem] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[0.95rem] font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.85rem] leading-snug text-body">{step.body}</p>
              <div className={`mt-4 flex items-end self-end ${ART_SLOT}`} aria-hidden="true">
                <StepArt art={step.art} copy={deliverables} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Shared shell: a small white panel with a hairline, like the real product. */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-full rounded-lg border border-hairline bg-paper p-1.5 shadow-[0_6px_16px_-10px_rgb(10_11_16/0.3)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/** One illustration per step. Decorative throughout. */
function StepArt({
  art,
  copy: deliverables,
}: {
  art: (typeof defaultDeliverables.steps)[number]["art"];
  copy: typeof defaultDeliverables;
}) {
  if (art === "brand") {
    const f = deliverables.brandForm;
    return (
      <Panel>
        <p className="text-[0.55rem] leading-tight font-semibold text-ink">{f.title}</p>

        <p className="mt-1 text-[0.44rem] leading-none text-muted">{f.nameLabel}</p>
        <p className="mt-0.5 rounded border border-hairline px-1 py-[2px] text-[0.46rem] leading-tight text-muted">
          {f.namePlaceholder}
        </p>

        <p className="mt-1 text-[0.44rem] leading-none text-muted">{f.goalLabel}</p>
        <p className="mt-0.5 flex items-center justify-between gap-1 rounded border border-hairline px-1 py-[2px] text-[0.46rem] leading-tight text-ink">
          {f.goalValue}
          <ChevronDown className="size-2 shrink-0 text-muted" />
        </p>

        <p className="mt-0.5 text-[0.44rem] leading-none text-muted">{f.uploadLabel}</p>
        <span className="mt-1 flex gap-1">
          {f.thumbs.map((src) => (
            <img
              key={src}
              src={withBase(`/work/${src}-160.webp`)}
              alt=""
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="size-4 rounded object-cover"
            />
          ))}
          <span className="grid size-4 place-items-center rounded border border-dashed border-hairline">
            <Plus className="size-2.5 text-muted" />
          </span>
        </span>
      </Panel>
    );
  }

  if (art === "create") {
    /* Three pieces fanned, the middle one playing. */
    return (
      <span className="relative flex w-full items-end justify-center gap-1">
        {deliverables.createThumbs.map((src, i) => (
          <img
            key={src}
            /* The 160px rendition, not the master. These are drawn at 56 to
               68px, and the full-size file is up to 176KB for a thumbnail
               smaller than the icon beside it. */
            src={withBase(`/hero/${src}-160.webp`)}
            alt=""
            width={120}
            height={160}
            loading="lazy"
            decoding="async"
            className={
              i === 1
                ? "h-[6.5rem] w-[4.25rem] rounded-md object-cover shadow-md"
                : "h-[5.25rem] w-[3.5rem] rounded-md object-cover opacity-90 shadow-sm"
            }
          />
        ))}
        <span className="absolute top-1/2 left-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/90 shadow-sm">
          <Play className="size-3 translate-x-[1px] fill-ink text-ink" />
        </span>
      </span>
    );
  }

  if (art === "approve") {
    const a = deliverables.approve;
    return (
      <span className="flex w-full flex-col">
        <Panel>
          <span className="flex gap-1.5">
            <img
              src={withBase(`/reviews/${a.avatar}.webp`)}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="size-5 shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0">
              <span className="block text-[0.5rem] leading-snug text-ink">{a.comment}</span>
              <span className="mt-0.5 block text-[0.44rem] text-muted">{a.ago}</span>
            </span>
          </span>
        </Panel>

        <span className="mx-auto my-1 block h-3 w-px bg-hairline" />

        <span className="flex items-center justify-center gap-1.5 rounded-lg bg-accent-tint py-1.5">
          <span className="grid size-4 place-items-center rounded-full bg-accent-ink">
            <Check className="size-2.5 text-white" strokeWidth={3.5} />
          </span>
          <span className="font-display text-[0.62rem] font-semibold text-accent-ink">
            {a.label}
          </span>
        </span>
      </span>
    );
  }

  /* publish */
  const p = deliverables.publish;
  return (
    <span className="flex w-full flex-col">
      <Panel>
        <span className="flex items-center justify-between">
          <span className="text-[0.55rem] font-semibold text-ink">{p.title}</span>
          <span className="flex gap-0.5 text-muted">
            <ChevronLeft className="size-2.5" />
            <ChevronRight className="size-2.5" />
          </span>
        </span>
        <span className="mt-1 grid grid-cols-5 gap-[3px]">
          {p.days.map((day) => (
            <span key={day} className="block text-center text-[0.42rem] text-muted">
              {day}
            </span>
          ))}
        </span>
        <span className="mt-0.5 grid grid-cols-5 gap-[3px]">
          {p.thumbs.map((src) => (
            <img
              key={src}
              src={withBase(`/work/${src}-160.webp`)}
              alt=""
              width={60}
              height={80}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full rounded-[3px] object-cover"
            />
          ))}
        </span>
      </Panel>

      <span className="mt-1 flex items-center justify-center gap-1 rounded-lg border border-hairline bg-paper py-1">
        {deliverables.publishMarks.map((mark) => (
          <span key={mark} className="grid size-5 place-items-center rounded bg-ink text-white">
            <PlatformLogo mark={mark} className="size-2.5" />
          </span>
        ))}
      </span>
    </span>
  );
}
