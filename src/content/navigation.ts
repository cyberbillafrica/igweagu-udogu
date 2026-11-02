import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * Structural navigation. Labels come from the dictionary (`nav.*`), so adding
 * a language requires no change here. Hrefs are locale-relative routes; the
 * header and footer prefix them with the active locale.
 */

export type NavLabelKey = keyof Dictionary["nav"];

export type NavLink = {
  labelKey: NavLabelKey;
  href: string;
};

export type NavItem = NavLink & {
  key: string;
  children?: NavLink[];
  /** Hidden between 1024 and 1280px, where the bar is tightest. */
  hideBelowXl?: boolean;
};

export const primaryNav: readonly NavItem[] = [
  {
    key: "about",
    labelKey: "about",
    href: "/about",
    children: [
      { labelKey: "aboutHouse", href: "/about" },
      { labelKey: "history", href: "/history" },
      { labelKey: "igweagu", href: "/igweagu-udogu" },
      { labelKey: "vision", href: "/vision-mission" },
    ],
  },
  {
    key: "heritage",
    labelKey: "heritage",
    href: "/heritage",
    children: [
      { labelKey: "heritagePage", href: "/heritage" },
      { labelKey: "gallery", href: "/gallery" },
    ],
  },
  { key: "programmes", labelKey: "programmes", href: "/programmes" },
  { key: "leadership", labelKey: "leadership", href: "/leadership" },
  {
    key: "newsEvents",
    labelKey: "newsEvents",
    href: "/news",
    children: [
      { labelKey: "news", href: "/news" },
      { labelKey: "events", href: "/events" },
    ],
  },
  { key: "membership", labelKey: "membership", href: "/membership" },
  { key: "contact", labelKey: "contact", href: "/contact", hideBelowXl: true },
];

/** Every public route, in reading order — used by the mobile menu. */
export const allPages: readonly NavLink[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "aboutHouse", href: "/about" },
  { labelKey: "history", href: "/history" },
  { labelKey: "igweagu", href: "/igweagu-udogu" },
  { labelKey: "vision", href: "/vision-mission" },
  { labelKey: "heritagePage", href: "/heritage" },
  { labelKey: "programmes", href: "/programmes" },
  { labelKey: "leadership", href: "/leadership" },
  { labelKey: "news", href: "/news" },
  { labelKey: "events", href: "/events" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "membership", href: "/membership" },
  { labelKey: "contact", href: "/contact" },
];

export type FooterColumn = {
  key: keyof Dictionary["footer"]["columns"];
  links: NavLink[];
};

export const footerNav: readonly FooterColumn[] = [
  {
    key: "theHouse",
    links: [
      { labelKey: "aboutHouse", href: "/about" },
      { labelKey: "history", href: "/history" },
      { labelKey: "igweagu", href: "/igweagu-udogu" },
      { labelKey: "vision", href: "/vision-mission" },
    ],
  },
  {
    key: "heritage",
    links: [
      { labelKey: "heritagePage", href: "/heritage" },
      { labelKey: "programmes", href: "/programmes" },
      { labelKey: "leadership", href: "/leadership" },
      { labelKey: "gallery", href: "/gallery" },
    ],
  },
  {
    key: "engagement",
    links: [
      { labelKey: "news", href: "/news" },
      { labelKey: "events", href: "/events" },
      { labelKey: "membership", href: "/membership" },
      { labelKey: "contact", href: "/contact" },
    ],
  },
];
