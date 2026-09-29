// Client island: sticky nav + dietary filter (stretch) + all menu sections.
"use client";

import { useMemo, useState } from "react";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DietFilter } from "@/components/menu/DietFilter";
import { MenuSection } from "@/components/menu/MenuSection";
import { Container } from "@/components/ui/Container";
import { filterCategories, type DietFilterValue } from "@/lib/menu";
import type { Category } from "@/types/menu";

interface MenuBrowserProps {
  categories: readonly Category[];
  specialItemId: string;
  soldOutItemIds: readonly string[];
}

/** Client island: owns the diet filter and the sticky nav. Everything else stays server-rendered. */
export function MenuBrowser({ categories, specialItemId, soldOutItemIds }: MenuBrowserProps) {
  const [filter, setFilter] = useState<DietFilterValue>("all");
  const visible = useMemo(() => filterCategories(categories, filter), [categories, filter]);
  const soldOut = useMemo(() => new Set(soldOutItemIds), [soldOutItemIds]);

  return (
    <div>
      <CategoryNav items={visible.map((c) => ({ id: c.id, label: c.name }))} />
      <Container as="div">
        <DietFilter value={filter} onChange={setFilter} />
        <p className="mt-3 text-sm text-muted">
          V is vegetarian, GF is gluten-free. Ask us about allergens.
        </p>
        {visible.map((category) => (
          <MenuSection key={category.id} category={category} specialItemId={specialItemId} soldOutItemIds={soldOut} />
        ))}
      </Container>
    </div>
  );
}
