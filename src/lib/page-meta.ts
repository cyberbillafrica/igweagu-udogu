import type { Metadata } from "next";

import { absoluteUrl, defaultSocialImage } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Locale-relative path, e.g. `/en/about`. */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Shared metadata shape so every public page has canonical, OG and Twitter data. */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
  imageAlt,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title,
      description,
      url,
      locale: "en_NG",
      images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt ?? title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
