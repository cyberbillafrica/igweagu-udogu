import { NextResponse, type NextRequest } from "next/server";

import { events, notices } from "@/content/records";
import { enabledLocales } from "@/i18n/config";

/**
 * Request-time 404 guard.
 *
 * Under Cache Components a route streams its shell before a page-level
 * `notFound()` runs, which leaves the response with a 200 status. These checks
 * run before any route renders, so an unsupported locale or an unknown
 * notice/event slug gets a real 404 with server-rendered HTML.
 *
 * Everything else — including unknown paths inside a valid locale — is left to
 * the catch-all route, which renders the 404 inside the site chrome.
 */
const noticeSlugs = new Set(notices.map((notice) => notice.slug));
const eventSlugs = new Set(events.map((event) => event.slug));
const knownSlugs: Record<string, Set<string>> = {
  news: noticeSlugs,
  events: eventSlugs,
};

/** Every routable section under a locale. New pages must be added here. */
const knownSections = new Set([
  "about",
  "history",
  "igweagu-udogu",
  "vision-mission",
  "heritage",
  "programmes",
  "leadership",
  "news",
  "events",
  "gallery",
  "membership",
  "contact",
  "credits",
]);

function notFound(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/404";
  url.search = "";
  return NextResponse.rewrite(url, { status: 404 });
}

export function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const [locale, section, slug] = segments;

  if (!locale) {
    return NextResponse.next();
  }

  if (!(enabledLocales as readonly string[]).includes(locale)) {
    return notFound(request);
  }

  if (section && !knownSections.has(section)) {
    return notFound(request);
  }

  if (section && slug && knownSlugs[section] && !knownSlugs[section].has(slug)) {
    return notFound(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|images/|brand/|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)"],
};
