import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection } from "@/components/editorial/section";
import { Reveal } from "@/components/ui/reveal";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type VisionPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: VisionPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale)
    ? localePath(locale, "/vision-mission")
    : "/en/vision-mission";

  return pageMetadata({
    title: "Vision, mission & objectives",
    description: t.pages.vision.lede,
    path,
  });
}

export default async function VisionMissionPage({ params }: VisionPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.vision;
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
        tone="green"
      />

      <section className="bg-ivory-50 py-18 md:py-26">
        <div className="container-page grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col bg-ivory-50 p-8 md:p-12">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold-700">
                {page.visionLabel}
              </p>
              <p className="mt-8 font-display text-[1.9rem] leading-[1.2] text-balance text-charcoal-950 md:text-[2.5rem]">
                {page.visionBody}
              </p>
              <span aria-hidden="true" className="mt-auto block h-px w-16 bg-gold-600/60 pt-8" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden bg-green-700 p-8 text-ivory-100 md:p-12">
              <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.08]" />
              <div className="relative flex h-full flex-col">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold-300">
                  {page.missionLabel}
                </p>
                <p className="mt-8 font-display text-[1.6rem] leading-[1.3] text-balance text-ivory-50 md:text-[2rem]">
                  {page.missionBody}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <EditorialSection
        tone="ivory"
        bordered
        title={page.objectivesTitle}
        lede={page.objectivesIntro}
      >
        <ol className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {page.objectives.map((objective, index) => (
            <li key={objective.title} className="border-t border-charcoal-900/20 pt-5">
              <Reveal delay={(index % 2) * 0.06}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[1.05rem] text-gold-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.45rem] leading-tight text-charcoal-950">
                      {objective.title}
                    </h3>
                    <p className="mt-2.5 max-w-md text-[0.95rem] leading-relaxed text-charcoal-600">
                      {objective.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        tone="white"
        title={page.principlesTitle}
        lede={page.principlesIntro}
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {page.principles.map((principle, index) => (
            <div key={principle.title} className="flex h-full flex-col bg-ivory-50 p-6 md:p-7">
              <span className="font-display text-[2rem] leading-none text-gold-600/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[1.3rem] leading-tight text-charcoal-950">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-charcoal-600">
                {principle.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-l-2 border-charcoal-900/25 pl-6 md:ml-auto md:max-w-xl">
          <div>
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-charcoal-500">
              {page.noteTitle}
            </p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal-600">{page.noteBody}</p>
          </div>
        </div>
      </EditorialSection>

      <CtaBand
        title={page.cta}
        body={page.missionBody}
        primary={{ label: page.cta, href: localePath(locale, "/history") }}
        secondary={{ label: shared.membershipCta, href: localePath(locale, "/membership") }}
      />
    </>
  );
}
