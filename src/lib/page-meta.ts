import type { Metadata } from "next";

import { organisation } from "@/content/organisation";
import { absoluteUrl, defaultSocialImage, defaultSocialImageAlt } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Locale-relative path, e.g. `/en/about`. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Shared metadata shape so every public page has canonical, Open Graph and
 * Twitter data.
 *
 * The image is deliberately the same branded card on every route: one card the
 * crawlers already hold in cache, always led by the official emblem, so a link
 * shared on WhatsApp or any other social surface shows the house's mark rather
 * than whichever photograph the page happens to lead with.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(defaultSocialImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: organisation.name,
      title,
      description,
      url,
      locale: "en_NG",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: defaultSocialImageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage, alt: defaultSocialImageAlt }],
    },
  };
}
