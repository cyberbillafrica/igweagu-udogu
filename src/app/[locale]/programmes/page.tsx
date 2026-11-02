import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, Prose } from "@/components/editorial/section";
import { StatusPill, type RecordStatus } from "@/components/editorial/status-pill";
import { Reveal } from "@/components/ui/reveal";
import { pageHeroImages } from "@/content/page-images";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type ProgrammesPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: ProgrammesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/programmes") : "/en/programmes";

  return pageMetadata({
    title: "Programmes & initiatives",
    description: t.pages.programmes.lede,
    path,
    image: pageHeroImages.programmes.src,
    imageAlt: t.pages.programmes.imageAlt,
  });
}

export default async function ProgrammesPage({ params }: ProgrammesPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.programmes;
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
        image={{ ...pageHeroImages.programmes, alt: page.imageAlt }}
      />

      <EditorialSection
        tone="white"
        title={page.mandateTitle}
        lede={page.mandateIntro}
        aside={
          <p className="border-l-2 border-charcoal-900/20 pl-5 text-[0.8rem] leading-relaxed text-charcoal-500">
            {page.statusLegend}
          </p>
        }
      >
        <ol className="border-t border-charcoal-900/15">
          {page.mandate.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05}>
                <div className="grid gap-4 border-b border-charcoal-900/10 py-7 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                  <span className="font-display text-[1rem] text-gold-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight text-charcoal-950 md:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-charcoal-600">
                      {item.body}
                    </p>
                  </div>
                  <StatusPill
                    status={item.status as RecordStatus}
                    label={shared.statuses[item.status as keyof typeof shared.statuses]}
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        tone="sand"
        bordered
        title={page.culturalTitle}
        lede={page.culturalIntro}
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {page.cultural.map((item) => (
            <div key={item.title} className="flex h-full flex-col bg-ivory-50 p-7">
              <StatusPill
                status={item.status as RecordStatus}
                label={shared.statuses[item.status as keyof typeof shared.statuses]}
              />
              <h3 className="mt-6 font-display text-[1.35rem] leading-tight text-charcoal-950">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal-600">{item.body}</p>
            </div>
          ))}
        </div>
      </EditorialSection>

      <section className="bg-royal-950 py-18 text-ivory-100 md:py-26">
        <div className="container-page grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
          <div>
            <span
              aria-hidden="true"
              className="block font-display text-[7rem] leading-[0.8] text-gold-500/30 md:text-[9rem]"
            >
              7
            </span>
            <p className="mt-4 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-300">
              Months · first phase
            </p>
          </div>
          <div>
            <h2 className="display-2 text-balance text-ivory-50">{page.phaseTitle}</h2>
            <Prose paragraphs={page.phaseParagraphs} tone="dark" className="mt-6" />
          </div>
        </div>
      </section>

      <CtaBand
        title={page.cta}
        body={page.ctaBody}
        primary={{ label: page.cta, href: localePath(locale, "/contact") }}
        secondary={{ label: shared.membershipCta, href: localePath(locale, "/membership") }}
        tone="green"
      />
    </>
  );
}
