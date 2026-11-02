import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { heritageImages } from "@/content/media";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeritageProps = {
  heritage: Dictionary["heritage"];
};

export function Heritage({ heritage }: HeritageProps) {
  return (
    <section id="heritage" aria-labelledby="heritage-heading" className="bg-ivory-100 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="heritage-heading"
            eyebrow={heritage.eyebrow}
            title={heritage.heading}
            lede={heritage.lede}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {heritage.pillars.map((pillar, index) => {
            const image = heritageImages[index];

            return (
              <Reveal key={pillar.term} delay={index * 0.08}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory-200">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-charcoal-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col border-t border-charcoal-900/15 pt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[1.7rem] leading-none text-charcoal-950">
                        {pillar.term}
                      </h3>
                      <span className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-gold-700">
                        {pillar.gloss}
                      </span>
                    </div>
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-charcoal-500">
                      {pillar.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-[0.7rem] leading-relaxed text-charcoal-500">{heritage.footnote}</p>
      </div>
    </section>
  );
}
