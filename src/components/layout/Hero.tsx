// REQ 1: restaurant name + tagline + open/closed indicator (Lisbon time). Stretch: entrance animation. Colours: forest #1F3B2C bg, amber #B45309 pod + closed dot.
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { describeNextOpening, type OpenStatus } from "@/lib/hours";
import type { Restaurant } from "@/types/menu";

function StatusLine({ status }: { status: OpenStatus }) {
  const text = status.isOpen
    ? `Open now, until ${status.closesAt}`
    : status.next
      ? `Closed. Opens ${describeNextOpening(status.next)}`
      : "Closed";
  return (
    <p
      role="status"
      className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium print:border-black"
    >
      <span
        aria-hidden="true"
        className={cn("size-2.5 rounded-full", status.isOpen ? "bg-pistachio" : "bg-accent")}
      />
      {text}
    </p>
  );
}

export function Hero({ restaurant, status }: { restaurant: Restaurant; status: OpenStatus }) {
  return (
    <header className="bg-forest text-hero-ink print:bg-white print:text-black">
      <Container size="lg" className="pb-14 pt-16 sm:pb-20 sm:pt-24">
        
        <h1 className="hero-rise font-display text-[clamp(3rem,13vw,7.5rem)] font-semibold leading-[0.95] tracking-tight" style={{ "--i": 1 } as React.CSSProperties}>
          {restaurant.name}
        </h1>
        <p className="hero-rise mt-6 max-w-xl text-lg text-hero-muted sm:text-xl print:text-black" style={{ "--i": 2 } as React.CSSProperties}>
          {restaurant.tagline}
        </p>
        <div className="hero-rise mt-8" style={{ "--i": 3 } as React.CSSProperties}>
          <StatusLine status={status} />
        </div>
      </Container>
    </header>
  );
}
