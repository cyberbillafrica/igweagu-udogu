import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Events } from "@/components/home/events";
import { Heritage } from "@/components/home/heritage";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Jubilee } from "@/components/home/jubilee";
import { Leadership } from "@/components/home/leadership";
import { MembershipCta } from "@/components/home/membership-cta";
import { News } from "@/components/home/news";
import { StoryTimeline } from "@/components/home/story-timeline";
import { VisionMission } from "@/components/home/vision-mission";
import { organisation } from "@/content/organisation";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, siteUrl } from "@/lib/site";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * The shell is fully static per locale, so resolving `params` up front is the
 * correct trade-off here: no loading placeholder is needed and there is no
 * data fetch to stream.
 */
export const instant = false;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale) : "/en";

  return {
    title: { absolute: dictionary.meta.title },
    description: dictionary.meta.description,
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organisation.name,
    alternateName: "The New Covenant · Ndi Gboo",
    url: siteUrl,
    logo: `${siteUrl}/brand/igweagu-emblem.jpg`,
    foundingDate: String(organisation.foundingYear),
    slogan: organisation.motto,
    knowsLanguage: ["en", "ig"],
    description: t.meta.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero locale={locale} hero={t.hero} />
      <Intro intro={t.intro} />
      <StoryTimeline story={t.story} />
      <VisionMission vision={t.vision} />
      <Jubilee jubilee={t.jubilee} />
      <Heritage heritage={t.heritage} />
      <Leadership leadership={t.leadership} />
      <News news={t.news} locale={locale} />
      <Events events={t.events} locale={locale} />
      <MembershipCta locale={locale} membership={t.membership} />
    </>
  );
}
