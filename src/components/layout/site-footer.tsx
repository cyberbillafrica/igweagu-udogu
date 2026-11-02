import Link from "next/link";

import { contact, telHref } from "@/content/contact";
import { footerNav } from "@/content/navigation";
import { organisation } from "@/content/organisation";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type SiteFooterProps = {
  locale: Locale;
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
};

export function SiteFooter({ locale, footer, nav }: SiteFooterProps) {
  return (
    <footer className="relative bg-charcoal-950 text-ivory-300">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-600/70 to-transparent"
      />

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link
              href={localePath(locale)}
              className="inline-flex items-center gap-4"
              aria-label={`${organisation.name} — ${nav.home}`}
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full border border-gold-600/45 font-display text-base text-gold-400"
              >
                {organisation.monogram}
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.15rem] text-ivory-50">
                  {organisation.nameLines[0]}
                </span>
                <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-ivory-200/70">
                  {organisation.nameLines[1]}
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-200/85">
              {footer.tagline}
            </p>
            <p className="mt-6 font-display text-[0.95rem] tracking-[0.06em] text-gold-400/90">
              {footer.motto}
            </p>
            <p className="mt-4 max-w-xs text-[0.72rem] leading-relaxed text-ivory-200/65">
              {footer.imageryNote}{" "}
              <Link
                href={localePath(locale, "/credits")}
                className="underline decoration-gold-600/50 underline-offset-4 transition-colors hover:text-gold-300"
              >
                {footer.creditsLink}
              </Link>
            </p>
          </div>

          {footerNav.map((column) => (
            <nav key={column.key} aria-label={footer.columns[column.key]}>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-ivory-200/80">
                {footer.columns[column.key]}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localePath(locale, link.href)}
                      className="text-sm text-ivory-200/85 transition-colors hover:text-gold-300"
                    >
                      {nav[link.labelKey]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-ivory-100/10 pt-8">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-ivory-200/80">
            {footer.contactTitle}
          </p>
          <div className="mt-5 flex flex-col gap-6 text-sm md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="inline-block text-ivory-50 underline decoration-gold-600/40 underline-offset-4 transition-colors hover:text-gold-300"
              >
                {contact.email}
              </a>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-ivory-200/85">
                {contact.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={telHref(phone)}
                      className="transition-colors hover:text-gold-300"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="max-w-xs text-[0.72rem] leading-relaxed text-ivory-200/65">
              {footer.contactNote}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory-100/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.6rem] uppercase tracking-[0.16em] text-ivory-200/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {organisation.jubileeYear} {organisation.name}. {footer.rights}
          </p>
          <p>{organisation.motto}</p>
        </div>
      </div>
    </footer>
  );
}
