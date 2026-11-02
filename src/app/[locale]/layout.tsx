import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { enabledLocales, isEnabledLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isEnabledLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader locale={locale} nav={dictionary.nav} ui={dictionary.ui} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} footer={dictionary.footer} nav={dictionary.nav} />
    </div>
  );
}
