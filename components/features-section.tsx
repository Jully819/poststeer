import { FeatureGrid } from "@/components/ui/feature-section";
import { Check } from "lucide-react";
import { hero } from "@/lib/content";

/**
 * Animated features section displaying hero bullets in a grid layout.
 */
export function FeaturesSection() {
  // Transform hero bullets into FeatureGrid categories format
  const categories = hero.bullets.map((bullet) => ({
    icon: <Check className="size-5" />,
    title: bullet.title,
    items: [{ text: bullet.body }],
  }));

  return (
    <FeatureGrid
      title="Why PostSteer"
      subtitle="Everything you need to keep your brand visible and your audience engaged"
      illustrationSrc="" // Optional: add illustration if needed
      illustrationAlt="PostSteer features"
      categories={categories}
      buttonText="See pricing"
      buttonHref="#pricing"
      className="pt-0"
    />
  );
}
