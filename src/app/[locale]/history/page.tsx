import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, Prose } from "@/components/editorial/section";
import { RecordTimeline } from "@/components/editorial/timeline";
import { Reveal } from "@/components/ui/reveal";
import { pageHeroImages } from "@/content/page-images";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type HistoryPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: HistoryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/history") : "/en/history";

  return pageMetadata({
    title: "Our history",
    description: t.pages.history.lede,
    path,
    image: pageHeroImages.history.src,
    imageAlt: t.pages.history.imageAlt,
  });
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.history;
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
        image={{ ...pageHeroImages.history, alt: page.imageAlt }}
        facts={[
          { label: "The agenda begins", value: "1996" },
          { label: "Jubilee opened", value: "1 August 2021" },
          { label: "First official task", value: "9 October 2021" },
          { label: "The year carried", value: "2026" },
        ]}
        tone="charcoal"
      />

      <EditorialSection tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-2 max-w-2xl text-balance">{page.introTitle}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <Prose paragraphs={page.introParagraphs} lead className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <aside className="border-l-2 border-gold-500 pl-6 lg:mt-3">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {page.sourcesTitle}
              </p>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-charcoal-600">
                {page.sourcesBody}
              </p>
            </aside>
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection
        tone="sand"
        bordered
        title={page.timelineTitle}
        size="default"
      >
        <RecordTimeline entries={page.timeline.map((entry) => ({ ...entry }))} />
      </EditorialSection>

      <EditorialSection tone="white" title={page.figuresTitle} lede={page.figuresIntro}>
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {page.figures.map((figure, index) => (
            <Reveal key={figure.name} delay={index * 0.07}>
              <article className="flex h-full flex-col bg-ivory-50 p-7 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-full border border-gold-600/40 font-display text-[0.95rem] text-gold-700"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[8rem] text-right text-[0.52rem] uppercase leading-relaxed tracking-[0.18em] text-charcoal-500">
                    {figure.title}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[1.55rem] leading-tight text-balance text-charcoal-950 md:text-[1.8rem]">
                  {figure.name}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal-600">{figure.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      <section className="bg-ivory-100 py-18 md:py-26">
        <div className="container-page">
          <div className="grid gap-10 border border-gold-600/35 bg-gold-100/50 p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-14 md:p-10">
            <div>
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                Recorded, not resolved
              </p>
              <h2 className="display-3 mt-4 text-balance text-charcoal-950">
                {page.unsettledTitle}
              </h2>
            </div>
            <div className="space-y-4 text-[0.95rem] leading-relaxed text-charcoal-700">
              {page.unsettledParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link
                href={localePath(locale, "/membership")}
                className="inline-block pt-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-900 underline decoration-gold-700/60 underline-offset-4 transition-colors hover:text-gold-700"
              >
                {shared.membershipCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={page.cta}
        body={page.sourcesBody}
        primary={{ label: page.cta, href: localePath(locale, "/igweagu-udogu") }}
        secondary={{ label: shared.membershipCta, href: localePath(locale, "/membership") }}
        tone="charcoal"
      />
    </>
  );
}
