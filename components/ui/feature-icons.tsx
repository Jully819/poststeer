import type { ComponentType, SVGProps } from "react";
import {
  BarChart3,
  CalendarCheck,
  Captions,
  ClipboardList,
  Crosshair,
  Gauge,
  Globe,
  Layers,
  LayoutTemplate,
  Link2,
  Mail,
  Palette,
  PenLine,
  RefreshCw,
  Scissors,
  Search,
  Send,
  Share2,
  Smartphone,
  Sparkles,
  FormInput,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { FeatureIcon } from "@/lib/content";

/**
 * Icons for the "what's included" grid on a service page.
 *
 * SEPARATE FROM `serviceIcons`, which names services. This map names the
 * things inside one. Keeping them apart is why neither list has an entry
 * called "mail" meaning two different things.
 *
 * NO "use client" HERE, for the same reason service-icons.tsx has none: a
 * plain object exported from a client module arrives in a server component
 * as a client reference, and the lookup comes back undefined.
 */
export const featureIcons: Record<FeatureIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  design: Palette,
  pencil: PenLine,
  calendar: CalendarCheck,
  send: Send,
  team: Users,
  channels: Share2,
  scissors: Scissors,
  captions: Captions,
  hook: Zap,
  motion: Sparkles,
  export: Layers,
  revisions: RefreshCw,
  search: Search,
  doc: ClipboardList,
  link: Link2,
  chart: BarChart3,
  mail: Mail,
  flow: Workflow,
  globe: Globe,
  form: FormInput,
  gauge: Gauge,
  layout: LayoutTemplate,
  phone: Smartphone,
  target: Crosshair,
};
