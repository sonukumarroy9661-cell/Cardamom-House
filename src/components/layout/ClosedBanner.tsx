import { Container } from "@/components/ui/Container";
import { describeNextOpening, type NextOpening } from "@/lib/hours";

export function ClosedBanner({ next }: { next: NextOpening | null }) {
  return (
    <div role="status" className="bg-accent text-white">
      <Container size="lg" className="py-5">
        <p className="font-display text-xl font-semibold">We&rsquo;re closed today.</p>
        <p className="mt-1 max-w-prose">
          {next ? `We open again ${describeNextOpening(next)}. ` : ""}
          Have a look at the menu and plan your visit.
        </p>
      </Container>
    </div>
  );
}
