import Link from "next/link";

import { NoticeCard } from "@/components/editorial/cards";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { notices } from "@/content/records";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type NewsProps = {
  news: Dictionary["news"];
  locale: Locale;
};

export function News({ news, locale }: NewsProps) {
  return (
    <section id="news" aria-labelledby="news-heading" className="bg-ivory-50 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              id="news-heading"
              eyebrow={news.eyebrow}
              title={news.heading}
              lede={news.lede}
            />
          </Reveal>
          <Link
            href={localePath(locale, "/news")}
            className="shrink-0 border-b border-gold-600/50 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-charcoal-700 transition-colors hover:text-gold-700"
          >
            {news.viewAll}
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {notices.map((notice, index) => (
            <Reveal key={notice.slug} delay={index * 0.08}>
              <NoticeCard
                notice={notice}
                locale={locale}
                readMore={news.readMore}
                categoryLabel={news.categories[notice.category]}
              />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-[0.7rem] leading-relaxed text-charcoal-500">
          {news.footnote}
        </p>
      </div>
    </section>
  );
}
