"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { ArrowDownIcon } from "@/components/ui/icons";
import { media } from "@/content/media";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ locale, hero }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.001 : 0.9, delay: reduceMotion ? 0 : delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end overflow-hidden bg-royal-950"
    >
      <Image
        src={media.hero.src}
        alt={media.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] opacity-[0.88] [animation:hero-zoom_26s_ease-out_forwards]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(104deg,rgba(6,22,44,0.95)_0%,rgba(6,22,44,0.82)_38%,rgba(11,42,87,0.46)_70%,rgba(6,22,44,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/20 to-royal-950/35"
      />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pt-16 pb-10 md:pt-20 md:pb-12">
        <motion.p {...rise(0.1)} className="eyebrow eyebrow--on-dark">
          {hero.eyebrow}
        </motion.p>

        <h1
          id="hero-title"
          aria-label={hero.titleLines.join(" ")}
          className="display-1 mt-6 max-w-4xl text-ivory-50 [text-shadow:0_2px_40px_rgba(6,22,44,0.35)]"
        >
          {hero.titleLines.map((line, index) => (
            <span key={line} className="block overflow-hidden py-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: reduceMotion ? "0%" : "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: reduceMotion ? 0.001 : 1.05,
                  delay: reduceMotion ? 0 : 0.18 + index * 0.11,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          {...rise(0.58)}
          className="mt-8 max-w-[38rem] text-[1rem] leading-[1.78] text-ivory-200/85 md:text-[1.09rem]"
        >
          {hero.lede}
        </motion.p>

        <motion.div {...rise(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={localePath(locale, "/membership")}>{hero.primaryCta}</ButtonLink>
          <ButtonLink href="#story" anchor variant="outlineLight" withArrow={false}>
            {hero.secondaryCta}
          </ButtonLink>
        </motion.div>
      </div>

      <motion.div
        {...rise(0.85)}
        className="relative z-10 border-t border-ivory-100/15 bg-royal-950/35 backdrop-blur-[2px]"
      >
        <div className="container-page flex items-stretch">
          <dl className="grid flex-1 grid-cols-3 divide-x divide-ivory-100/12">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="px-3 py-5 first:pl-0 md:px-8 md:py-6">
                <dt className="text-[0.5rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-ivory-300/80 md:text-[0.58rem]">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-[1.1rem] leading-none text-gold-300 md:mt-2 md:text-[1.6rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#story"
            className="group hidden shrink-0 items-center gap-3 border-l border-ivory-100/12 pl-8 text-[0.55rem] uppercase tracking-[0.24em] text-ivory-300/80 transition-colors hover:text-gold-300 lg:flex"
          >
            {hero.scrollCue}
            <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
