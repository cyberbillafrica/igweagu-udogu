import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NoticeExplorer } from "@/components/editorial/notice-explorer";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection } from "@/components/editorial/section";
import { featuredNotice, notices } from "@/content/records";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/news") : "/en/news";

  return pageMetadata({
    title: "News & announcements",
    description: t.pages.news.lede,
    path,
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.news;
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

      <section className="bg-ivory-50 py-16 md:py-20">
        <div className="container-page">
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
            {page.featuredLabel}
          </p>

          <article className="mt-6 grid gap-8 border-t border-charcoal-900/20 pt-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-gold-700">
                  {page.categories[featuredNotice.category]}
                </span>
                <span aria-hidden="true" className="h-2.5 w-px bg-charcoal-900/20" />
                <time
                  dateTime={featuredNotice.date}
                  className="text-[0.6rem] uppercase tracking-[0.14em] text-charcoal-500"
                >
                  {featuredNotice.dateLabel}
                </time>
              </div>

              <h2 className="mt-5 max-w-3xl font-display text-[2rem] leading-[1.08] text-balance text-charcoal-950 md:text-[2.9rem]">
                <Link
                  href={localePath(locale, `/news/${featuredNotice.slug}`)}
                  className="transition-colors hover:text-gold-700"
                >
                  {featuredNotice.title}
                </Link>
              </h2>

              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-charcoal-600">
                {featuredNotice.summary}
              </p>

              <Link
                href={localePath(locale, `/news/${featuredNotice.slug}`)}
                className="mt-7 inline-block border-b border-gold-600/60 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 transition-colors hover:text-gold-700"
              >
                {shared.readMore}
              </Link>
            </div>

            <dl className="space-y-4 border-l-2 border-gold-600/40 pl-6">
              {featuredNotice.facts.slice(0, 3).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.52rem] uppercase tracking-[0.2em] text-charcoal-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-display text-[1.05rem] leading-snug text-charcoal-900">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <EditorialSection tone="ivory" bordered title={page.archiveTitle} lede={page.archiveIntro}>
        <NoticeExplorer
          notices={notices}
          locale={locale}
          labels={{
            searchLabel: page.searchLabel,
            searchPlaceholder: page.searchPlaceholder,
            filterLabel: page.filterLabel,
            countOne: page.countOne,
            countMany: page.countMany,
            noResults: shared.noResults,
            clearFilters: shared.clearFilters,
            readMore: shared.readMore,
            all: page.categories.all,
          }}
          categoryLabels={{
            announcement: page.categories.announcement,
            programme: page.categories.programme,
            assembly: page.categories.assembly,
          }}
        />
      </EditorialSection>
    </>
  );
}
