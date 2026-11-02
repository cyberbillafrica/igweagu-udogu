import Link from "next/link";

import { defaultLocale, enabledLocales, isEnabledLocale, localeNames, localePath, locales } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  label: string;
  comingSoon: string;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Only languages with a complete, reviewed dictionary are selectable. Igbo is
 * shown as unavailable rather than as a broken or machine-translated option.
 */
export function LanguageSwitcher({
  label,
  comingSoon,
  tone = "light",
  className,
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center gap-1", className)}
    >
      {locales.map((locale, index) => {
        const available = isEnabledLocale(locale);
        const isCurrent = locale === defaultLocale;
        const name = localeNames[locale].endonym;

        return (
          <span key={locale} className="flex items-center">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-1.5 h-3 w-px",
                  tone === "dark" ? "bg-ivory-100/25" : "bg-charcoal-900/20",
                )}
              />
            ) : null}

            {available ? (
              <Link
                href={localePath(locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "text-[0.625rem] font-semibold uppercase tracking-[0.22em] transition-colors",
                  tone === "dark"
                    ? "text-gold-300 hover:text-gold-200"
                    : "text-charcoal-700 hover:text-gold-700",
                )}
              >
                {name}
              </Link>
            ) : (
              <span
                className={cn(
                  "cursor-default text-[0.625rem] font-semibold uppercase tracking-[0.22em]",
                  tone === "dark" ? "text-ivory-300/60" : "text-charcoal-400/70",
                )}
                title={comingSoon}
              >
                {name}
                <span className="sr-only"> — {comingSoon}</span>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export const availableLocales = enabledLocales;
