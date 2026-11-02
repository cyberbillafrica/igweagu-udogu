import { cache } from "react";

import { defaultLocale, isEnabledLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";

/**
 * Dictionaries are statically known so that a locale can never be resolved to
 * an unverified translation. When `ig.ts` is complete, register it here and in
 * `config.ts` — nothing else changes.
 */
const dictionaries: Partial<Record<Locale, Dictionary>> = {
  en,
};

export const getDictionary = cache(
  async (locale: Locale = defaultLocale): Promise<Dictionary> => {
    const dictionary = isEnabledLocale(locale) ? dictionaries[locale] : undefined;

    if (!dictionary) {
      return en;
    }

    return dictionary;
  },
);

export type { Dictionary };
