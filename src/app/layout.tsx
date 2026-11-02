import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, defaultSocialImage, siteUrl } from "@/lib/site";

import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Igweagu Udogu Igbonine Gbulugbulu — The New Covenant",
    template: "%s · Igweagu Udogu Igbonine Gbulugbulu",
  },
  description:
    "The official home of Igweagu Udogu Igbonine Gbulugbulu: a covenant of kinship formed in 1996 by the generation born 1967–1976, united across senatorial zones and rooted in Igbo heritage.",
  applicationName: "Igweagu Udogu Igbonine Gbulugbulu",
  keywords: [
    "Igweagu Udogu",
    "Igbonine Gbulugbulu",
    "Ndi Gboo",
    "Igbo heritage",
    "Igbo cultural institution",
    "membership",
  ],
  alternates: {
    canonical: absoluteUrl(`/${defaultLocale}`),
    languages: { en: absoluteUrl(`/${defaultLocale}`) },
  },
  openGraph: {
    type: "website",
    siteName: "Igweagu Udogu Igbonine Gbulugbulu",
    title: "Igweagu Udogu Igbonine Gbulugbulu — The New Covenant",
    description:
      "A covenant of kinship formed in 1996 by the generation born 1967–1976 — rooted in Igbo heritage and building an institution worthy of the generations to come.",
    url: absoluteUrl(`/${defaultLocale}`),
    locale: "en_NG",
    images: [
      {
        url: absoluteUrl(defaultSocialImage),
        width: 1200,
        height: 630,
        alt: "Igweagu Udogu Igbonine Gbulugbulu — The New Covenant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Igweagu Udogu Igbonine Gbulugbulu — The New Covenant",
    description:
      "A covenant of kinship formed in 1996 by the generation born 1967–1976, rooted in Igbo heritage.",
    images: [absoluteUrl(defaultSocialImage)],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F5EC" },
    { media: "(prefers-color-scheme: dark)", color: "#06162C" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <html lang={defaultLocale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          {dictionary.ui.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
