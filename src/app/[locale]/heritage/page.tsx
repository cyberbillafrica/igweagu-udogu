import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, Prose } from "@/components/editorial/section";
import { Reveal } from "@/components/ui/reveal";
import { heritageImages } from "@/content/media";
import { pageHeroImages } from "@/content/page-images";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/page-meta";

type HeritagePageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: HeritagePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/heritage") : "/en/heritage";

  return pageMetadata({
    title: "Igbo heritage",
    description: t.pages.heritage.lede,
    path,
  });
}

export default async function HeritagePage({ params }: HeritagePageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.heritage;
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
        image={{ ...pageHeroImages.heritage, alt: page.imageAlt }}
        tone="charcoal"
      />

      <EditorialSection
        tone="white"
        title={page.pillarsTitle}
      >
        <div className="space-y-14 md:space-y-20">
          {page.pillars.map((pillar, index) => {
            const image = heritageImages[index];
            const reversed = index % 2 === 1;

            return (
              <Reveal key={pillar.term}>
                <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <div className={cn("relative aspect-[4/3] overflow-hidden bg-ivory-200", reversed && "md:order-2")}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>

                  <div className={cn(reversed && "md:order-1")}>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold-700">
                      {pillar.gloss}
                    </p>
                    <h3 className="mt-4 font-display text-[2.4rem] leading-none text-charcoal-950 md:text-[3rem]">
                      {pillar.term}
                    </h3>
                    <span aria-hidden="true" className="mt-6 block h-px w-14 bg-gold-600/60" />
                    <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-charcoal-600">
                      {pillar.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </EditorialSection>

      <EditorialSection
        tone="ivory"
        bordered
        title={page.institutionsTitle}
        lede={page.institutionsIntro}
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {page.institutions.map((institution, index) => (
            <div key={institution.title} className="flex h-full flex-col bg-ivory-50 p-7 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.4rem] leading-tight text-charcoal-950">
                  {institution.title}
                </h3>
                <span className="text-[0.52rem] uppercase tracking-[0.18em] text-charcoal-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal-600">
                {institution.body}
              </p>
            </div>
          ))}
        </div>
      </EditorialSection>

      <section className="bg-green-700 py-18 text-ivory-100 md:py-26">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow eyebrow--on-dark">{page.eyebrow}</p>
              <h2 className="display-2 mt-5 text-balance text-ivory-50">
                {page.ceremoniesTitle}
              </h2>
            </div>
            <p className="text-[0.9rem] leading-relaxed text-ivory-200/85">
              {page.ceremoniesIntro}
            </p>
          </div>

          <dl className="mt-12 grid gap-x-14 gap-y-8 border-t border-ivory-100/20 pt-8 md:grid-cols-2">
            {page.ceremonies.map((ceremony) => (
              <div key={ceremony.title} className="border-b border-ivory-100/10 pb-7 last:border-b-0">
                <dt className="font-display text-[1.5rem] leading-tight text-ivory-50">
                  {ceremony.title}
                </dt>
                <dd className="mt-2.5 max-w-md text-[0.92rem] leading-relaxed text-ivory-200/85">
                  {ceremony.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <EditorialSection tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{page.eyebrow}</p>
            <h2 className="display-2 mt-5 text-balance">{page.languageTitle}</h2>
            <p
              aria-hidden="true"
              className="mt-8 font-display text-[3.4rem] leading-none text-charcoal-900/10 md:text-[5rem]"
            >
              Asụsụ Igbo
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Prose paragraphs={page.languageParagraphs} />
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection tone="sand" bordered>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
          <div>
            <h2 className="display-3 text-balance text-charcoal-950">{page.eriTitle}</h2>
          </div>
          <div>
            <Prose paragraphs={page.eriParagraphs} />
            <p className="mt-7 max-w-xl border-l-2 border-gold-600/50 pl-5 text-[0.82rem] leading-relaxed text-charcoal-500">
              {page.noteBody}
            </p>
          </div>
        </div>
      </EditorialSection>

      <CtaBand
        title={page.cta}
        body={page.ctaBody}
        primary={{ label: page.cta, href: localePath(locale, "/gallery") }}
        secondary={{ label: shared.contactCta, href: localePath(locale, "/contact") }}
        tone="green"
      />
    </>
  );
}
