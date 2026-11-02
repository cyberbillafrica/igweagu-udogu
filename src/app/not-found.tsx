import Link from "next/link";

import { Emblem } from "@/components/brand/emblem";
import { organisation } from "@/content/organisation";
import { defaultLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function RootNotFound() {
  const t = await getDictionary(defaultLocale);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-charcoal-950 px-6 py-20 text-center">
      <Emblem className="h-20 w-auto" sizes="160px" />
      <p className="eyebrow eyebrow--on-dark mt-10">{t.notFound.eyebrow}</p>
      <h1 className="display-2 mt-5 max-w-xl text-ivory-50">{t.notFound.title}</h1>
      <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory-300/70">
        {t.notFound.lede}
      </p>
      <Link
        href={localePath(defaultLocale)}
        className="mt-10 border border-gold-500 bg-gold-500 px-7 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-gold-400"
      >
        {t.notFound.cta}
      </Link>
      <p className="mt-12 text-[0.55rem] uppercase tracking-[0.26em] text-ivory-300/35">
        {organisation.motto}
      </p>
    </div>
  );
}
