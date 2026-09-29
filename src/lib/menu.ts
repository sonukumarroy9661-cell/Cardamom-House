import type { Category, DietTag, MenuItem } from "@/types/menu";

export type DietFilterValue = "all" | Extract<DietTag, "V" | "GF">;

export function findItem(categories: readonly Category[], id: string): MenuItem | undefined {
  for (const category of categories) {
    const item = category.items.find((i) => i.id === id);
    if (item) return item;
  }
  return undefined;
}

export function filterCategories(
  categories: readonly Category[],
  filter: DietFilterValue,
): Category[] {
  if (filter === "all") return [...categories];
  return categories
    .map((c) => ({ ...c, items: c.items.filter((i) => i.tags.includes(filter)) }))
    .filter((c) => c.items.length > 0);
}
