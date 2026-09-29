// REQ 4: section with heading, optional description and item list. Amber accent line #B45309 under heading.
import { MenuItemRow } from "@/components/menu/MenuItemRow";
import type { Category } from "@/types/menu";

interface MenuSectionProps {
  category: Category;
  specialItemId: string;
  soldOutItemIds: ReadonlySet<string>;
}

export function MenuSection({ category, specialItemId, soldOutItemIds }: MenuSectionProps) {
  const headingId = `${category.id}-heading`;
  return (
    <section id={category.id} aria-labelledby={headingId} className="scroll-mt-16 pt-12">
      <header className="mb-2">
        <h2 id={headingId} className="font-display text-3xl font-semibold sm:text-4xl">
          {category.name}
        </h2>
        <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent" />
        {category.description && <p className="mt-3 max-w-prose text-muted">{category.description}</p>}
      </header>
      <ul className="md:grid md:grid-cols-2 md:gap-x-12">
        {category.items.map((item) => (
          <MenuItemRow
            key={item.id}
            item={item}
            isSpecial={item.id === specialItemId}
            soldOut={soldOutItemIds.has(item.id)}
          />
        ))}
      </ul>
    </section>
  );
}
