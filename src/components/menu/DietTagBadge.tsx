// REQ 5: V = vegetarian, GF = gluten-free, spicy. Subtle outline pill; 'spicy' uses amber #B45309 outline. sr-only full label for screen readers.
import { Pill } from "@/components/ui/Pill";
import type { DietTag } from "@/types/menu";

const TAGS: Record<DietTag, { short: string; long: string }> = {
  V: { short: "V", long: "Vegetarian" },
  GF: { short: "GF", long: "Gluten-free" },
  spicy: { short: "Spicy", long: "Spicy" },
};

export function DietTagBadge({ tag }: { tag: DietTag }) {
  const { short, long } = TAGS[tag];
  return (
    <Pill tone="outline" className={tag === "spicy" ? "border-accent/60 text-accent-text" : undefined}>
      <span aria-hidden="true" title={long}>{short}</span>
      <span className="sr-only">{long}</span>
    </Pill>
  );
}
