"use client";

import { useState, type FormEvent } from "react";
import { UserPlus, X } from "lucide-react";
import { demoPage } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Step two of the booker: the details taken after a slot is chosen and before
 * it is confirmed.
 *
 * NOTHING IS POSTED. A static export has no endpoint, so submitting only moves
 * the booker to its review state, which says plainly that no scheduler is
 * connected. Wire this to your booking provider before launch.
 */

const field =
  "w-full rounded-lg border border-hairline bg-paper px-3 py-2 text-[0.85rem] text-ink placeholder:text-muted focus-visible:border-ink focus-visible:outline-none";
const label = "block font-display text-[0.8rem] font-semibold text-ink";

/* Enough dialling codes to cover where the customers are, labelled with the
   country's two letters rather than a flag emoji: this site uses no emoji.
   The letters also separate the two +1s, which a bare code could not. */
const DIAL_CODES = [
  { iso: "US", country: "United States", code: "+1" },
  { iso: "CA", country: "Canada", code: "+1" },
  { iso: "GB", country: "United Kingdom", code: "+44" },
  { iso: "IE", country: "Ireland", code: "+353" },
  { iso: "AU", country: "Australia", code: "+61" },
  { iso: "NZ", country: "New Zealand", code: "+64" },
  { iso: "DE", country: "Germany", code: "+49" },
  { iso: "FR", country: "France", code: "+33" },
  { iso: "ES", country: "Spain", code: "+34" },
  { iso: "IT", country: "Italy", code: "+39" },
  { iso: "NL", country: "Netherlands", code: "+31" },
  { iso: "AE", country: "United Arab Emirates", code: "+971" },
  { iso: "SG", country: "Singapore", code: "+65" },
  { iso: "IN", country: "India", code: "+91" },
  { iso: "ZA", country: "South Africa", code: "+27" },
];

type Props = {
  /** The chosen day, already formatted for reading. */
  dayLabel: string;
  slot: string;
  timezone: string;
  /** Back to the list of times. */
  onBack: () => void;
  onSubmit: () => void;
};

export function DemoDetailsForm({ dayLabel, slot, timezone, onBack, onSubmit }: Props) {
  const [guests, setGuests] = useState<string[]>([]);
  const d = demoPage.booker.details;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const setGuest = (index: number, value: string) =>
    setGuests((current) => current.map((guest, i) => (i === index ? value : guest)));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-[0.95rem] font-semibold text-ink">
          {dayLabel}, {slot}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="font-display text-[0.8rem] font-semibold text-accent-ink hover:underline"
        >
          {d.changeTime}
        </button>
      </div>
      {timezone ? (
        <p className="mt-1 font-mono text-[0.72rem] text-muted">
          {demoPage.booker.timezoneLead} {timezone}
        </p>
      ) : null}

      <form onSubmit={submit} className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="demo-name" className={label}>
            {d.name} <span className="text-accent-ink">*</span>
          </label>
          <input id="demo-name" name="name" required className={cn(field, "mt-1.5")} />
        </div>

        <div>
          <label htmlFor="demo-email" className={label}>
            {d.email} <span className="text-accent-ink">*</span>
          </label>
          <input
            id="demo-email"
            name="email"
            type="email"
            required
            className={cn(field, "mt-1.5")}
          />
        </div>

        <div>
          <label htmlFor="demo-goal" className={label}>
            {d.goal} <span className="text-accent-ink">*</span>
          </label>
          <textarea
            id="demo-goal"
            name="goal"
            rows={3}
            required
            placeholder={d.goalPlaceholder}
            className={cn(field, "mt-1.5")}
          />
        </div>

        <div>
          <label htmlFor="demo-website" className={label}>
            {d.website} <span className="text-accent-ink">*</span>
          </label>
          <input
            id="demo-website"
            name="website"
            required
            className={cn(field, "mt-1.5")}
          />
        </div>

        <div>
          {guests.map((guest, index) => (
            <div key={index} className={cn("flex items-end gap-2", index > 0 && "mt-2")}>
              <div className="flex-1">
                <label htmlFor={`demo-guest-${index}`} className={label}>
                  {d.guestEmail}
                </label>
                <input
                  id={`demo-guest-${index}`}
                  name={`guest-${index}`}
                  type="email"
                  value={guest}
                  onChange={(event) => setGuest(index, event.target.value)}
                  className={cn(field, "mt-1.5")}
                />
              </div>
              <button
                type="button"
                onClick={() => setGuests((current) => current.filter((_, i) => i !== index))}
                aria-label={d.removeGuest}
                className="grid size-9 shrink-0 place-items-center rounded-lg text-body transition-colors hover:bg-wash hover:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setGuests((current) => [...current, ""])}
            className={cn(
              "inline-flex items-center gap-2 font-display text-[0.85rem] font-semibold text-body transition-colors hover:text-ink",
              guests.length > 0 && "mt-3",
            )}
          >
            <UserPlus className="size-4" aria-hidden="true" />
            {guests.length > 0 ? d.addAnotherGuest : d.addGuests}
          </button>
        </div>

        <div>
          <label htmlFor="demo-phone" className={label}>
            {d.phone} <span className="text-accent-ink">*</span>
          </label>
          <div className="mt-1.5 flex items-stretch rounded-lg border border-hairline bg-paper focus-within:border-ink">
            <label htmlFor="demo-dial" className="sr-only">
              {d.countryCode}
            </label>
            {/* Fixed width: left to size itself the select eats the row on a
                phone and leaves no space for the number. */}
            <select
              id="demo-dial"
              name="dial"
              defaultValue="US"
              className="w-[5.5rem] shrink-0 rounded-l-lg border-r border-hairline bg-transparent py-2 pr-1 pl-3 font-mono text-[0.8rem] text-ink focus-visible:outline-none"
            >
              {DIAL_CODES.map((entry) => (
                <option key={entry.iso} value={entry.iso} title={entry.country}>
                  {entry.iso} {entry.code}
                </option>
              ))}
            </select>
            <input
              id="demo-phone"
              name="phone"
              type="tel"
              required
              placeholder={d.phonePlaceholder}
              className="w-full flex-1 rounded-r-lg bg-transparent px-3 py-2 text-[0.85rem] text-ink placeholder:text-muted focus-visible:outline-none"
            />
          </div>
          <p className="mt-1.5 text-[0.72rem] leading-snug text-muted">{d.phoneConsent}</p>
        </div>

        <label className="flex items-start gap-2.5 text-[0.78rem] leading-snug text-body">
          <input
            type="checkbox"
            name="sms"
            className="mt-0.5 size-4 shrink-0 accent-accent-ink"
          />
          <span>
            {d.smsOptIn}{" "}
            <a
              href={d.smsTermsHref}
              className="font-medium text-accent-ink underline underline-offset-2"
            >
              {d.smsTermsLabel}
            </a>
          </span>
        </label>

        <button type="submit" className="btn btn-accent w-full">
          {d.submit}
        </button>
      </form>
    </div>
  );
}
