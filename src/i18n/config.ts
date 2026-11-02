/**
 * Internationalisation configuration.
 *
 * English is the only launch language. Igbo is declared here — with its
 * dictionary path reserved — so a complete translation can be added by
 * writing `dictionaries/ig.ts` and moving `"ig"` into `enabledLocales`.
 * Nothing else in the application needs to change: routes, the language
 * switcher and the metadata are all derived from this file.
 */
export const locales = ["en", "ig"] as const;

export type Locale = (typeof locales)[number];

/** Languages with a complete, reviewed dictionary. Only these are routable. */
export const enabledLocales: readonly Locale[] = ["en"];

export const defaultLocale: Locale = "en";

/** Human-readable names, used by the language switcher and `<html lang>`. */
export const localeNames: Record<Locale, { endonym: string; english: string }> = {
  en: { endonym: "English", english: "English" },
  ig: { endonym: "Igbo", english: "Igbo" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isEnabledLocale(value: string): value is Locale {
  return (enabledLocales as readonly string[]).includes(value);
}

/** Path to a locale-prefixed route, e.g. localePath("en", "/membership"). */
export function localePath(locale: Locale, path = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return normalised === "/" ? `/${locale}` : `/${locale}${normalised}`;
}
