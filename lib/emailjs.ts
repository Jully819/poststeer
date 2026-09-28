/**
 * The one way this site sends email.
 *
 * THERE IS NO SERVER. `output: 'export'` ships plain HTML, so every send
 * happens in the visitor's browser, which rules out anything needing a secret.
 * EmailJS takes a public key by design and lets a template's To field be a
 * variable, so the browser can address an email without holding credentials
 * that matter.
 *
 * Keys are NEXT_PUBLIC_* vars read at BUILD time, not run time: changing one
 * means rebuilding. Anything missing means nothing is sent, and the form that
 * called it says so rather than pretending.
 *
 * Used by lib/booking.ts (the demo booker) and lib/brief.ts (the brief).
 */

export const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
export const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/** Where anything addressed to the team lands. */
export const TEAM_EMAIL =
  process.env.NEXT_PUBLIC_BOOKING_EMAIL ?? "poststeer@gmail.com";

const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/** True when the account-level keys exist. Templates are checked separately. */
export const transportConfigured = Boolean(SERVICE_ID && PUBLIC_KEY);

/**
 * Posts one template. Throws on anything other than a 2xx, so a caller can
 * tell the visitor it did not send instead of showing a confirmation for an
 * email nobody received.
 */
export async function sendTemplate(templateId: string, params: Record<string, string>) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      template_params: params,
    }),
  });
  if (!response.ok) {
    /* EmailJS answers in plain text, and the reason is worth keeping. */
    throw new Error(`${response.status} ${await response.text()}`.trim());
  }
}
