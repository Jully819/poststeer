import type { ComponentType, SVGProps } from "react";
import {
  FileText,
  Film,
  Image as ImageIcon,
  Layers,
  LayoutTemplate,
  Link2,
  Mail,
  MonitorCog,
  MonitorPlay,
  Search,
  Smartphone,
  Target,
  ThumbsUp,
  Users,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/content";

/**
 * One icon map, in a module with NO "use client".
 *
 * It used to live in order-summary.tsx, which is a client component — and a
 * plain object exported from a client module arrives in a server component as
 * a client reference, so `serviceIcons[key]` came back undefined and the
 * service pages died with "Element type is invalid". Shared values used on
 * both sides of the boundary belong in a neutral module.
 */
export const serviceIcons: Record<ServiceIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  posts: ImageIcon,
  stories: Smartphone,
  carousel: Layers,
  video: MonitorPlay,
  growth: ThumbsUp,
  seo: MonitorCog,
  conversion: Target,
  landing: LayoutTemplate,
  email: Mail,
  blog: FileText,
  backlinks: Link2,
};
