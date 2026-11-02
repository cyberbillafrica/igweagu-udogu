import Link from "next/link";

import { EventCard } from "@/components/editorial/cards";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { pastEvents } from "@/content/records";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type EventsProps = {
  events: Dictionary["events"];
  locale: Locale;
};

export function Events({ events, locale }: EventsProps) {
  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="border-t border-charcoal-900/10 bg-ivory-100 py-20 md:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              id="events-heading"
              eyebrow={events.eyebrow}
              title={events.heading}
              lede={events.lede}
            />
          </Reveal>
          <Link
            href={localePath(locale, "/events")}
            className="shrink-0 border-b border-gold-600/50 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-700 transition-colors hover:text-gold-700"
          >
            {events.viewAll}
          </Link>
        </div>

        <div className="mt-12 border-y border-charcoal-900/15">
          {pastEvents.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              locale={locale}
              statusLabel={events.pastLabel}
              kindLabel={event.kind}
            />
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-[0.7rem] leading-relaxed text-charcoal-500">
          {events.footnote}
        </p>
      </div>
    </section>
  );
}
