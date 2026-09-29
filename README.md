# Cardamom House: Menu Page

A one-page menu website for a fictional brunch café in Lisbon.
Built as the Frontend Trial Task for Kwill.

**Tech:** Next.js 15 (App Router) · React 19 · TypeScript (strict, no `any`) · Tailwind CSS v4

---

## 1. How to run

```bash
npm install
npm run dev          # open http://localhost:3000
npm run typecheck    # checks TypeScript
npm run build        # production build
```

Deploy: push to GitHub, then import the repo on Vercel. No settings needed.

## 2. The three states

Add `?state=` to the URL (or use the links in the page footer).

| URL | What you see |
|---|---|
| `/` or `/?state=open` | Tuesday 11:30. Café is open. Special is available. |
| `/?state=closed` | Monday. Amber "We're closed today" banner with next opening time. Special is hidden. |
| `/?state=special-sold-out` | Open. Saffron French Toast is dimmed with a "Sold out" pill. Callout says the special is gone. |
| `/?state=live` | Bonus: uses the real current time in Lisbon. |

## 3. Colours

The brand colour **#B45309** (warm amber) comes from the data file
(`restaurant.brandColor`) and is set once in `src/app/layout.tsx`.
All other colours are tokens in `src/app/globals.css`.

| Name | Hex | Used for |
|---|---|---|
| **Brand amber** | `#B45309` | Buttons, accent lines, active nav tab, special callout, today's row, closed banner, focus ring |
| Amber hover | `#92400E` | Button hover |
| Amber tint | `#F4DFC6` | Special callout and today's row background |
| Forest green | `#1F3B2C` | Hero and footer background |
| Pistachio | `#C9D9A4` | "Open now" dot |
| Paper | `#F1F3E6` | Page background |
| Ink | `#1C2A20` | Main text |
| Muted | `#4F5E54` | Descriptions, closed days, sold-out items |
| Line | `#D3D9C0` | Dividers and borders |
| Amber text (dark mode) | `#F0A15E` | Lighter amber for readable text on dark background |

Contrast: white on `#B45309` and amber on paper both pass WCAG AA (about 5:1).

## 4. Requirements, and where each one lives

| # | Requirement | File |
|---|---|---|
| 1 | Hero with name, tagline, open/closed status | `components/layout/Hero.tsx`, `lib/hours.ts` |
| 2 | Today's special callout | `components/menu/SpecialCallout.tsx` |
| 3 | Sticky category nav, active section highlight | `components/menu/CategoryNav.tsx`, `hooks/useActiveSection.ts` |
| 4 | Menu sections (Brunch, Sandwiches, Drinks, Sides) | `components/menu/MenuSection.tsx` |
| 5 | Menu items: name, description, € price, tags | `components/menu/MenuItemRow.tsx`, `DietTagBadge.tsx`, `lib/format.ts` |
| 6 | Hours block, today emphasised, closed days different | `components/layout/HoursTable.tsx` |
| 7 | Footer: address, phone, Instagram | `components/layout/Footer.tsx` |
| 8 | Responsive, mobile first | Tailwind breakpoints everywhere, `layout.tsx` viewport |
| 9 | Accessibility basics | Skip link, landmarks, focus ring, `aria-*`, tap targets 44px+ |
| States | open / closed / special-sold-out | `lib/scenario.ts`, `app/page.tsx` |
| Stretch | Entrance animation, print layout, dark mode, diet filter | `globals.css`, `DietFilter.tsx` |

Every one of these files starts with a comment saying which requirement it covers.

## 5. Project structure

```
src/
  app/          layout, page, globals.css (colours), icon.svg (favicon)
  components/
    ui/         Container, Pill (small reusable pieces)
    layout/     Hero, ClosedBanner, HoursTable, Footer
    menu/       MenuBrowser, CategoryNav, DietFilter, MenuSection,
                MenuItemRow, DietTagBadge, SpecialCallout
  hooks/        useActiveSection (scroll-spy)
  lib/          hours, scenario, menu, format, cn
  data/         typed menu data
  types/        shared TypeScript types
```

## 6. Decisions and trade-offs (plain words)

- **Server first.** Only the sticky nav and diet filter need the browser, so only they are client components.
- **Time logic is a pure function.** `getOpenStatus(hours, now)` gets the time passed in, so it is easy to test and the three states are just three different "now" values.
- **Closed state.** The banner sits right under the hero so it is the first thing read. The special is hidden because "today's special" would be misleading on a closed day.
- **Sold out.** Text turns muted (not opacity, so contrast stays good), price is struck through, and a "Sold out" pill is added.
- **No photos.** Type and colour carry the brand. Fraunces (serif) for warmth, DM Sans for reading.
- **Accessibility.** No images are used, so there is no alt text to write. The decorative cardamom logo is `aria-hidden`. V / GF tags have full-word screen-reader labels.

## 7. What I would build next

- Unit tests for `hours.ts` (Vitest) and a Playwright test for each state.
- Real food photos with `next/image` and proper alt text.
- Portuguese / English switch.
- Save the diet filter in the URL so it can be shared.
