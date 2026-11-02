import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  tone = "light",
  align = "left",
  className,
  headingClassName,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", isDark && "eyebrow--on-dark")}>{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "display-2",
          eyebrow && "mt-5",
          isDark ? "text-ivory-50" : "text-charcoal-950",
          headingClassName,
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "lede mt-6 max-w-2xl text-pretty",
            align === "center" && "mx-auto",
            isDark && "text-ivory-200/80",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export type { Dictionary };
