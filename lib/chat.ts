import { TEAM_EMAIL, sendTemplate, transportConfigured } from "@/lib/emailjs";

/**
 * The chat launcher's send path.
 *
 * THIS IS EMAIL WEARING A CHAT'S CLOTHES, deliberately. A real messenger needs
 * somewhere to keep a conversation and `output: "export"` gives us nowhere to
 * keep one. So the widget collects an address and a message and posts them
 * through the same EmailJS transport the booking and brief forms already use,
 * and the reply arrives in the visitor's inbox.
 *
 * The panel says that plainly rather than implying a thread that will never
 * appear. A chat window that looks like it is listening and is not is worse
 * than a contact form that admits what it is.
 */

const TEAM_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TEAM ?? "";

/** False when the build has no keys, which is what the fallback copy is for. */
export const chatConfigured = Boolean(transportConfigured && TEAM_TEMPLATE);

export interface ChatMessage {
  email: string;
  message: string;
  /** Where the visitor was standing. The first question is usually about it. */
  page: string;
}

/** Deliberately loose. The server is the thing that decides deliverability. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MAX = 1200;

/**
 * Returns the field to blame, or null when it is fine. Field-level rather than
 * a single boolean so the panel can mark the input the visitor has to fix.
 */
export function validateChat(message: ChatMessage): "email" | "message" | null {
  if (!EMAIL.test(message.email.trim())) return "email";
  const body = message.message.trim();
  if (body.length < 2 || body.length > MESSAGE_MAX) return "message";
  return null;
}

export async function sendChatMessage(message: ChatMessage) {
  if (!chatConfigured) {
    throw new Error("EmailJS keys are missing from this build.");
  }
  const field = validateChat(message);
  if (field) throw new Error(`Invalid ${field}.`);

  const from = message.email.trim();
  await sendTemplate(TEAM_TEMPLATE, {
    to_email: TEAM_EMAIL,
    /* So hitting reply in the inbox answers the visitor rather than us. */
    reply_to: from,
    subject: `Website message from ${from}`,
    body: [
      message.message.trim(),
      "",
      `From: ${from}`,
      `Sent from: ${message.page}`,
    ].join("\n"),
  });
}
