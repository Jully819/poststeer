import { ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stand-in for every image and video on the page.
 *
 * FLAT TINT, HAIRLINE, AND A LABEL SAYING WHAT BELONGS THERE. A placeholder
 * that looks like a finished photograph hides how much art the layout still
 * needs; this one is obvious at a glance and still holds the right shape, so
 * the grid rhythm is real even before any asset exists.
 */
export function Placeholder({
  label,
  className,
  ratio = "aspect-square",
  kind = "image",
}: {
  label: string;
  className?: string;
  ratio?: string;
  kind?: "image" | "video";
}) {
  const Icon = kind === "video" ? PlayCircle : ImageIcon;
  return (
    <div className={cn("ph grid place-items-center", ratio, className)} aria-hidden="true">
      <div className="flex flex-col items-center gap-2 px-3 text-center">
        <Icon className="size-5 text-muted" />
        <span className="text-[0.7rem] leading-snug font-medium text-muted">{label}</span>
      </div>
    </div>
  );
}
