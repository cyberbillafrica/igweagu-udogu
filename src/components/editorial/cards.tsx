import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";
import type { EventRecord, Notice } from "@/content/records";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type NoticeCardProps = {
  notice: Notice;
  categoryLabel: string;
  readMore: string;
  locale: Locale;
  className?: string;
};

export function NoticeCard({ notice, categoryLabel, readMore, locale, className }: NoticeCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border-t border-charcoal-900/20 pt-6 transition-colors hover:border-gold-600/70",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-gold-700">
          {categoryLabel}
        </span>
        <time
          dateTime={notice.date}
          className="text-[0.58rem] uppercase tracking-[0.12em] text-charcoal-500"
        >
          {notice.dateLabel}
        </time>
      </div>

      <h3 className="mt-5 font-display text-[1.35rem] leading-tight text-charcoal-950">
        <Link
          href={localePath(locale, `/news/${notice.slug}`)}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {notice.title}
        </Link>
      </h3>

      <p className="mt-3 text-[0.88rem] leading-relaxed text-charcoal-500">{notice.summary}</p>

      <span className="mt-auto flex items-center gap-2 pt-6 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-charcoal-500 transition-colors group-hover:text-gold-700">
        {readMore}
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}

type EventCardProps = {
  event: EventRecord;
  locale: Locale;
  statusLabel: string;
  kindLabel: string;
};

export function EventCard({ event, locale, statusLabel, kindLabel }: EventCardProps) {
  const day = new Date(event.date).getUTCDate();
  const month = new Date(event.date).toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });

  return (
    <article className="group relative grid grid-cols-[4.5rem_1fr] items-start gap-5 border-b border-charcoal-900/10 py-6 last:border-b-0 md:grid-cols-[4.5rem_1fr_auto] md:items-center md:gap-8">
      <time
        dateTime={event.date}
        className="flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center border border-charcoal-900/15 bg-ivory-50"
      >
        <span className="font-display text-[1.65rem] leading-none text-charcoal-950">
          {String(day).padStart(2, "0")}
        </span>
        <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
          {month} {event.date.slice(0, 4)}
        </span>
      </time>

      <div>
        <h3 className="font-display text-[1.3rem] leading-tight text-charcoal-950">
          <Link
            href={localePath(locale, `/events/${event.slug}`)}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {event.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.12em] text-charcoal-500">
          <span>{kindLabel}</span>
          <span aria-hidden="true" className="h-2.5 w-px bg-charcoal-900/20" />
          <span>
            {event.venue}, {event.lga}
          </span>
        </p>
      </div>

      <span className="hidden text-[0.55rem] uppercase tracking-[0.16em] text-charcoal-500 md:block">
        {statusLabel}
      </span>
    </article>
  );
}
