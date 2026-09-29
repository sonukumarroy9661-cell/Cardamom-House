// REQ 6: weekly hours. Today's row = amber tint #F4DFC6 + bold + 'Today' pill (#B45309). Closed days = muted italic.
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { parseRange } from "@/lib/hours";
import { WEEKDAYS, type Hours, type Weekday } from "@/types/menu";

export function HoursTable({ hours, today }: { hours: Hours; today: Weekday }) {
  return (
    <section aria-labelledby="hours-heading" className="pt-16">
      <Container size="md">
        <h2 id="hours-heading" className="font-display text-3xl font-semibold sm:text-4xl">
          Opening hours
        </h2>
        <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent" />
        <table className="mt-6 w-full border-collapse text-left">
          <caption className="sr-only">Weekly opening hours, Lisbon time</caption>
          <tbody>
            {WEEKDAYS.map((day) => {
              const isToday = day === today;
              const isClosed = parseRange(hours[day]) === null;
              return (
                <tr
                  key={day}
                  aria-current={isToday ? "date" : undefined}
                  className={cn("border-b border-line", isToday && "bg-accent-soft font-semibold")}
                >
                  <th scope="row" className={cn("px-3 py-3.5 font-medium capitalize", isClosed && "text-muted")}>
                    {day}
                    {isToday && <Pill tone="accent" className="ml-2 align-middle">Today</Pill>}
                  </th>
                  <td className={cn("px-3 py-3.5 text-right tabular-nums", isClosed && "italic text-muted")}>
                    {hours[day]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </section>
  );
}
