import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { organisation } from "@/content/organisation";
import { defaultLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Hard 404 surface. `proxy.ts` rewrites unsupported locales and unknown
 * notice/event slugs here before the route renders, so the response carries a
 * 404 status and a server-rendered page rather than a streamed shell.
 */
export default async function NotFoundSurface() {
  const t = await getDictionary(defaultLocale);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-charcoal-950 px-6 py-20 text-center text-ivory-100">
      <Image
        src="/brand/igweagu-emblem.jpg"
        alt="Official emblem of Igweagu Udogu Igbonine Gbulugbulu."
        width={888}
        height={584}
        sizes="160px"
        className="h-20 w-auto object-contain"
      />
      <p className="eyebrow eyebrow--on-dark mt-10">{t.notFound.eyebrow}</p>
      <h1 className="display-2 mt-5 max-w-xl text-ivory-50">{t.notFound.title}</h1>
      <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory-200/85">
        {t.notFound.lede}
      </p>
      <Link
        href={localePath(defaultLocale)}
        className="mt-10 border border-gold-500 bg-gold-500 px-7 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:border-gold-400 hover:bg-gold-400"
      >
        {t.notFound.cta}
      </Link>
      <p className="mt-12 text-[0.55rem] uppercase tracking-[0.26em] text-ivory-200/70">
        {organisation.motto}
      </p>
    </main>
  );
}
