// Page assembly. REQ 1 Hero | REQ 2 Today's special | REQ 3+4+5 MenuBrowser | REQ 6 HoursTable | REQ 7 Footer | STATES via ?state= (open, closed, special-sold-out).
import { ClosedBanner } from "@/components/layout/ClosedBanner";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { HoursTable } from "@/components/layout/HoursTable";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { SpecialCallout } from "@/components/menu/SpecialCallout";
import { menuData } from "@/data/cardamom-house";
import { getOpenStatus } from "@/lib/hours";
import { findItem } from "@/lib/menu";
import { parseScenario, resolveScenario } from "@/lib/scenario";

interface PageProps {
  searchParams: Promise<{ state?: string | string[] }>;
}

export default async function Page({ searchParams }: PageProps) {
  const scenario = parseScenario((await searchParams).state);
  const { now, specialSoldOut } = resolveScenario(scenario);

  const { restaurant, todaySpecial, categories } = menuData;
  const status = getOpenStatus(restaurant.hours, now);
  const specialItem = findItem(categories, todaySpecial.itemId);
  const soldOutItemIds = specialSoldOut ? [todaySpecial.itemId] : [];

  return (
    <>
      <Hero restaurant={restaurant} status={status} />
      {/* Closed banner sits directly under the hero: the first thing you read after the name. */}
      {!status.isOpen && <ClosedBanner next={status.next} />}
      <main id="menu">
        {/* When closed, "today's special" would be misleading, so it's hidden. */}
        {status.isOpen && specialItem && (
          <SpecialCallout item={specialItem} blurb={todaySpecial.blurb} soldOut={specialSoldOut} />
        )}
        <MenuBrowser categories={categories} specialItemId={todaySpecial.itemId} soldOutItemIds={soldOutItemIds} />
        <HoursTable hours={restaurant.hours} today={now.day} />
      </main>
      <Footer restaurant={restaurant} scenario={scenario} />
    </>
  );
}
