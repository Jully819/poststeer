import { TEAM_EMAIL, sendTemplate, transportConfigured } from "@/lib/emailjs";
import { encodePlan, money, planTotals, priceOf, type Plan } from "@/lib/plan";

/**
 * Sending a brief out of a static export.
 *
 * WHY THIS EXISTS: the builder lets someone combine services, and a Stripe
 * Payment Link charges one amount fixed in advance, so a mixed plan cannot be
 * paid for on this site. It ends in a brief instead, and the brief has to
 * actually reach somebody — otherwise a customer types out their business and
 * nothing happens to it.
 *
 * ONE EMAIL GOES OUT, to TEAM_EMAIL. The visitor gets no copy: a brief is not
 * a receipt, and nothing has been charged at this point. The team replies by
 * hand and sends an invoice for the combined total.
 */

/**
 * Falls back to the team template, which the demo booker also uses.
 *
 * THE FREE EMAILJS PLAN ALLOWS TWO TEMPLATES, and the visitor's demo
 * confirmation needs one of them. The other is generic: it prints a subject
 * and a body that the sender composes, so it carries a booking or a brief
 * equally well. Setting NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF splits them again
 * on a paid plan, without touching this code.
 */
const BRIEF_TEMPLATE =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF ||
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TEAM ||
  "";

export const briefConfigured = Boolean(transportConfigured && BRIEF_TEMPLATE);

export type BriefRequest = {
  /** Whatever the form collected, keyed by field name. */
  values: Record<string, string>;
  channels: string[];
  plan: Plan;
};

/**
 * The plan written out one service per line, with what each costs. The email
 * has to stand on its own: whoever reads it is quoting from it, not opening
 * the site to work out what "posts:1" meant.
 */
function planLines(plan: Plan) {
  const { items } = planTotals(plan);
  if (items.length === 0) return "Nothing selected.";
  return items
    .map((service) => {
      const index = plan[service.id];
      const option = service.mode === "quantity" ? service.options?.[index] : undefined;
      const what = option ? option.label : service.name;
      const suffix = service.oneTime ? " (one-off)" : " / month";
      return `- ${service.name}: ${what} — ${money(priceOf(service, plan))}${suffix}`;
    })
    .join("\n");
}

/** The whole brief as plain text, since the template only prints a body. */
function briefBody(request: BriefRequest) {
  const { monthly, oneTime } = planTotals(request.plan);
  const v = request.values;
  const say = (value: string | undefined) => (value?.trim() ? value : "—");

  return [
    `${say(v.business)} sent a brief.`,
    "",
    `Email: ${say(v.email)}`,
    `Website: ${say(v.website)}`,
    `Industry: ${say(v.industry)}`,
    `Channels: ${request.channels.join(", ") || "None given"}`,
    `Tone: ${say(v.tone)}`,
    "",
    "Wants to post about:",
    say(v.topics),
    "",
    "Avoid:",
    say(v.avoid),
    "",
    `Assets: ${say(v.assets)}`,
    "",
    "Plan:",
    planLines(request.plan),
    "",
    `Monthly: ${money(monthly)}`,
    `One-off: ${money(oneTime)}`,
    "",
    /* Opens the builder with this exact selection, for quoting from. */
    `Reopen this plan: /pricing#plan=${encodePlan(request.plan)}`,
  ].join("\n");
}

export async function sendBrief(request: BriefRequest) {
  if (!briefConfigured) {
    throw new Error("The EmailJS brief template is missing from this build.");
  }

  await sendTemplate(BRIEF_TEMPLATE, {
    to_email: TEAM_EMAIL,
    /* So hitting reply reaches the customer, not us. */
    reply_to: request.values.email ?? "",
    subject: `Brief from ${request.values.business?.trim() || "a visitor"}`,
    body: briefBody(request),
  });
}
