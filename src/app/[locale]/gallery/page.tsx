import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GalleryExplorer } from "@/components/editorial/gallery-explorer";
import { PageHero } from "@/components/editorial/page-hero";
import { EditorialSection } from "@/components/editorial/section";
import { galleryCategories, galleryImages } from "@/content/gallery";
import { isEnabledLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/page-meta";

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(isEnabledLocale(locale) ? locale : "en");
  const path = isEnabledLocale(locale) ? localePath(locale, "/gallery") : "/en/gallery";

  return pageMetadata({
    title: "Gallery & media",
    description: t.pages.gallery.lede,
    path,
  });
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const t = await getDictionary(locale);
  const page = t.pages.gallery;
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

      <section className="bg-ivory-50 py-14 md:py-20">
        <div className="container-page">
          <GalleryExplorer
            images={galleryImages}
            categories={galleryCategories}
            labels={{
              filterLabel: page.filterLabel,
              all: page.categories.all,
              categoryLabels: {
                ceremony: page.categories.ceremony,
                masquerade: page.categories.masquerade,
                festival: page.categories.festival,
                performance: page.categories.performance,
                community: page.categories.community,
              },
              lightboxLabel: page.lightboxLabel,
              closeLabel: shared.closeLabel,
              previousImage: shared.previousImage,
              nextImage: shared.nextImage,
              captionLabel: page.captionLabel,
              licenceLabel: shared.licenceLabel,
              sourceLabel: shared.sourceLabel,
              photograph: page.imageCount,
            }}
          />
        </div>
      </section>

      <EditorialSection tone="sand" bordered>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
          <h2 className="display-3 text-balance text-charcoal-950">{page.noteTitle}</h2>
          <div>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-charcoal-600">
              {page.noteBody}
            </p>
            <Link
              href={localePath(locale, "/credits")}
              className="mt-6 inline-block border-b border-gold-600/60 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-800 transition-colors hover:text-gold-700"
            >
              {page.noteCta}
            </Link>
          </div>
        </div>
      </EditorialSection>
    </>
  );
}
