import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/editorial/breadcrumbs";
import { FactGrid, Prose } from "@/components/editorial/section";
import { StatusPill } from "@/components/editorial/status-pill";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";
import { eventBySlug, eventsExcept } from "@/content/records";

type EventPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = eventBySlug(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  const path = isEnabledLocale(locale)
    ? localePath(locale, `/events/${event.slug}`)
    : `/en/events/${event.slug}`;

  return pageMetadata({
    title: event.title,
    description: event.summary,
    path,
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { locale, slug } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const event = eventBySlug(slug);

  if (!event) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.events;
  const shared = t.shared;
  const related = eventsExcept(event.slug);

  return (
    <article>
      <header className="relative overflow-hidden bg-charcoal-950 pt-10 pb-14 text-ivory-100 md:pt-14 md:pb-18">
        <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.06]" />

        <div className="container-page relative">
          <Breadcrumbs
            label={t.ui.breadcrumb}
            tone="dark"
            items={[
              { label: shared.breadcrumbHome, href: localePath(locale) },
              { label: page.eyebrow, href: localePath(locale, "/events") },
              { label: event.title },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-4">
              <StatusPill
                status={event.status === "recorded" ? "recorded" : "announced"}
                label={page.detailRecorded}
              />
              <span className="text-[0.6rem] uppercase tracking-[0.16em] text-ivory-200/85">
                {event.kind} · {event.dateLabel}
              </span>
            </div>

            <h1 className="display-1 mt-5 text-balance text-ivory-50">{event.title}</h1>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-ivory-200/90">
              {event.summary}
            </p>
          </div>
        </div>
      </header>

      <div className="bg-ivory-50 py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20">
          <div>
            <Prose paragraphs={event.body} lead />

            <div className="mt-10 border-t border-charcoal-900/15 pt-6">
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
                {page.detailStatusLabel}
              </p>
              <p className="mt-2 text-[0.85rem] text-charcoal-700">{event.source}</p>
            </div>

            <Link
              href={localePath(locale, "/events")}
              className="mt-8 inline-block border-b border-gold-600/60 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 transition-colors hover:text-gold-700"
            >
              {page.detailBack}
            </Link>
          </div>

          <aside>
            <FactGrid facts={event.facts} />
          </aside>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-charcoal-900/10 bg-ivory-100 py-16">
          <div className="container-page">
            <h2 className="display-3 text-charcoal-950">{page.detailRelated}</h2>
            <ul className="mt-6 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localePath(locale, `/events/${item.slug}`)}
                    className="text-[0.9rem] text-charcoal-800 underline decoration-gold-600/50 underline-offset-4 hover:text-gold-700"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
