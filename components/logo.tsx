import Image from "next/image";
import { brand } from "@/lib/content";

/* public/logo.png is 422x156, cut from the supplied artwork with the cream
   background taken out so it sits on white (header) and cream (footer). */
const RATIO = 422 / 156;

export function Logo({ height, priority = false }: { height: number; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt={brand.name}
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
    />
  );
}
