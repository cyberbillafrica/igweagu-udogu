import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { media } from "@/content/media";
import type { Dictionary } from "@/i18n/get-dictionary";

type JubileeProps = {
  jubilee: Dictionary["jubilee"];
};

export function Jubilee({ jubilee }: JubileeProps) {
  return (
    <section
      aria-labelledby="jubilee-heading"
      className="relative overflow-hidden bg-royal-950 text-ivory-100"
    >
      <div className="container-page grid items-center gap-14 py-20 md:py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow eyebrow--on-dark">{jubilee.eyebrow}</p>

          <div className="mt-6 inline-flex items-center gap-3 border border-gold-500/35 px-4 py-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold-300">
              {jubilee.badge}
            </span>
          </div>

          <h2
            id="jubilee-heading"
            className="display-2 mt-6 max-w-xl text-ivory-50"
          >
            {jubilee.heading}
          </h2>

          <div className="mt-7 max-w-xl space-y-5">
            {jubilee.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[0.98rem] leading-[1.85] text-ivory-200/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ivory-100/15 pt-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[1.5rem] leading-none text-gold-300">
                {jubilee.fromYear}
              </span>
              <span aria-hidden="true" className="text-ivory-300/40">
                →
              </span>
              <span className="font-display text-[1.5rem] leading-none text-ivory-50">
                {jubilee.toYear}
              </span>
            </div>
            <div>
              <p className="text-[0.5rem] uppercase tracking-[0.22em] text-ivory-300/75">
                {jubilee.recordLabel}
              </p>
              <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-ivory-200/75">
                {jubilee.recordValue}
              </p>
            </div>
          </div>

          <ButtonLink
            href="#story"
            anchor
            variant="outlineLight"
            className="mt-9"
            withArrow={false}
          >
            {jubilee.cta}
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold-500/25 md:block"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={media.jubilee.src}
                alt={media.jubilee.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-royal-950/70 via-transparent to-royal-950/10"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-5 left-6 font-display text-[3.4rem] leading-none text-ivory-50/85 md:text-[4rem]"
              >
                50
                <span className="ml-2 align-middle text-[0.55rem] uppercase tracking-[0.24em] text-gold-300">
                  {jubilee.yearsLabel}
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
