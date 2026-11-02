import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

type Tone = "ivory" | "white" | "sand" | "charcoal" | "green" | "royal";

const backgrounds: Record<Tone, string> = {
  ivory: "bg-ivory-100 text-charcoal-900",
  white: "bg-ivory-50 text-charcoal-900",
  sand: "bg-ivory-200/60 text-charcoal-900",
  charcoal: "bg-charcoal-950 text-ivory-200",
  green: "bg-green-700 text-ivory-100",
  royal: "bg-royal-950 text-ivory-100",
};

type EditorialSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  tone?: Tone;
  size?: "default" | "compact" | "wide";
  align?: "left" | "center";
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
  bordered?: boolean;
};

/** The standard rhythm for interior pages: heading, optional aside, content. */
export function EditorialSection({
  id,
  eyebrow,
  title,
  lede,
  tone = "ivory",
  size = "default",
  align = "left",
  aside,
  children,
  className,
  headingClassName,
  bordered = false,
}: EditorialSectionProps) {
  const isDark = tone === "charcoal" || tone === "green" || tone === "royal";

  return (
    <section
      id={id}
      className={cn(
        backgrounds[tone],
        size === "compact" ? "py-14 md:py-18" : "py-18 md:py-26",
        bordered && "border-y border-charcoal-900/10",
        className,
      )}
    >
      <div className="container-page">
        {title ? (
          <div
            className={cn(
              "grid gap-8",
              aside ? "lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16" : "",
            )}
          >
            <div className={cn(align === "center" && "mx-auto text-center")}>
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                lede={lede}
                tone={isDark ? "dark" : "light"}
                align={align}
                headingClassName={cn("text-balance", headingClassName)}
              />
            </div>
            {aside ? <div className="max-w-md">{aside}</div> : null}
          </div>
        ) : null}
        <div className={cn(title && "mt-12 md:mt-16")}>{children}</div>
      </div>
    </section>
  );
}

type ProseProps = {
  paragraphs: readonly string[];
  tone?: "light" | "dark";
  className?: string;
  lead?: boolean;
};

export function Prose({ paragraphs, tone = "light", className, lead = false }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-5 text-pretty",
        tone === "dark" ? "text-ivory-200/90" : "text-charcoal-600",
        className,
      )}
    >
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph}
          className={cn(
            "leading-[1.8]",
            lead && index === 0
              ? "text-[1.08rem] text-charcoal-900 md:text-[1.15rem]"
              : "text-[1rem]",
            lead && index === 0 && tone === "dark" && "text-ivory-50",
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

type FactGridProps = {
  facts: readonly { label: string; value: string }[];
  tone?: "light" | "dark";
  className?: string;
};

export function FactGrid({ facts, tone = "light", className }: FactGridProps) {
  const isDark = tone === "dark";

  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden border",
        isDark ? "border-ivory-100/20 bg-ivory-100/15" : "border-line bg-line",
        "sm:grid-cols-2",
        className,
      )}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className={cn("px-6 py-5", isDark ? "bg-royal-950" : "bg-ivory-50")}
        >
          <dt
            className={cn(
              "text-[0.55rem] uppercase tracking-[0.22em]",
              isDark ? "text-ivory-200/75" : "text-charcoal-500",
            )}
          >
            {fact.label}
          </dt>
          <dd
            className={cn(
              "mt-2 font-display text-[1.1rem] leading-snug",
              isDark ? "text-ivory-50" : "text-charcoal-950",
            )}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type PullQuoteProps = {
  quote: string;
  attribution?: string;
  source?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function PullQuote({ quote, attribution, source, tone = "light", className }: PullQuoteProps) {
  const isDark = tone === "dark";

  return (
    <figure className={cn("border-l-2 border-gold-500 pl-6 md:pl-9", className)}>
      <blockquote
        className={cn(
          "font-display text-[1.6rem] leading-[1.25] text-balance md:text-[2.1rem]",
          isDark ? "text-ivory-50" : "text-charcoal-950",
        )}
      >
        “{quote}”
      </blockquote>
      {attribution || source ? (
        <figcaption
          className={cn(
            "mt-5 text-[0.6rem] uppercase tracking-[0.2em]",
            isDark ? "text-ivory-200/75" : "text-charcoal-500",
          )}
        >
          {attribution}
          {attribution && source ? " · " : ""}
          {source}
        </figcaption>
      ) : null}
    </figure>
  );
}
