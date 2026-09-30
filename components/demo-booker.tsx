"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { demoPage } from "@/lib/content";
import { DemoDetailsForm } from "@/components/demo-details-form";
import type { DemoRequest } from "@/lib/booking";
import { cn } from "@/lib/utils";

/**
 * The booking card: a mock application window holding a month picker, a list
 * of times, and a review underneath.
 *
 * DATES ARE READ AFTER MOUNT, NOT AT BUILD TIME. This page is pre-rendered
 * once and then served for weeks; a calendar baked at build time would open
 * on a month that has already gone. The grid therefore waits for the effect
 * and holds its height until then, so nothing jumps when the real month
 * arrives.
 *
 * Picking a slot opens the details form; submitting that sends the two emails
 * in lib/booking.ts and only then shows the confirmation. A send that fails
 * stays on the form, so nobody is told a meeting exists when it does not.
 */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* Half-hour slots across a working day. Enough to look like a real calendar
   without inventing an availability rule nobody has agreed. */
const SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

/** Midnight local, so two dates compare on the day rather than the moment. */
function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}

/**
 * The cells of one month, Monday first, padded with the leading blanks that
 * put the 1st under the right weekday.
 */
function monthCells(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  /* getDay() is Sunday-first; this site's calendar starts on Monday. */
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= days; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }
  return cells;
}

