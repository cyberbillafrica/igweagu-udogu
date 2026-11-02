import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, Prose, PullQuote } from "@/components/editorial/section";
import { Reveal } from "@/components/ui/reveal";
import { pageHeroImages } from "@/content/page-images";
import { organisation } from "@/content/organisation";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/about") : "/en/about";

  return pageMetadata({
    title: "About the house",
    description: t.pages.about.lede,
    path,
    image: pageHeroImages.about.src,
    imageAlt: t.pages.about.imageAlt,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.about;
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
        image={{ ...pageHeroImages.about, alt: page.imageAlt }}
        facts={[
          { label: "The agenda begins", value: "1996" },
          { label: "The generation", value: organisation.generationYears },
          { label: "Structure", value: "By senatorial zone" },
          { label: "The jubilee year", value: String(organisation.jubileeYear) },
        ]}
      />

      <EditorialSection tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-2 max-w-2xl text-balance">{page.whoTitle}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <Prose paragraphs={page.whoParagraphs} lead className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:pt-3">
            <div className="border border-line bg-ivory-100 p-6">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {page.recordLabel}
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-charcoal-600">
                {page.recordBody}
              </p>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.82rem]">
                <div className="flex justify-between gap-4">
                  <dt className="uppercase tracking-[0.16em] text-charcoal-500">House</dt>
                  <dd className="text-right font-medium text-charcoal-900">
                    {organisation.nameLines[0]}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="uppercase tracking-[0.16em] text-charcoal-500">Motto</dt>
                  <dd className="text-right font-medium text-charcoal-900">
                    {organisation.motto}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection
        tone="sand"
        bordered
        title={page.nameTitle}
        lede={page.nameIntro}
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {page.nameItems.map((item, index) => (
            <Reveal key={item.term} delay={index * 0.05}>
              <div className="flex h-full flex-col bg-ivory-50 p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.9rem] leading-none text-charcoal-950">
                    {item.term}
                  </h3>
                  <span className="text-[0.52rem] uppercase tracking-[0.2em] text-charcoal-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-charcoal-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        tone="white"
        eyebrow={organisation.motto}
        title={page.purposeTitle}
        lede={page.purposeIntro}
      >
        <div className="grid gap-10 sm:grid-cols-2 md:gap-12">
          {page.purposes.map((purpose, index) => (
            <Reveal key={purpose.title} delay={index * 0.06}>
              <article className="border-t border-charcoal-900/20 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.6rem] leading-tight text-charcoal-950">
                    {purpose.title}
                  </h3>
                  <span className="font-display text-[0.95rem] text-gold-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-charcoal-600">
                  {purpose.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      <section className="relative overflow-hidden bg-green-700 py-18 text-ivory-100 md:py-26">
        <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.07]" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow--on-dark">Ndi Igbo</p>
            <PullQuote
              quote="Onye aghala nwanne ya."
              attribution="Let no one leave a brother behind"
              source="Igbo proverb"
              tone="dark"
              className="mt-7"
            />
          </div>
          <Prose
            tone="dark"
            className="lg:pt-2"
            paragraphs={[
              "The house places itself inside a much older inheritance: the towns and villages of Igboland, the institutions that govern them, and the language that carries them.",
              "Its work is framed as a duty to that inheritance — not a break from it. The pages on Igbo heritage set out the customs and institutions the house keeps close.",
            ]}
          />
        </div>
      </section>

      <EditorialSection tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-2 text-balance">{page.orderTitle}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Prose paragraphs={page.orderParagraphs} className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-charcoal-900/15 bg-ivory-50 p-7 md:p-9">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {page.recordLabel}
              </p>
              <p className="mt-4 font-display text-[1.3rem] leading-snug text-charcoal-900">
                {page.recordBody}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={localePath(locale, "/history")}
                  className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-700 underline decoration-gold-600/50 underline-offset-4 transition-colors hover:text-gold-700"
                >
                  {page.ctaHistory}
                </a>
                <a
                  href={localePath(locale, "/membership")}
                  className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-700 underline decoration-gold-600/50 underline-offset-4 transition-colors hover:text-gold-700"
                >
                  {page.ctaMembership}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </EditorialSection>

      <CtaBand
        title={page.ctaMembership}
        body={page.ctaBody}
        primary={{ label: page.ctaMembership, href: localePath(locale, "/membership") }}
        secondary={{ label: page.ctaHistory, href: localePath(locale, "/history") }}
      />
    </>
  );
}
