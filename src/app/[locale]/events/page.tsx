import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventCard } from "@/components/editorial/cards";
import { EmptyState } from "@/components/editorial/empty-state";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection } from "@/components/editorial/section";
import { pastEvents, upcomingEvents } from "@/content/records";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type EventsPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/events") : "/en/events";

  return pageMetadata({
    title: "Events",
    description: t.pages.events.lede,
    path,
  });
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.events;
  const shared = t.shared;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        breadcrumbLabel={t.ui.breadcrumb}
        breadcrumbs={[
          { label: shared.breadcrumbHome, href: localePath(locale) },
          { label: page.eyebrow },
        ]}
        tone="charcoal"
      />

      <EditorialSection tone="white" title={page.upcomingTitle}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_20rem] md:items-start md:gap-16">
          <EmptyState
            title={page.upcomingEmptyTitle}
            body={page.upcomingEmptyBody}
            action={
              <a
                href={localePath(locale, "/contact")}
                className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 underline decoration-gold-600/60 underline-offset-4 transition-colors hover:text-gold-700"
              >
                {shared.contactCta}
              </a>
            }
          />
          <p className="border-l-2 border-charcoal-900/20 pl-5 text-[0.82rem] leading-relaxed text-charcoal-500">
            {page.upcomingNote}
          </p>
        </div>

        {upcomingEvents.length === 0 ? null : (
          <div className="mt-10">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                locale={locale}
                statusLabel={shared.statuses.announced}
                kindLabel={event.kind}
              />
            ))}
          </div>
        )}
      </EditorialSection>

      <section className="border-t border-charcoal-900/10 bg-ivory-100 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="display-2 text-balance text-charcoal-950">{page.pastTitle}</h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-charcoal-600">{page.pastIntro}</p>
          </div>

          <div className="mt-10 border-y border-charcoal-900/15">
            {pastEvents.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                locale={locale}
                statusLabel={shared.statuses.recorded}
                kindLabel={event.kind}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
