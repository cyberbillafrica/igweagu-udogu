import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, Prose } from "@/components/editorial/section";
import { Reveal } from "@/components/ui/reveal";
import { contact, telHref } from "@/content/contact";
import { pageHeroImages } from "@/content/page-images";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type LeadershipPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: LeadershipPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/leadership") : "/en/leadership";

  return pageMetadata({
    title: "Leadership & structure",
    description: t.pages.leadership.lede,
    path,
    image: pageHeroImages.leadership.src,
    imageAlt: t.pages.leadership.imageAlt,
  });
}

export default async function LeadershipPage({ params }: LeadershipPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.leadership;
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
        image={{ ...pageHeroImages.leadership, alt: page.imageAlt }}
        facts={[
          { label: "Signatories of 2021", value: "Four custodians" },
          { label: "Zonal structure", value: "First seven per zone" },
          { label: "Other offices", value: "Not yet published" },
          { label: "Records", value: "By the house" },
        ]}
      />

      <EditorialSection
        tone="white"
        title={page.signatoriesTitle}
        lede={page.signatoriesIntro}
      >
        <ul className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {page.signatories.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.05}>
              <li className="flex h-full flex-col bg-ivory-50 p-7 md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-full border border-gold-600/40 font-display text-[0.8rem] text-gold-700"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[1.5rem] leading-tight text-balance text-charcoal-950">
                  {person.name}
                </h3>
                <p className="mt-2 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold-700">
                  {person.title}
                </p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-charcoal-600">{person.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl border-l-2 border-charcoal-900/20 pl-5 text-[0.82rem] leading-relaxed text-charcoal-500">
          {page.signatoriesNote}
        </p>
      </EditorialSection>

      <EditorialSection tone="sand" bordered>
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <span
              aria-hidden="true"
              className="block font-display text-[7rem] leading-[0.8] text-gold-600/30 md:text-[9rem]"
            >
              07
            </span>
            <p className="mt-4 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
              {page.zonesFactLabel}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-2 text-balance">{page.zonesTitle}</h2>
            <Prose paragraphs={page.zonesParagraphs} className="mt-7" />
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection tone="white">
        <div className="grid gap-8 border border-line bg-ivory-100 p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14 md:p-10">
          <div>
            <h2 className="display-3 text-balance text-charcoal-950">{page.secretariatTitle}</h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-charcoal-600">
              {page.secretariatBody}
            </p>
          </div>

          <div className="space-y-5 border-t border-line pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
                {shared.emailLabel}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1.5 block text-[0.98rem] text-charcoal-900 underline decoration-gold-600/50 underline-offset-4 transition-colors hover:text-gold-700"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
                {shared.telephoneLabel}
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-charcoal-800">
                {contact.phones.map((phone) => (
                  <li key={phone}>
                    <a href={telHref(phone)} className="transition-colors hover:text-gold-700">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-charcoal-500">
              {contact.publishedIn}
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-2xl border-l-2 border-gold-600/50 pl-5">
          <h2 className="font-display text-[1.35rem] text-charcoal-950">
            {page.appointmentsTitle}
          </h2>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal-600">
            {page.appointmentsBody}
          </p>
        </div>
      </EditorialSection>

      <CtaBand
        title={page.cta}
        body={page.ctaBody}
        primary={{ label: page.cta, href: localePath(locale, "/contact") }}
        secondary={{ label: shared.membershipCta, href: localePath(locale, "/membership") }}
        tone="charcoal"
      />
    </>
  );
}
