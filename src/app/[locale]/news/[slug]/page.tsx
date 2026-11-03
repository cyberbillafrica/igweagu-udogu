import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NoticeCard } from "@/components/editorial/cards";
import { Breadcrumbs } from "@/components/editorial/breadcrumbs";
import { FactGrid, Prose } from "@/components/editorial/section";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/page-meta";
import { noticeBySlug, noticesExcept } from "@/content/records";

type NoticePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: NoticePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const notice = noticeBySlug(slug);

  if (!notice) {
    return { title: "Notice not found" };
  }

  const path = isEnabledLocale(locale)
    ? localePath(locale, `/news/${notice.slug}`)
    : `/en/news/${notice.slug}`;

  return pageMetadata({
    title: notice.title,
    description: notice.summary,
    path,
    type: "article",
    publishedTime: notice.date,
  });
}

export default async function NoticePage({ params }: NoticePageProps) {
  const { locale, slug } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const notice = noticeBySlug(slug);

  if (!notice) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.news;
  const shared = t.shared;
  const related = noticesExcept(notice.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: notice.title,
    datePublished: notice.date,
    dateModified: notice.date,
    description: notice.summary,
    articleSection: page.categories[notice.category],
    url: absoluteUrl(localePath(locale, `/news/${notice.slug}`)),
    publisher: {
      "@type": "Organization",
      name: t.meta.siteName,
      url: absoluteUrl(localePath(locale)),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article>
        <header className="relative overflow-hidden bg-royal-950 pt-10 pb-14 text-ivory-100 md:pt-14 md:pb-18">
          <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.06]" />

          <div className="container-page relative">
            <Breadcrumbs
              label={t.ui.breadcrumb}
              tone="dark"
              items={[
                { label: shared.breadcrumbHome, href: localePath(locale) },
                { label: page.eyebrow, href: localePath(locale, "/news") },
                { label: notice.title },
              ]}
            />

            <div className="mt-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-gold-300">
                  {page.categories[notice.category]}
                </span>
                <span aria-hidden="true" className="h-2.5 w-px bg-ivory-100/30" />
                <time
                  dateTime={notice.date}
                  className="text-[0.6rem] uppercase tracking-[0.14em] text-ivory-200/85"
                >
                  {notice.dateLabel}
                </time>
              </div>

              <h1 className="display-1 mt-5 text-balance text-ivory-50">{notice.title}</h1>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-ivory-200/90">
                {notice.summary}
              </p>
            </div>
          </div>
        </header>

        <div className="bg-ivory-50 py-16 md:py-20">
          <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20">
            <div>
              <Prose paragraphs={notice.body} lead />

              <div className="mt-10 border-t border-charcoal-900/15 pt-6">
                <p className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
                  {shared.sourceLabel}
                </p>
                <p className="mt-2 text-[0.85rem] text-charcoal-700">{notice.source}</p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={localePath(locale, "/news")}
                  className="border-b border-gold-600/60 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 transition-colors hover:text-gold-700"
                >
                  {page.detailBack}
                </Link>
                <Link
                  href={localePath(locale, "/membership")}
                  className="border-b border-gold-600/60 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 transition-colors hover:text-gold-700"
                >
                  {shared.membershipCta}
                </Link>
              </div>
            </div>

            <aside>
              <FactGrid facts={notice.facts} />
              <p className="mt-6 text-[0.8rem] leading-relaxed text-charcoal-500">
                {page.detailSource}
              </p>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-charcoal-900/10 bg-ivory-100 py-16 md:py-20">
          <div className="container-page">
            <h2 className="display-3 text-balance text-charcoal-950">{page.detailRelated}</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {related.map((item) => (
                <NoticeCard
                  key={item.slug}
                  notice={item}
                  locale={locale}
                  readMore={shared.readMore}
                  categoryLabel={page.categories[item.category]}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
