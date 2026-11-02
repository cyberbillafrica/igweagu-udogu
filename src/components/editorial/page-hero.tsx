import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/editorial/breadcrumbs";
import { cn } from "@/lib/cn";

type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  breadcrumbs: Crumb[];
  breadcrumbLabel: string;
  image?: HeroImage;
  facts?: readonly { label: string; value: string }[];
  aside?: ReactNode;
  tone?: "royal" | "charcoal" | "green";
};

const tones = {
  royal: "from-royal-950 via-royal-950/88 to-royal-900/55",
  charcoal: "from-charcoal-950 via-charcoal-950/90 to-charcoal-900/60",
  green: "from-green-900 via-green-900/90 to-green-800/60",
} as const;

/**
 * Interior-page masthead. With a photograph it is an image-led editorial
 * opening; without one it becomes a quiet typographic band, so the interior
 * pages do not all open the same way.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  breadcrumbLabel,
  image,
  facts,
  aside,
  tone = "royal",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-royal-950 text-ivory-100">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className={cn("absolute inset-0 bg-gradient-to-t", tones[tone])}
          />
          <div aria-hidden="true" className="absolute inset-0 grain" />
        </>
      ) : (
        <>
          <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.06]" />
          <div
            aria-hidden="true"
            className={cn("absolute inset-0 bg-gradient-to-br", tones[tone], "opacity-90")}
          />
        </>
      )}

      <div
        className={cn(
          "container-page relative flex flex-col",
          image
            ? "min-h-[27rem] justify-end pb-10 pt-24 md:min-h-[34rem] md:pb-12 md:pt-32"
            : "pb-14 pt-14 md:pb-20 md:pt-20",
        )}
      >
        <Breadcrumbs
          label={breadcrumbLabel}
          items={breadcrumbs}
          tone="dark"
          className="mb-8 md:mb-10"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow--on-dark">{eyebrow}</p>
            <h1 className="display-1 mt-5 max-w-3xl text-balance text-ivory-50">{title}</h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-ivory-200/90 md:text-[1.1rem]">
              {lede}
            </p>
          </div>

          {aside ? <div className="max-w-sm lg:justify-self-end">{aside}</div> : null}
        </div>

        {facts && facts.length > 0 ? (
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ivory-100/20 pt-6 sm:grid-cols-4 md:mt-14">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.55rem] uppercase tracking-[0.22em] text-ivory-200/75">
                  {fact.label}
                </dt>
                <dd className="mt-2 break-words font-display text-[1.05rem] leading-tight text-ivory-50">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
