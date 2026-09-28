/**
 * Sending a demo booking out of a static export.
 *
 * THERE IS NO SERVER. `output: 'export'` ships plain HTML, so the send has to
 * happen in the visitor's browser, which rules out anything needing a secret.
 * EmailJS takes a public key by design and lets the template's To field be a
 * variable, so one call can reach the visitor and another the team.
 *
 * TWO EMAILS GO OUT on submit: a confirmation to whoever filled the form, and
 * a notification to BOOKING_EMAIL carrying a Google Calendar link that puts
 * the slot in the calendar with the visitor already invited.
 *
 * Keys live in NEXT_PUBLIC_* vars and are read at BUILD time, not run time:
 * changing one means rebuilding. With none set nothing is sent and the booker
 * says so rather than pretending.
 */

import { TEAM_EMAIL, sendTemplate, transportConfigured } from "@/lib/emailjs";

const CLIENT_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT ?? "";
const TEAM_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TEAM ?? "";

/** Where the team's copy lands. */
export const BOOKING_EMAIL = TEAM_EMAIL;

/** The demo as sold everywhere else on the site: 20 minutes. */
const DEMO_MINUTES = 20;

export type DemoRequest = {
  name: string;
  email: string;
  goal: string;
  website: string;
  guests: string[];
  dial: string;
  phone: string;
  smsOptIn: boolean;
  /** Midnight on the chosen day, local. */
  day: Date;
  /** "09:30", local, as printed on the button. */
  slot: string;
  /** IANA zone, or "" where the browser would not name one. */
  timezone: string;
};

/** True once every key the send needs is present in the build. */
export const bookingConfigured = Boolean(
  transportConfigured && CLIENT_TEMPLATE && TEAM_TEMPLATE,
);

/** The chosen slot as a real instant, and the instant it ends. */
function windowOf(request: DemoRequest) {
  const [hours, minutes] = request.slot.split(":").map(Number);
  const start = new Date(
    request.day.getFullYear(),
    request.day.getMonth(),
    request.day.getDate(),
    hours,
    minutes,
  );
  return { start, end: new Date(start.getTime() + DEMO_MINUTES * 60_000) };
}

/** UTC, basic ISO 8601, which is the only shape Google's link accepts. */
function stamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * A Google Calendar link that opens the event ready to save, with the visitor
 * and any guests already on the invite. One click from the notification email
 * puts the demo in the calendar.
 */
export function calendarLink(request: DemoRequest) {
  const { start, end } = windowOf(request);
  const guests = [request.email, ...request.guests.filter(Boolean)];
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `PostSteer demo — ${request.name}`,
    details: [
      `Name: ${request.name}`,
      `Email: ${request.email}`,
      `Phone: ${request.dial} ${request.phone}`,
      `Website: ${request.website}`,
      "",
      "What they want out of it:",
      request.goal,
    ].join("\n"),
  });
  for (const guest of guests) params.append("add", guest);
  /* `dates` is appended by hand: its slash is a separator Google reads, and
     URLSearchParams would percent-encode it. */
  return (
    `https://calendar.google.com/calendar/render?${params.toString()}` +
    `&dates=${stamp(start)}/${stamp(end)}`
  );
}

/** The slot written out for a human, in the visitor's own zone. */
export function readableSlot(request: DemoRequest) {
  const { start } = windowOf(request);
  const day = start.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return request.timezone
    ? `${day} at ${request.slot} (${request.timezone})`
    : `${day} at ${request.slot}`;
}

/** Everything both templates can print. */
function templateParams(request: DemoRequest) {
  const { start, end } = windowOf(request);
  return {
    to_email: request.email,
    team_email: BOOKING_EMAIL,
    name: request.name,
    email: request.email,
    goal: request.goal,
    website: request.website,
    phone: `${request.dial} ${request.phone}`,
    sms_opt_in: request.smsOptIn ? "Yes" : "No",
    guests: request.guests.filter(Boolean).join(", ") || "None",
    slot: readableSlot(request),
    timezone: request.timezone || "not reported",
    starts_at: start.toISOString(),
    ends_at: end.toISOString(),
    duration: `${DEMO_MINUTES} minutes`,
    calendar_link: calendarLink(request),
  };
}

/**
 * Sends both emails. Throws if either fails, so the form can say the booking
 * did not go through instead of showing a confirmation for an email nobody
 * received.
 */
export async function sendDemoRequest(request: DemoRequest) {
  if (!bookingConfigured) {
    throw new Error("EmailJS keys are missing from this build.");
  }
  const params = templateParams(request);
  /* Sequential, not parallel: EmailJS allows one request per second. */
  await sendTemplate(TEAM_TEMPLATE, { ...params, to_email: BOOKING_EMAIL });
  await sendTemplate(CLIENT_TEMPLATE, params);
}
