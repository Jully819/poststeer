"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, MessageCircle, X } from "lucide-react";
import { chat } from "@/lib/content";
import { Logo } from "@/components/logo";
import {
  MESSAGE_MAX,
  chatConfigured,
  sendChatMessage,
  validateChat,
} from "@/lib/chat";
import { cn } from "@/lib/utils";

/**
 * Floating message launcher, bottom right.
 *
 * WHAT IT IS. A composer that posts through EmailJS, dressed as a messenger
 * because that is the shape visitors expect in this corner of a page. What it
 * is not is a chat. There is no backend on a static export, so there is no
 * thread, no history and no agent presence, and the panel says so in the
 * header rather than implying otherwise. See the note on `chat` in
 * lib/content.ts for why there is no face and no response-time badge.
 *
 * THE PANEL IS NOT A MODAL. The page behind it stays usable and focus is not
 * trapped, because this is a side channel rather than a step in a flow.
 * Escape closes it and focus returns to the launcher, which is what a keyboard
 * user expects from a disclosure.
 *
 * WHEN THERE ARE NO KEYS the form is replaced by the direct address. A widget
 * that accepts a message into a build with no transport is a worse failure
 * than one that admits it cannot send.
 */

type Status = "idle" | "sending" | "sent" | "error";

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<"email" | "message" | null>(null);

  const launcher = useRef<HTMLButtonElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  /* Escape closes from anywhere inside the panel, and the launcher takes focus
     back so the next Tab carries on from where it was. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      launcher.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Opening a composer and leaving the caret somewhere else wastes the click. */
  useEffect(() => {
    if (open && status === "idle") firstField.current?.focus();
  }, [open, status]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      email,
      message,
      page: typeof window === "undefined" ? "" : window.location.pathname,
    };
    const field = validateChat(payload);
    if (field) {
      setInvalid(field);
      return;
    }
    setInvalid(null);
    setStatus("sending");
    try {
      await sendChatMessage(payload);
      setStatus("sent");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={chat.label}
          className="flex w-[21rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-hairline bg-paper shadow-[0_24px_60px_-20px_rgb(10_11_16/0.45)]"
        >
          <header className="flex items-center gap-3 border-b border-hairline bg-wash px-4 py-3.5">
            <Logo height={26} />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block font-mono text-[0.7rem] text-muted">
                {chat.subtitle}
              </span>
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcher.current?.focus();
              }}
              aria-label={chat.closeLabel}
              className="-mr-1 grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div className="px-4 py-4">
            {status === "sent" ? (
              <div role="status">
                <p className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-ink">
                  <Check className="size-4 text-accent-ink" aria-hidden="true" />
                  {chat.sentTitle}
                </p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-body">
                  {chat.sentBody}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-[0.82rem] font-medium text-accent-ink underline underline-offset-4"
                >
                  {chat.sendAnother}
                </button>
              </div>
            ) : (
              <>
                {/* The one bubble in here is a real greeting from us, not a
                    staged conversation with invented replies. */}
                <p className="rounded-xl rounded-tl-sm bg-wash px-3.5 py-3 text-[0.85rem] leading-relaxed text-body">
                  {chat.greeting}
                </p>

                {chatConfigured ? (
                  /* noValidate so one validator owns every message. Native
                     validation on type="email" fires first and blocks the
                     handler, which left the email field showing a browser
                     tooltip while the textarea showed our own styled error,
                     and meant aria-invalid never got set on the input that
                     was actually wrong. */
                  <form onSubmit={submit} noValidate className="mt-4">
                    <label
                      htmlFor="chat-email"
                      className="block font-mono text-[0.7rem] tracking-[0.1em] text-muted uppercase"
                    >
                      {chat.emailLabel}
                    </label>
                    <input
                      id="chat-email"
                      ref={firstField}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (invalid === "email") setInvalid(null);
                      }}
                      placeholder={chat.emailPlaceholder}
                      autoComplete="email"
                      disabled={sending}
                      aria-invalid={invalid === "email"}
                      aria-describedby={invalid === "email" ? "chat-error" : undefined}
                      className={cn(
                        "mt-1.5 w-full rounded-lg border bg-paper px-3 py-2 text-[0.88rem] text-ink outline-none",
                        "focus-visible:border-ink",
                        invalid === "email" ? "border-bad" : "border-hairline",
                      )}
                    />

                    <label
                      htmlFor="chat-message"
                      className="mt-3 block font-mono text-[0.7rem] tracking-[0.1em] text-muted uppercase"
                    >
                      {chat.messageLabel}
                    </label>
                    <textarea
                      id="chat-message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value.slice(0, MESSAGE_MAX));
                        if (invalid === "message") setInvalid(null);
                      }}
                      placeholder={chat.messagePlaceholder}
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      disabled={sending}
                      aria-invalid={invalid === "message"}
                      aria-describedby={invalid === "message" ? "chat-error" : undefined}
                      className={cn(
                        "mt-1.5 w-full resize-none rounded-lg border bg-paper px-3 py-2 text-[0.88rem] leading-relaxed text-ink outline-none",
                        "focus-visible:border-ink",
                        invalid === "message" ? "border-bad" : "border-hairline",
                      )}
                    />

                    {/* One live region for every outcome, so a screen reader
                        hears the failure as well as the success. */}
                    <p
                      id="chat-error"
                      role="status"
                      className={cn(
                        "mt-2 text-[0.78rem] leading-snug",
                        status === "error" || invalid ? "text-bad" : "sr-only",
                      )}
                    >
                      {invalid === "email"
                        ? chat.errorEmail
                        : invalid === "message"
                          ? chat.errorMessage
                          : status === "error"
                            ? chat.errorSend
                            : ""}
                    </p>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn btn-accent mt-3 min-h-[2.6rem] w-full text-[0.88rem] disabled:opacity-60"
                    >
                      {sending ? chat.sending : chat.send}
                      {sending ? null : (
                        <ArrowUp className="size-4" aria-hidden="true" />
                      )}
                    </button>

                    <p className="mt-3 text-[0.72rem] leading-snug text-muted">
                      {chat.footnote}{" "}
                      <a
                        href={`mailto:${chat.directEmail}`}
                        className="underline underline-offset-2 hover:text-ink"
                      >
                        {chat.directEmail}
                      </a>
                    </p>
                  </form>
                ) : (
                  <div className="mt-4">
                    <p className="text-[0.85rem] leading-relaxed text-body">
                      {chat.fallbackBody}
                    </p>
                    <a
                      href={`mailto:${chat.directEmail}`}
                      className="btn btn-accent mt-3 min-h-[2.6rem] w-full text-[0.88rem]"
                    >
                      {chat.directEmail}
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}

      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? chat.closeLabel : chat.label}
        className="grid size-14 place-items-center rounded-full bg-accent text-ink shadow-[0_10px_24px_-8px_rgb(10_11_16/0.45)] transition-colors hover:bg-accent-deep"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
