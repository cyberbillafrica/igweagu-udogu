import { cn } from "@/lib/cn";

export type TimelineEntry = {
  year: string;
  dateLabel?: string;
  title: string;
  body: string;
  source?: string;
};

/**
 * A record timeline: year in its own column, a gold marker on the rule, and
 * the entry itself. On narrow screens the year moves above the entry so the
 * text keeps a comfortable measure.
 */
export function RecordTimeline({
  entries,
  className,
}: {
  entries: readonly TimelineEntry[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {entries.map((entry, index) => (
        <li
          key={`${entry.year}-${entry.title}`}
          className="relative grid gap-3 border-t border-charcoal-900/15 pb-9 pt-6 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-10 md:pb-12 md:pt-8"
        >
          <div className="flex items-baseline gap-3 md:block">
            <span className="font-display text-[1.9rem] leading-none text-charcoal-950 md:text-[2.4rem]">
              {entry.year}
            </span>
            {entry.dateLabel ? (
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold-700 md:mt-2 md:block">
                {entry.dateLabel}
              </span>
            ) : null}
          </div>

          <div className="relative md:pl-8">
            <span
              aria-hidden="true"
              className="absolute -left-[0.34rem] top-2 hidden h-1.5 w-1.5 rotate-45 bg-gold-600 md:block"
              style={{ display: index === 0 ? "none" : undefined }}
            />
            <span
              aria-hidden="true"
              className="absolute -left-[1px] top-0 hidden h-full w-px bg-charcoal-900/15 md:block"
            />
            <h3 className="font-display text-[1.3rem] leading-snug text-charcoal-950 md:text-[1.5rem]">
              {entry.title}
            </h3>
            <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-charcoal-600">
              {entry.body}
            </p>
            {entry.source ? (
              <p className="mt-3 text-[0.55rem] uppercase tracking-[0.18em] text-charcoal-500">
                {entry.source}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
