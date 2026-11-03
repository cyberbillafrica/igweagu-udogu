"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Emblem } from "@/components/brand/emblem";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { allPages, primaryNav } from "@/content/navigation";
import { organisation } from "@/content/organisation";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  ui: Dictionary["ui"];
};

const navItemBase =
  "whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition-colors xl:text-[0.66rem] xl:tracking-[0.16em]";

export function SiteHeader({ locale, nav, ui }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!openGroup) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openGroup]);

  const isActive = (href: string) => {
    const target = localePath(locale, href);
    return href === "/" ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  };

  const groupActive = (href: string, children?: readonly { href: string }[]) =>
    isActive(href) || Boolean(children?.some((child) => isActive(child.href)));

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-charcoal-950 md:block">
        <div className="container-page flex h-9 items-center justify-between gap-6">
          <p className="flex min-w-0 items-center gap-3 text-[0.6rem] uppercase tracking-[0.2em] text-ivory-200/80">
            <span className="text-gold-400">{nav.greeting}</span>
            <span aria-hidden="true" className="h-2.5 w-px bg-ivory-100/25" />
            <span className="truncate">{nav.greetingContext}</span>
          </p>
          <div className="flex shrink-0 items-center gap-7">
            <LanguageSwitcher label={ui.language} comingSoon={ui.languageComingSoon} tone="dark" />
            <Link
              href={localePath(locale, "/contact")}
              className="text-[0.6rem] uppercase tracking-[0.2em] text-ivory-200 transition-colors hover:text-gold-300"
            >
              {nav.contact}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-line bg-ivory-100/95 shadow-[0_18px_40px_-34px_rgba(32,37,33,0.65)] backdrop-blur-md"
            : "border-line/60 bg-ivory-100",
        )}
      >
        <div className="container-page flex h-[5.25rem] items-center justify-between gap-5">
          <Link
            href={localePath(locale)}
            className="flex shrink-0 items-center gap-3"
            aria-label={`${organisation.name} — ${nav.home}`}
          >
            <Emblem
              className="h-10 w-auto transition-transform duration-500 hover:scale-[1.03] md:h-[3.1rem]"
              priority
              sizes="(max-width: 768px) 120px, 160px"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1rem] tracking-[0.01em] text-charcoal-950 md:text-[1.15rem]">
                {organisation.nameLines[0]}
              </span>
              <span className="mt-1 text-[0.47rem] font-semibold uppercase tracking-[0.3em] text-charcoal-500 md:text-[0.53rem]">
                {organisation.nameLines[1]}
              </span>
            </span>
          </Link>

          <nav
            aria-label={nav.primaryLabel}
            className="hidden items-center gap-4 lg:flex xl:gap-7"
          >
            {primaryNav.map((item) => {
              const active = groupActive(item.href, item.children);
              const expanded = openGroup === item.key;

              return (
                <div
                  key={item.key}
                  className={cn("relative", item.hideBelowXl && "hidden xl:block")}
                  onMouseEnter={() => item.children && setOpenGroup(item.key)}
                  onMouseLeave={() => item.children && setOpenGroup(null)}
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`nav-panel-${item.key}`}
                        onClick={() => setOpenGroup(expanded ? null : item.key)}
                        className={cn(
                          navItemBase,
                          "inline-flex items-center gap-1.5 py-2",
                          active || expanded
                            ? "text-charcoal-950"
                            : "text-charcoal-700 hover:text-charcoal-950",
                        )}
                      >
                        {nav[item.labelKey]}
                        <ChevronDownIcon
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            expanded && "rotate-180",
                          )}
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-0 -bottom-0.5 h-px bg-gold-500 transition-transform duration-300",
                            active ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {expanded ? (
                          <motion.ul
                            id={`nav-panel-${item.key}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-1/2 top-full z-50 min-w-[15.5rem] -translate-x-1/2 border border-line bg-ivory-50 p-2 shadow-[0_28px_60px_-40px_rgba(32,37,33,0.8)]"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={localePath(locale, child.href)}
                                  onClick={() => setOpenGroup(null)}
                                  aria-current={isActive(child.href) ? "page" : undefined}
                                  className={cn(
                                    "block px-4 py-3 text-[0.7rem] uppercase tracking-[0.15em] transition-colors",
                                    isActive(child.href)
                                      ? "bg-ivory-200 text-charcoal-950"
                                      : "text-charcoal-700 hover:bg-ivory-100 hover:text-gold-700",
                                  )}
                                >
                                  {nav[child.labelKey]}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        navItemBase,
                        "group relative inline-block py-2",
                        active
                          ? "text-charcoal-950"
                          : "text-charcoal-700 hover:text-charcoal-950",
                      )}
                    >
                      {nav[item.labelKey]}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-gold-500 transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden xl:block">
              <ButtonLink
                href={localePath(locale, "/membership")}
                className="whitespace-nowrap px-5 py-3 text-[0.6rem]"
                withArrow={false}
              >
                {nav.joinCta}
              </ButtonLink>
            </span>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-charcoal-900/15 text-charcoal-900 transition-colors hover:border-gold-500 hover:text-gold-700 lg:hidden"
            >
              <span className="sr-only">{open ? ui.closeMenu : ui.menu}</span>
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-royal-950 lg:hidden"
          >
            <div className="container-page flex min-h-svh flex-col pt-6 pb-10">
              <div className="flex items-center justify-between gap-4 border-b border-ivory-100/10 pb-5">
                <p className="text-[0.55rem] uppercase tracking-[0.3em] text-gold-400/80">
                  {nav.sectionsLabel}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={ui.closeMenu}
                  className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ivory-100/25 text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label={nav.sectionsLabel} className="mt-5">
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {allPages.map((page, index) => (
                    <motion.li
                      key={page.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + Math.min(index, 8) * 0.035, duration: 0.4 }}
                    >
                      <Link
                        href={localePath(locale, page.href)}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(page.href) ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-3 border-b border-ivory-100/10 py-3.5",
                          isActive(page.href) ? "text-gold-300" : "text-ivory-50",
                        )}
                      >
                        <span className="w-5 shrink-0 text-[0.55rem] tracking-[0.18em] text-gold-400/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1.3rem] leading-snug">
                          {nav[page.labelKey]}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-9 flex flex-col gap-7">
                <ButtonLink
                  href={localePath(locale, "/membership")}
                  className="w-full"
                  withArrow={false}
                >
                  {nav.joinCta}
                </ButtonLink>
                <LanguageSwitcher
                  label={ui.language}
                  comingSoon={ui.languageComingSoon}
                  tone="dark"
                />
              </div>

              <p className="mt-auto pt-12 text-[0.6rem] uppercase tracking-[0.26em] text-ivory-200/80">
                {organisation.motto}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
