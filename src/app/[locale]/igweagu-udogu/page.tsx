import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, FactGrid, Prose } from "@/components/editorial/section";
import { Reveal } from "@/components/ui/reveal";
import { pageHeroImages } from "@/content/page-images";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type IgweaguPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: IgweaguPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale)
    ? localePath(locale, "/igweagu-udogu")
    : "/en/igweagu-udogu";

  return pageMetadata({
    title: "Igweagu Udogu",
    description: t.pages.igweagu.lede,
    path,
    image: pageHeroImages.igweagu.src,
    imageAlt: t.pages.igweagu.imageAlt,
  });
}

export default async function IgweaguPage({ params }: IgweaguPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.igweagu;
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
        image={{ ...pageHeroImages.igweagu, alt: page.imageAlt }}
        facts={[
          { label: "The golden age", value: "50 years" },
          { label: "First phase", value: "7 months" },
          { label: "The year carried", value: "2026" },
          { label: "The rule", value: "First seven per zone" },
        ]}
      />

      <section className="relative overflow-hidden bg-royal-950 py-18 text-ivory-100 md:py-26">
        <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.08]" />
        <div className="container-page relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow eyebrow--on-dark">{page.prophecyTitle}</p>
              <blockquote className="mt-7 max-w-3xl font-display text-[1.65rem] leading-[1.28] text-balance text-ivory-50 md:text-[2.4rem]">
                “{page.prophecyBody}”
              </blockquote>
            </div>
            <p className="border-l border-gold-500/50 pl-5 text-[0.82rem] leading-relaxed text-ivory-200/85">
              {page.prophecyNote}
            </p>
          </div>
        </div>
      </section>

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

          <Reveal delay={0.1} className="lg:pt-2">
            <div className="border border-gold-600/40 bg-gold-100/40 p-6">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {page.discrepancyLabel}
              </p>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-charcoal-700">
                {page.discrepancyBody}
              </p>
            </div>
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection tone="sand" bordered>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">{page.goldenTitle}</p>
              <h2 className="display-2 mt-5 text-balance">A jubilee, measured in fifty years.</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <Prose paragraphs={page.goldenParagraphs} className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <FactGrid
              facts={page.goldenFacts.map((fact) => ({ label: fact.label, value: fact.value }))}
              className="sm:grid-cols-1"
            />
          </Reveal>
        </div>
      </EditorialSection>

      <section className="bg-green-700 py-18 text-ivory-100 md:py-26">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="eyebrow eyebrow--on-dark">{page.mandateTitle}</p>
            <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ivory-200/90">
              {page.mandateBody}
            </p>
          </div>

          <ul className="divide-y divide-ivory-100/15 border-y border-ivory-100/15">
            {page.mandateItems.map((item, index) => (
              <li key={item} className="flex items-baseline gap-5 py-5">
                <span className="font-display text-[0.95rem] text-gold-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[1rem] leading-snug text-ivory-50">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EditorialSection tone="ivory">
        <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="relative">
              <span
                aria-hidden="true"
                className="block font-display text-[8rem] leading-[0.8] text-gold-600/25 md:text-[11rem]"
              >
                7
              </span>
              <p className="mt-4 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {page.sevenTitle}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-3 text-balance text-charcoal-950">{page.sevenTitle}</h2>
            <Prose paragraphs={[page.sevenBody]} className="mt-5" />
            <p className="mt-6 max-w-2xl border-l-2 border-charcoal-900/20 pl-5 text-[0.85rem] leading-relaxed text-charcoal-500">
              {page.sevenNote}
            </p>
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection tone="white" bordered>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_20rem] md:items-center md:gap-16">
          <div>
            <h2 className="display-3 text-balance text-charcoal-950">{page.identifyTitle}</h2>
            <Prose paragraphs={[page.identifyBody]} className="mt-5" />
          </div>
          <div className="border border-line bg-ivory-100 p-6">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-charcoal-500">
              {shared.statusLabel}
            </p>
            <p className="mt-3 font-display text-[1.25rem] text-charcoal-950">
              {shared.statuses.announced}
            </p>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-charcoal-600">
              {t.pages.membership.onlineStatusBody}
            </p>
          </div>
        </div>
      </EditorialSection>

      <CtaBand
        title={page.cta}
        body={page.ctaBody}
        primary={{ label: page.cta, href: localePath(locale, "/membership") }}
        secondary={{ label: page.ctaSecondary, href: localePath(locale, "/news/the-igweagu-announcement") }}
        tone="royal"
      />
    </>
  );
}
