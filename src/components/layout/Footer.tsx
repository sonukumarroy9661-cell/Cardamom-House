// REQ 7: address (Google Maps link), phone (tel:), Instagram handle. Forest #1F3B2C background, amber #B45309 link underline.
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SCENARIOS, type Scenario } from "@/lib/scenario";
import type { Restaurant } from "@/types/menu";

export function Footer({ restaurant, scenario }: { restaurant: Restaurant; scenario: Scenario }) {
  const handle = restaurant.instagram.replace("@", "");
  const link = "underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text";
  return (
    <footer className="mt-20 bg-forest text-hero-ink print:bg-white print:text-black">
      <Container size="lg" className="grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{restaurant.name}</p>
          <address className="mt-3 not-italic leading-relaxed text-hero-muted print:text-black">
            <a
              className={link}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
            >
              {restaurant.address}
            </a>
          </address>
        </div>
        <div className="space-y-2">
          <p><a className={link} href={`tel:${restaurant.phone.replace(/\s/g, "")}`}>{restaurant.phone}</a></p>
          <p>
            <a className={link} href={`https://instagram.com/${handle}`} rel="noopener noreferrer">
              {restaurant.instagram} on Instagram
            </a>
          </p>
        </div>
        <nav aria-label="Preview states" className="no-print text-sm text-hero-muted">
          <p className="mb-2 font-medium text-hero-ink">Preview this page as</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {SCENARIOS.map((s) => (
              <li key={s}>
                <Link href={`/?state=${s}`} aria-current={s === scenario ? "page" : undefined} className={s === scenario ? "font-semibold text-pistachio" : link}>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
