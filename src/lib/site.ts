/**
 * Canonical origin for metadata, Open Graph URLs and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment; the localhost
 * fallback keeps development and CI builds valid.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultSocialImage = "/images/og-default.jpg";
