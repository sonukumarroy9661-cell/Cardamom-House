// STRETCH: dietary filter (Everything / Vegetarian / Gluten-free). Selected = amber #B45309.
import { cn } from "@/lib/cn";
import type { DietFilterValue } from "@/lib/menu";

const OPTIONS: ReadonlyArray<{ value: DietFilterValue; label: string }> = [
  { value: "all", label: "Everything" },
  { value: "V", label: "Vegetarian" },
  { value: "GF", label: "Gluten-free" },
];

interface DietFilterProps {
  value: DietFilterValue;
  onChange: (value: DietFilterValue) => void;
}

export function DietFilter({ value, onChange }: DietFilterProps) {
  return (
    <div role="group" aria-label="Filter menu by diet" className="no-print flex flex-wrap items-center gap-2 pt-6">
      {OPTIONS.map((option) => {
        const pressed = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              pressed
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface text-ink hover:border-accent",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
