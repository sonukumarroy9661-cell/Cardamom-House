export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];
export type DietTag = "V" | "GF" | "spicy";
export type Hours = Record<Weekday, string>;

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: readonly DietTag[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  items: readonly MenuItem[];
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  hours: Hours;
  brandColor: string;
  phone: string;
  instagram: string;
}

export interface TodaySpecial {
  itemId: string;
  blurb: string;
}

export interface MenuData {
  restaurant: Restaurant;
  todaySpecial: TodaySpecial;
  categories: readonly Category[];
}
