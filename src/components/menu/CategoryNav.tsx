"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

export interface NavItem {
  id: string;
  label: string;
}

export function CategoryNav({ items }: { items: readonly NavItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the active tab visible inside the horizontally-scrolling list (mobile).
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLAnchorElement>('a[aria-current="true"]');
    if (!list || !link) return;
    list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="no-print sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur"
    >
      <ul ref={listRef} className="no-scrollbar relative mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 sm:px-6">
        {items.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-h-12 items-center border-b-[3px] px-3 text-[0.95rem] font-medium transition-colors",
                  isActive
                    ? "border-accent font-semibold text-accent-text"
                    : "border-transparent text-muted hover:text-ink",
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
