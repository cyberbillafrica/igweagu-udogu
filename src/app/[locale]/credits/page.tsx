import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { galleryImages } from "@/content/gallery";
import { allCreditedMedia } from "@/content/media";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type CreditsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export const metadata: Metadata = {
  title: "Photography credits",
  description:
    "Attribution for the cultural photography used on the Igweagu Udogu Igbonine Gbulugbulu website.",
  robots: { index: false, follow: true },
};

export default async function CreditsPage({ params }: CreditsPageProps) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  const credited = [
    ...allCreditedMedia.map((asset) => ({ src: asset.src, alt: asset.alt, credit: asset.credit })),
    ...galleryImages.map((image) => ({ src: image.src, alt: image.alt, credit: image.credit })),
  ].filter((entry, index, list) => list.findIndex((item) => item.src === entry.src) === index);

  return (
    <div className="bg-ivory-100 py-16 md:py-24">
      <div className="container-page max-w-4xl">
        <p className="eyebrow">{t.creditsPage.eyebrow}</p>
        <h1 className="display-2 mt-5">{t.creditsPage.title}</h1>
        <p className="lede mt-6 max-w-2xl">{t.creditsPage.lede}</p>

        <ul className="mt-12 divide-y divide-charcoal-900/10 border-y border-charcoal-900/10">
          {credited.map((asset) => (
            <li key={asset.src} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <p className="font-display text-[1.15rem] text-charcoal-950">{asset.alt}</p>
                <p className="mt-2 text-[0.8rem] text-charcoal-500">{asset.credit.author}</p>
                <a
                  href={asset.credit.sourceUrl}
                  className="mt-1 inline-block text-[0.72rem] text-gold-700 underline decoration-gold-600/40 underline-offset-4 hover:text-charcoal-900"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {t.creditsPage.sourceLabel}: Wikimedia Commons
                </a>
              </div>
              <a
                href={asset.credit.licenceUrl}
                rel="noreferrer noopener license"
                target="_blank"
                className="justify-self-start border border-charcoal-900/15 px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.18em] text-charcoal-500 hover:border-gold-500 hover:text-gold-700 sm:justify-self-end"
              >
                {t.creditsPage.licenceLabel}: {asset.credit.licence}
              </a>
            </li>
          ))}
        </ul>

        <ButtonLink href={localePath(locale)} variant="outlineDark" className="mt-12">
          {t.notFound.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
