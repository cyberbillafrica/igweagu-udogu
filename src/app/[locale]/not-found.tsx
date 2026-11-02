import { ButtonLink } from "@/components/ui/button-link";
import { defaultLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function LocaleNotFound() {
  const t = await getDictionary(defaultLocale);

  return (
    <div className="bg-ivory-100 py-24 md:py-32">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow eyebrow--plain justify-center">{t.notFound.eyebrow}</p>
        <h1 className="display-2 mt-5">{t.notFound.title}</h1>
        <p className="lede mt-5">{t.notFound.lede}</p>
        <div className="mt-9 flex justify-center">
          <ButtonLink href={localePath(defaultLocale)}>{t.notFound.cta}</ButtonLink>
        </div>
      </div>
    </div>
  );
}
