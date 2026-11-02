import type { MetadataRoute } from "next";

import { events, notices } from "@/content/records";
import { enabledLocales, localePath } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

/** Only reviewed, public routes belong here. */
const publicPaths: readonly { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/history", priority: 0.9 },
  { path: "/igweagu-udogu", priority: 0.85 },
  { path: "/vision-mission", priority: 0.7 },
  { path: "/heritage", priority: 0.8 },
  { path: "/programmes", priority: 0.75 },
  { path: "/leadership", priority: 0.75 },
  { path: "/news", priority: 0.8 },
  { path: "/events", priority: 0.7 },
  { path: "/gallery", priority: 0.7 },
  { path: "/membership", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
  { path: "/credits", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const generated = new Date();

  const pages = enabledLocales.flatMap((locale) =>
    publicPaths.map(({ path, priority }) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: generated,
      changeFrequency: (path === "/news" || path === "/events" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority,
    })),
  );

  const noticePages = enabledLocales.flatMap((locale) =>
    notices.map((notice) => ({
      url: absoluteUrl(localePath(locale, `/news/${notice.slug}`)),
      lastModified: new Date(notice.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  const eventPages = enabledLocales.flatMap((locale) =>
    events.map((event) => ({
      url: absoluteUrl(localePath(locale, `/events/${event.slug}`)),
      lastModified: new Date(event.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  );

  return [...pages, ...noticePages, ...eventPages];
}
