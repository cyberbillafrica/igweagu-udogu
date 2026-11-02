import { ButtonLink } from "@/components/ui/button-link";
import { MotifPanel } from "@/components/ui/ornament";
import { Reveal } from "@/components/ui/reveal";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type MembershipCtaProps = {
  locale: Locale;
  membership: Dictionary["membership"];
};

export function MembershipCta({ locale, membership }: MembershipCtaProps) {
  return (
    <section
      id="membership"
      aria-labelledby="membership-heading"
      className="relative overflow-hidden bg-royal-800 py-20 text-ivory-100 md:py-24"
    >
      <MotifPanel className="opacity-[0.055]" />

      <div className="container-page relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <p className="eyebrow eyebrow--on-dark">{membership.eyebrow}</p>
          <h2 id="membership-heading" className="display-2 mt-5 max-w-xl text-ivory-50">
            {membership.heading}
          </h2>
          <p className="mt-6 max-w-lg text-[0.98rem] leading-[1.8] text-ivory-200/80">
            {membership.body}
          </p>

          <div className="mt-9 flex flex-wrap items-start gap-7">
            <ButtonLink href={localePath(locale, "/membership")}>{membership.cta}</ButtonLink>
            <p className="max-w-[16rem] text-[0.68rem] leading-relaxed text-ivory-300/80">
              {membership.privacyNote}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="grid gap-px bg-ivory-100/15 sm:grid-cols-2">
            {membership.steps.map((step) => (
              <li key={step.step} className="bg-royal-800 p-6">
                <span className="font-display text-[0.85rem] text-gold-400/85">{step.step}</span>
                <h3 className="mt-3 font-display text-[1.2rem] text-ivory-50">{step.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ivory-200/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
