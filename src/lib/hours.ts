// Pure open/closed logic. Timezone: Europe/Lisbon. Returns next opening time when closed.
import { WEEKDAYS, type Hours, type Weekday } from "@/types/menu";

/** A moment in the week, expressed the way opening hours are: day + minutes since midnight. */
export interface Instant {
  day: Weekday;
  minutes: number;
}

export interface NextOpening {
  day: Weekday;
  time: string;
  isToday: boolean;
  isTomorrow: boolean;
}

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; next: NextOpening | null };

interface TimeRange {
  open: string;
  close: string;
  openMinutes: number;
  closeMinutes: number;
}

const isWeekday = (value: string): value is Weekday =>
  (WEEKDAYS as readonly string[]).includes(value);

const toMinutes = (h: string, m: string): number => Number(h) * 60 + Number(m);

export function parseRange(value: string): TimeRange | null {
  const match = /(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/.exec(value);
  if (!match) return null; // "Closed" or anything unparseable
  const [, oh = "0", om = "0", ch = "0", cm = "0"] = match;
  return {
    open: `${oh}:${om}`,
    close: `${ch}:${cm}`,
    openMinutes: toMinutes(oh, om),
    closeMinutes: toMinutes(ch, cm),
  };
}

/** Current day/time in Lisbon, independent of the visitor's or server's timezone. */
export function getLisbonNow(date: Date = new Date()): Instant {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const day = get("weekday").toLowerCase();
  return {
    day: isWeekday(day) ? day : "monday",
    minutes: toMinutes(get("hour"), get("minute")),
  };
}

export function getOpenStatus(hours: Hours, now: Instant): OpenStatus {
  const today = parseRange(hours[now.day]);

  if (today && now.minutes >= today.openMinutes && now.minutes < today.closeMinutes) {
    return { isOpen: true, closesAt: today.close };
  }
  if (today && now.minutes < today.openMinutes) {
    return { isOpen: false, next: { day: now.day, time: today.open, isToday: true, isTomorrow: false } };
  }

  const todayIndex = WEEKDAYS.indexOf(now.day);
  for (let offset = 1; offset <= 7; offset++) {
    const day = WEEKDAYS[(todayIndex + offset) % 7];
    if (!day) continue;
    const range = parseRange(hours[day]);
    if (range) {
      return { isOpen: false, next: { day, time: range.open, isToday: false, isTomorrow: offset === 1 } };
    }
  }
  return { isOpen: false, next: null };
}

export function describeNextOpening(next: NextOpening): string {
  if (next.isToday) return `today at ${next.time}`;
  if (next.isTomorrow) return `tomorrow at ${next.time}`;
  return `${next.day.charAt(0).toUpperCase()}${next.day.slice(1)} at ${next.time}`;
}
