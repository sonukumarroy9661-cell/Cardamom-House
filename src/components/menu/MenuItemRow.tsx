import { DietTagBadge } from "@/components/menu/DietTagBadge";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { formatEUR } from "@/lib/format";
import type { MenuItem } from "@/types/menu";

interface MenuItemRowProps {
  item: MenuItem;
  isSpecial?: boolean;
  soldOut?: boolean;
}

export function MenuItemRow({ item, isSpecial = false, soldOut = false }: MenuItemRowProps) {
  return (
    <li id={item.id} className="scroll-mt-32 border-b border-line py-4 print:break-inside-avoid">
      <div className="flex items-baseline gap-3">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className={cn("font-display text-lg font-semibold leading-snug", soldOut && "text-muted")}>
            {item.name}
          </h3>
          {soldOut && <Pill tone="muted">Sold out</Pill>}
          {isSpecial && !soldOut && <Pill tone="accent">Today&rsquo;s special</Pill>}
        </div>
        <span aria-hidden="true" className="min-w-3 flex-1 -translate-y-1 border-b border-dotted border-line" />
        <span className={cn("shrink-0 font-medium tabular-nums", soldOut && "text-muted line-through")}>
          {formatEUR(item.price)}
        </span>
      </div>

      {(item.description || item.tags.length > 0) && (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
          {item.description && (
            <p className="max-w-prose text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
          )}
          {item.tags.length > 0 && (
            <ul className="flex gap-1.5" aria-label="Dietary information">
              {item.tags.map((tag) => (
                <li key={tag}><DietTagBadge tag={tag} /></li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
