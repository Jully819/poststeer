"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { briefPage } from "@/lib/content";
import { encodePlan, parsePlan, type Plan } from "@/lib/plan";
import { briefConfigured, sendBrief } from "@/lib/brief";
import { cn, withBase } from "@/lib/utils";
import { OrderSummary } from "@/components/order-summary";

const field =
  "w-full rounded-lg border border-hairline bg-paper px-3 py-2 text-[0.85rem] text-ink placeholder:text-muted";
const label = "block font-display text-[0.8rem] font-semibold text-ink";
const hint = "mt-1 text-[0.72rem] leading-snug text-muted";

/**
 * Step two: the brief, with the order carried alongside it.
 *
 * THE ORDER COMES FROM THE HASH, and the Back link writes it out again, so
 * stepping back to change a service does not lose the plan. With no plan in
 * the URL the page says so and sends the visitor back rather than showing an
 * empty summary next to a form that cannot go anywhere.
 *
 * THE BRIEF IS EMAILED TO THE TEAM, through EmailJS, because a mixed plan
 * cannot be paid for on a static site: a Stripe Payment Link charges one
 * amount fixed in advance. Someone reads this and sends an invoice.
 *
 * A FAILED SEND STAYS ON THE FORM with every answer intact. A form that
 * appears to succeed and quietly drops a customer brief is the worst possible
 * outcome here, and it is what this page used to do.
 */
export function BriefForm() {
  const [plan, setPlan] = useState<Plan>({});
  const [ready, setReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    setPlan(parsePlan(window.location.hash));
    setReady(true);
  }, []);

  const set = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const toggleChannel = (name: string) =>
    setChannels((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFailed(false);
    try {
      await sendBrief({ values, channels, plan });
      setSubmitted(true);
    } catch (error) {
      /* The reason belongs in the console, not in front of a customer. */
      console.error("Brief was not sent", error);
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const hasPlan = Object.keys(plan).length > 0;
  const backHref = `/start#plan=${encodePlan(plan)}`;
  const f = briefPage.fields;

  return (
    <div className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_20rem] lg:items-start">
      <div>
        <a
          href={withBase(backHref)}
          className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-body transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {briefPage.back}
        </a>

        <h1 className="mt-4 font-display text-[1.6rem] font-bold tracking-tight text-ink">
          {briefPage.title}
        </h1>
        <p className="mt-3 max-w-[38rem] text-[0.88rem] leading-relaxed text-body">
          {briefPage.intro}
        </p>

        {ready && !hasPlan ? (
          <p
            role="status"
            className="mt-6 rounded-xl border border-hairline bg-wash p-4 text-[0.85rem] text-ink"
          >
            No services selected yet.{" "}
            <a href={withBase("/start")} className="font-semibold text-accent-ink underline underline-offset-2">
              Pick your services first
            </a>
            .
          </p>
        ) : null}

        {submitted ? (
          <div className="mt-8 rounded-xl border border-accent bg-accent-tint p-6">
            <p className="flex items-center gap-2 font-display text-[1rem] font-bold text-ink">
              <Check className="size-4 text-accent-ink" aria-hidden="true" />
              {briefPage.reviewTitle}
            </p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-body">
              {briefPage.reviewNote}
            </p>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                [f.business, values.business],
                [f.website, values.website],
                [f.email, values.email],
                [f.industry, values.industry],
                [f.channels, channels.join(", ")],
                [f.tone, values.tone],
                [f.topics, values.topics],
                [f.avoid, values.avoid],
                [f.assets, values.assets],
              ].map(([name, value]) => (
                <div key={name}>
                  <dt className="text-[0.72rem] font-semibold tracking-wide text-muted uppercase">
                    {name}
                  </dt>
                  <dd className="mt-0.5 text-[0.85rem] break-words text-ink">
                    {value?.trim() ? value : "—"}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn btn-ghost mt-6 min-h-[2.4rem] px-4 text-[0.82rem]"
            >
              {briefPage.editBrief}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="business" className={label}>
                  {f.business} <span className="text-accent-ink">*</span>
                </label>
                <input
                  id="business"
                  name="business"
                  required
                  value={values.business ?? ""}
                  onChange={(event) => set("business", event.target.value)}
                  className={cn(field, "mt-1.5")}
                />
              </div>

              <div>
                <label htmlFor="website" className={label}>
                  {f.website}
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://"
                  value={values.website ?? ""}
                  onChange={(event) => set("website", event.target.value)}
                  className={cn(field, "mt-1.5")}
                />
              </div>

              <div>
                <label htmlFor="email" className={label}>
                  {f.email} <span className="text-accent-ink">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={values.email ?? ""}
                  onChange={(event) => set("email", event.target.value)}
                  className={cn(field, "mt-1.5")}
                />
              </div>

              <div>
                <label htmlFor="industry" className={label}>
                  {f.industry}
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={values.industry ?? ""}
                  onChange={(event) => set("industry", event.target.value)}
                  className={cn(field, "mt-1.5")}
                >
                  <option value="">Select an industry</option>
                  {f.industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset>
              <legend className={label}>{f.channels}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {f.channelOptions.map((channel) => {
                  const on = channels.includes(channel);
                  return (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => toggleChannel(channel)}
                      aria-pressed={on}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-colors",
                        on
                          ? "border-accent bg-accent text-ink"
                          : "border-hairline bg-paper text-ink hover:border-ink",
                      )}
                    >
                      {channel}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="topics" className={label}>
                {f.topics}
              </label>
              <textarea
                id="topics"
                name="topics"
                rows={4}
                value={values.topics ?? ""}
                onChange={(event) => set("topics", event.target.value)}
                className={cn(field, "mt-1.5")}
              />
              <p className={hint}>{f.topicsHint}</p>
            </div>

            <div>
              <label htmlFor="tone" className={label}>
                {f.tone}
              </label>
              <select
                id="tone"
                name="tone"
                value={values.tone ?? ""}
                onChange={(event) => set("tone", event.target.value)}
                className={cn(field, "mt-1.5")}
              >
                <option value="">Select a tone</option>
                {f.toneOptions.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="avoid" className={label}>
                {f.avoid}
              </label>
              <textarea
                id="avoid"
                name="avoid"
                rows={3}
                value={values.avoid ?? ""}
                onChange={(event) => set("avoid", event.target.value)}
                className={cn(field, "mt-1.5")}
              />
              <p className={hint}>{f.avoidHint}</p>
            </div>

            <div>
              <label htmlFor="assets" className={label}>
                {f.assets}
              </label>
              <input
                id="assets"
                name="assets"
                type="url"
                placeholder="https://"
                value={values.assets ?? ""}
                onChange={(event) => set("assets", event.target.value)}
                className={cn(field, "mt-1.5")}
              />
              <p className={hint}>{f.assetsHint}</p>
            </div>

            {failed ? (
              <p
                role="alert"
                className="rounded-lg border border-hairline bg-wash p-3 text-[0.82rem] leading-snug text-ink"
              >
                {briefConfigured ? briefPage.sendFailed : briefPage.sendNotConfigured}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={sending}
              className="btn btn-accent min-h-[2.9rem] w-full text-[0.95rem] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {briefPage.sending}
                </>
              ) : (
                briefPage.submit
              )}
            </button>
          </form>
        )}
      </div>

      <OrderSummary plan={plan} />
    </div>
  );
}
