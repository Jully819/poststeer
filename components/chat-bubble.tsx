"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { chat } from "@/lib/content";
import { withBase } from "@/lib/utils";

/**
 * Floating chat launcher, bottom right.
 *
 * A BUTTON THAT DOES NOTHING IS WORSE THAN NO BUTTON, so this opens a small
 * panel that says what it is and offers the booking link. Swap the panel for
 * a provider snippet (Intercom, Crisp) when there is one.
 *
 * Escape closes it, focus styles are left at the browser default, and the
 * launcher keeps a 56px target so it is tappable on a phone.
 */
export function ChatBubble() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={chat.title}
          className="w-[17rem] rounded-2xl border border-hairline bg-paper p-5 shadow-[0_18px_40px_-20px_rgb(13_15_20/0.35)]"
        >
          <p className="font-display text-[1rem] font-semibold text-ink">{chat.title}</p>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-body">{chat.body}</p>
          <a href={withBase("/demo")} className="btn btn-accent mt-4 min-h-[2.6rem] w-full text-[0.85rem]">
            {chat.cta}
          </a>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : chat.label}
        className="grid size-14 place-items-center rounded-full bg-accent text-ink shadow-[0_10px_24px_-8px_rgb(47_107_255/0.6)] transition-colors hover:bg-accent-deep"
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
