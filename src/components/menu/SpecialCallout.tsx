import { Container } from "@/components/ui/Container";
import { formatEUR } from "@/lib/format";
import type { MenuItem } from "@/types/menu";

interface SpecialCalloutProps {
  item: MenuItem;
  blurb: string;
  soldOut: boolean;
}

export function SpecialCallout({ item, blurb, soldOut }: SpecialCalloutProps) {
  return (
    <Container size="lg" className="pt-8">
      <aside
        aria-labelledby="special-heading"
        className={
          soldOut
            ? "rounded-2xl border border-line bg-surface p-6 sm:p-8"
            : "rounded-2xl border-l-8 border-accent bg-accent-soft p-6 sm:p-8"
        }
      >
        <h2 id="special-heading" className="font-display text-2xl font-semibold sm:text-3xl">
          {soldOut ? "Today\u2019s special has sold out" : "Today\u2019s special"}
        </h2>
        {soldOut ? (
          <p className="mt-2 max-w-prose text-muted">
            The {item.name} is gone for today. Everything else on the menu is ready.
          </p>
        ) : (
          <>
            <p className="mt-2 max-w-prose text-lg">{blurb}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={`#${item.id}`}
                className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                See it on the menu
              </a>
              <span className="font-medium tabular-nums">{formatEUR(item.price)}</span>
            </div>
          </>
        )}
      </aside>
    </Container>
  );
}
