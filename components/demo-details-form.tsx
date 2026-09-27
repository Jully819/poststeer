"use client";

import { useState, type FormEvent } from "react";
import { Loader2, UserPlus, X } from "lucide-react";
import { demoPage } from "@/lib/content";
import { bookingConfigured, sendDemoRequest, type DemoRequest } from "@/lib/booking";
import { cn, withBase } from "@/lib/utils";

/**
 * Step two of the booker: the details taken after a slot is chosen, and the
 * two emails that go out when they are submitted.
 *
 * THE SEND CAN FAIL, and a booking form that swallows the failure is worse
 * than one that never sent: the visitor walks away believing a meeting is in
 * the diary. A failed send therefore stays on the form, keeps every answer,
 * and says so. See lib/booking.ts for what is actually sent.
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
  /** Midnight on the chosen day, local. */
  day: Date;
  /** The same day, already formatted for reading. */
  dayLabel: string;
  slot: string;
  timezone: string;
  /** Back to the list of times. */
  onBack: () => void;
  /** Both emails are away; show the confirmation. */
  onSent: (request: DemoRequest) => void;
};

export function DemoDetailsForm({ day, dayLabel, slot, timezone, onBack, onSent }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [guests, setGuests] = useState<string[]>([]);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const d = demoPage.booker.details;

  const set = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFailed(false);

    const request: DemoRequest = {
      name: values.name ?? "",
      email: values.email ?? "",
      goal: values.goal ?? "",
      website: values.website ?? "",
      guests,
      dial:
        DIAL_CODES.find((entry) => entry.iso === (values.dialIso ?? "US"))?.code ??
        DIAL_CODES[0].code,
      phone: values.phone ?? "",
      smsOptIn,
      day,
      slot,
      timezone,
    };

    try {
      await sendDemoRequest(request);
      onSent(request);
    } catch (error) {
      /* The reason belongs in the console, not in front of a customer. */
      console.error("Demo booking was not sent", error);
      setFailed(true);
    } finally {
      setSending(false);
    }
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
          <input
            id="demo-name"
            name="name"
            required
            value={values.name ?? ""}
            onChange={(event) => set("name", event.target.value)}
            className={cn(field, "mt-1.5")}
          />
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
            value={values.email ?? ""}
            onChange={(event) => set("email", event.target.value)}
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
            value={values.goal ?? ""}
            onChange={(event) => set("goal", event.target.value)}
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
            value={values.website ?? ""}
            onChange={(event) => set("website", event.target.value)}
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
              value={values.dialIso ?? "US"}
              onChange={(event) => set("dialIso", event.target.value)}
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
              value={values.phone ?? ""}
              onChange={(event) => set("phone", event.target.value)}
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
            checked={smsOptIn}
            onChange={(event) => setSmsOptIn(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-accent-ink"
          />
          <span>
            {d.smsOptIn}{" "}
            <a
              href={withBase(d.smsTermsHref)}
              className="font-medium text-accent-ink underline underline-offset-2"
            >
              {d.smsTermsLabel}
            </a>
          </span>
        </label>

        {failed ? (
          <p
            role="alert"
            className="rounded-lg border border-hairline bg-wash p-3 text-[0.8rem] leading-snug text-ink"
          >
            {bookingConfigured ? d.sendFailed : d.sendNotConfigured}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="btn btn-accent w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {d.sending}
            </>
          ) : (
            d.submit
          )}
        </button>
      </form>
    </div>
  );
}
