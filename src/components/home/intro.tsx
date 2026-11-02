import { DiamondRule } from "@/components/ui/ornament";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/get-dictionary";

type IntroProps = {
  intro: Dictionary["intro"];
};

export function Intro({ intro }: IntroProps) {
  return (
    <section
      id="story"
      aria-labelledby="intro-heading"
      className="relative overflow-hidden bg-ivory-100 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 hidden h-72 w-72 motif opacity-[0.05] lg:block"
      />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{intro.eyebrow}</p>
            <h2 id="intro-heading" className="display-2 mt-5 max-w-md">
              {intro.heading}
            </h2>
            <DiamondRule className="mt-10 max-w-[13rem]" />

            <figure className="mt-10 border-l border-gold-600/40 pl-6">
              <blockquote className="font-display text-[1.7rem] leading-snug text-charcoal-900">
                “{intro.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-charcoal-500">
                {intro.quoteTranslation}
                <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.24em] text-gold-700">
                  {intro.quoteAttribution}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-6 lg:pt-4">
            {intro.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.08 * index}>
                <p className="text-[1rem] leading-[1.85] text-charcoal-700 md:text-[1.06rem]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
