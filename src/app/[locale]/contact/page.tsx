import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/editorial/contact-form";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection } from "@/components/editorial/section";
import { contact, telHref } from "@/content/contact";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/contact") : "/en/contact";

  return pageMetadata({
    title: "Contact",
    description: t.pages.contact.lede,
    path,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.contact;
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
        facts={[
          { label: "Email", value: contact.email },
          { label: "Telephone", value: contact.phones[0] },
          { label: "Regions", value: "Nigeria & diaspora" },
          { label: "Published", value: "2021" },
        ]}
      />

      <EditorialSection
        tone="white"
        title={page.channelsTitle}
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          <div className="bg-ivory-50 p-7 md:p-9">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
              {page.emailLabel}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 block break-words font-display text-[1.3rem] text-charcoal-950 underline decoration-gold-600/40 underline-offset-4 transition-colors hover:text-gold-700 md:text-[1.45rem]"
            >
              {contact.email}
            </a>
            <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-charcoal-600">
              {page.emailNote}
            </p>
          </div>

          <div className="bg-ivory-50 p-7 md:p-9">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
              {page.phoneLabel}
            </p>
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    className="text-[1rem] text-charcoal-900 transition-colors hover:text-gold-700"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-charcoal-600">
              {page.phoneNote}
            </p>
          </div>

          <div className="bg-ivory-50 p-7 md:p-9">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
              {page.groupLabel}
            </p>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-charcoal-600">
              {page.groupNote}
            </p>
            <a
              href={contact.whatsappGroup}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-block border border-charcoal-900/25 px-5 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 transition-colors hover:border-gold-600 hover:text-gold-700"
            >
              {page.groupCta}
            </a>
          </div>

          <div className="bg-ivory-50 p-7 md:p-9">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-charcoal-500">
              {page.addressTitle}
            </p>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-charcoal-600">
              {page.addressBody}
            </p>
          </div>
        </div>

        <p className="mt-6 text-[0.68rem] uppercase tracking-[0.16em] text-charcoal-500">
          {contact.publishedIn}
        </p>
      </EditorialSection>

      <EditorialSection tone="ivory" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <h2 className="display-2 text-balance text-charcoal-950">{page.formTitle}</h2>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-charcoal-600">
              {page.formIntro}
            </p>

            <div className="mt-9 border-t border-charcoal-900/15 pt-5">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-charcoal-500">
                {page.socialTitle}
              </p>
              <p className="mt-3 max-w-sm text-[0.85rem] leading-relaxed text-charcoal-500">
                {page.socialBody}
              </p>
            </div>
          </div>

          <ContactForm
            email={contact.email}
            labels={{
              formName: page.formName,
              formEmail: page.formEmail,
              formSubject: page.formSubject,
              formMessage: page.formMessage,
              formSubmit: page.formSubmit,
              formNote: page.formNote,
              formSubjects: page.formSubjects,
              formValidation: page.formValidation,
              formReady: page.formReady,
            }}
          />
        </div>
      </EditorialSection>
    </>
  );
}