export function DemoBooker() {
  /* null until the effect runs: see the note above. */
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);
  const [day, setDay] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  /* Between the list of times and the review: the details form. */
  const [details, setDetails] = useState(false);
  /* Set only once both emails are away, so the confirmation can name the
     address they went to. */
  const [sent, setSent] = useState<DemoRequest | null>(null);
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      /* A browser without a resolvable zone just gets no zone line. */
    }
  }, []);

  const cells = useMemo(() => (month ? monthCells(month) : []), [month]);

  const monthLabel = month
    ? month.toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : "";

  const dayLabel = day
    ? day.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })
    : "";

  /* Never page back past the month the visitor is standing in. */
  const canGoBack =
    month && today
      ? month.getFullYear() > today.getFullYear() ||
        (month.getFullYear() === today.getFullYear() && month.getMonth() > today.getMonth())
      : false;

  function shiftMonth(by: number) {
    setMonth((current) =>
      current ? new Date(current.getFullYear(), current.getMonth() + by, 1) : current,
    );
  }

  function reset() {
    setSent(null);
    setDetails(false);
    setSlot(null);
    setDay(null);
  }

  const c = demoPage.booker;

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mock application window. The three dots are decoration, not controls. */}
      <div className="overflow-hidden rounded-2xl border border-hairline bg-paper shadow-[0_24px_60px_-30px_rgb(10_11_16/0.35)]">
        <div className="flex items-center gap-3 border-b border-hairline bg-wash px-4 py-3">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-hairline" />
            <span className="size-2.5 rounded-full bg-hairline" />
            <span className="size-2.5 rounded-full bg-hairline" />
          </span>
          <p className="flex flex-1 items-center justify-center gap-2 font-display text-[0.82rem] font-semibold text-ink">
            <Check className="size-3.5 text-accent-ink" strokeWidth={3} aria-hidden="true" />
            {c.window}
          </p>
          {/* Balances the dots so the title sits centred. */}
          <span className="w-[3.25rem]" aria-hidden="true" />
        </div>

        <div className="min-h-[26rem] p-4 sm:p-5">
          {!today || !month ? (
            <p className="body-text py-24 text-center">{c.loading}</p>
          ) : sent && day && slot ? (
            /* Review state. */
            <div className="py-10 text-center">
              <span
                className="mx-auto grid size-11 place-items-center rounded-full bg-accent-tint"
                aria-hidden="true"
              >
                <Check className="size-5 text-accent-ink" strokeWidth={3} />
              </span>
              <p className="mt-4 font-display text-[1.05rem] font-semibold text-ink">
                {dayLabel}, {slot}
              </p>
              {timezone ? (
                <p className="mt-1 font-mono text-[0.75rem] text-muted">
                  {c.timezoneLead} {timezone}
                </p>
              ) : null}
              <p className="mt-5 font-display text-[0.95rem] font-semibold text-ink">
                {c.confirmedTitle}
              </p>
              <p className="body-text mx-auto mt-2 max-w-[24rem]">
                {c.confirmedBody.replace("{email}", sent.email)}
              </p>
              <button type="button" onClick={reset} className="btn btn-ghost mt-6">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {c.again}
              </button>
            </div>
          ) : details && day && slot ? (
            /* Details, taken before anything is confirmed. */
            <DemoDetailsForm
              day={day}
              dayLabel={dayLabel}
              slot={slot}
              timezone={timezone}
              onBack={() => setDetails(false)}
              onSent={setSent}
            />
          ) : day ? (
            /* Times for the chosen day. */
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-[0.95rem] font-semibold text-ink">{dayLabel}</p>
                <button
                  type="button"
                  onClick={() => {
                    setDay(null);
                    setSlot(null);
                  }}
                  className="font-display text-[0.8rem] font-semibold text-accent-ink hover:underline"
                >
                  {c.changeDate}
                </button>
              </div>
              <p className="mt-1 font-mono text-[0.72rem] text-muted">
                {c.pickTime}
                {timezone ? ` · ${c.timezoneLead} ${timezone}` : ""}
              </p>

              <ul className="mt-4 grid grid-cols-3 gap-2">
                {SLOTS.map((time) => (
                  <li key={time}>
                    <button
                      type="button"
                      aria-pressed={slot === time}
                      onClick={() => setSlot(time)}
                      className={cn(
                        "w-full rounded-lg border py-2.5 font-display text-[0.85rem] font-semibold transition-colors duration-200",
                        "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:outline-none",
                        slot === time
                          ? "border-transparent bg-ink text-white"
                          : "border-hairline text-body hover:border-ink hover:text-ink",
                      )}
                    >
                      {time}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={!slot}
                onClick={() => setDetails(true)}
                className="btn btn-accent mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                {c.confirm}
              </button>
            </div>
          ) : (
            /* Month grid. */
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-[1rem] font-semibold text-ink">{monthLabel}</p>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => shiftMonth(-1)}
                    disabled={!canGoBack}
                    aria-label={c.prevMonth}
                    className="grid size-8 place-items-center rounded-full text-body transition-colors hover:bg-wash hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => shiftMonth(1)}
                    aria-label={c.nextMonth}
                    className="grid size-8 place-items-center rounded-full text-body transition-colors hover:bg-wash hover:text-ink"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </span>
              </div>

              <p className="mt-1 font-mono text-[0.72rem] text-muted">{c.pickDate}</p>

              <div
                className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[0.68rem] tracking-wide text-muted uppercase"
                aria-hidden="true"
              >
                {WEEKDAYS.map((name) => (
                  <span key={name} className="py-1">
                    {name}
                  </span>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((cell, i) => {
                  if (!cell) return <span key={`pad-${i}`} />;
                  const isPast = cell < today;
                  const isToday = sameDay(cell, today);
                  return (
                    <button
                      key={cell.toISOString()}
                      type="button"
                      disabled={isPast}
                      onClick={() => setDay(cell)}
                      className={cn(
                        "relative grid aspect-square place-items-center rounded-lg font-display text-[0.85rem] font-medium transition-colors duration-200",
                        "focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:outline-none",
                        isPast
                          ? "cursor-not-allowed text-muted/40"
                          : "text-ink hover:bg-accent-tint hover:text-accent-ink",
                        isToday && "bg-wash",
                      )}
                    >
                      {cell.getDate()}
                      {isToday ? (
                        <span
                          className="absolute bottom-1.5 size-1 rounded-full bg-accent-ink"
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* The client-quote carousel that sat here is parked with the rest
            of the testimonials. See the note on `testimonials` in
            lib/content.ts. */}
      </div>

      <p className="mt-4 text-center font-mono text-[0.72rem] text-muted">
        // {demoPage.trusted}
      </p>
    </div>
  );
}
