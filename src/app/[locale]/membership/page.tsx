import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/editorial/cta-band";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection, Prose } from "@/components/editorial/section";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { contact, telHref } from "@/content/contact";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type MembershipPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: MembershipPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/membership") : "/en/membership";

  return pageMetadata({
    title: "Membership",
    description: t.pages.membership.lede,
    path,
  });
}

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.membership;
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
        aside={
          <div className="border border-ivory-100/25 bg-royal-950/50 p-5 backdrop-blur-sm">
            <p className="text-[0.55rem] uppercase tracking-[0.22em] text-gold-300">
              {shared.statusLabel}
            </p>
            <p className="mt-2 font-display text-[1.25rem] text-ivory-50">
              {shared.statuses.inDevelopment}
            </p>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-ivory-200/85">
              {page.onlineStatusBody}
            </p>
          </div>
        }
      />

      <EditorialSection tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-2 text-balance">{page.eligibilityTitle}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <Prose paragraphs={[page.eligibilityBody]} lead className="mt-7" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-gold-600/40 bg-gold-100/40 p-6">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
                {page.statusTitle}
              </p>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-charcoal-700">
                {page.statusBody}
              </p>
            </div>
          </Reveal>
        </div>
      </EditorialSection>

      <EditorialSection
        tone="sand"
        bordered
        title={page.recordsTitle}
        lede={page.recordsIntro}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {page.records.map((record) => (
              <li
                key={record}
                className="flex items-start gap-3 border-b border-charcoal-900/10 py-3.5 text-[0.92rem] text-charcoal-700"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                <span>{record}</span>
              </li>
            ))}
          </ul>

          <div className="border-l-2 border-gold-600/50 pl-6">
            <h3 className="font-display text-[1.35rem] text-charcoal-950">
              {page.separationTitle}
            </h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal-600">
              {page.separationBody}
            </p>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection tone="white" title={page.processTitle}>
        <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {page.processSteps.map((item) => (
            <li key={item.step} className="flex h-full flex-col bg-ivory-50 p-6 md:p-7">
              <span className="font-display text-[1.7rem] leading-none text-gold-600/70">
                {item.step}
              </span>
              <h3 className="mt-5 font-display text-[1.25rem] leading-tight text-charcoal-950">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-charcoal-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <section className="bg-green-700 py-18 text-ivory-100 md:py-26">
        <div className="container-page grid gap-px overflow-hidden bg-ivory-100/15 md:grid-cols-2">
          <div className="bg-green-700 p-7 md:p-10">
            <span
              aria-hidden="true"
              className="block font-display text-[3rem] leading-none text-gold-300/80"
            >
              07
            </span>
            <h2 className="mt-4 font-display text-[1.6rem] text-ivory-50">{page.firstSevenTitle}</h2>
            <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-ivory-100/85">
              {page.firstSevenBody}
            </p>
          </div>

          <div className="bg-green-800 p-7 md:p-10">
            <h2 className="font-display text-[1.6rem] text-ivory-50">{page.privacyTitle}</h2>
            <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-ivory-100/85">
              {page.privacyBody}
            </p>
            <div className="mt-6 space-y-1.5 text-[0.9rem]">
              <a
                href={`mailto:${contact.email}`}
                className="block text-ivory-50 underline decoration-gold-500/50 underline-offset-4 hover:text-gold-300"
              >
                {contact.email}
              </a>
              <a
                href={telHref(contact.phones[0])}
                className="block text-ivory-100/90 hover:text-gold-300"
              >
                {contact.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <EditorialSection tone="ivory" size="compact">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_20rem] md:items-center md:gap-16">
          <div>
            <h2 className="display-3 text-balance text-charcoal-950">{page.onlineStatusTitle}</h2>
            <Prose paragraphs={[page.onlineStatusBody]} className="mt-4" />
          </div>
          <Link
            href={localePath(locale, "/contact")}
            className="justify-self-start border border-charcoal-900/25 px-6 py-3.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-900 transition-colors hover:border-gold-600 hover:text-gold-700 md:justify-self-end"
          >
            {shared.contactCta}
          </Link>
        </div>
      </EditorialSection>

      <CtaBand
        title={page.cta}
        body={page.ctaBody}
        primary={{ label: page.cta, href: `mailto:${contact.email}` }}
        secondary={{
          label: page.ctaSecondary,
          href: localePath(locale, "/news/the-igweagu-announcement"),
        }}
      />
    </>
  );
}
