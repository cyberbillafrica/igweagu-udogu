import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { leadershipMonograms } from "@/content/leadership";
import type { Dictionary } from "@/i18n/get-dictionary";

type LeadershipProps = {
  leadership: Dictionary["leadership"];
};

export function Leadership({ leadership }: LeadershipProps) {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="border-y border-charcoal-900/10 bg-ivory-200/50 py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="leadership-heading"
            eyebrow={leadership.eyebrow}
            title={leadership.heading}
            lede={leadership.lede}
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden bg-charcoal-900/10 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.seats.map((seat, index) => (
            <article
              key={seat.office}
              className="flex flex-col bg-ivory-100 p-7 transition-colors duration-300 hover:bg-ivory-50 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-600/35 font-display text-[0.85rem] text-gold-700">
                  {leadershipMonograms[index] ?? "IU"}
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.35rem] leading-tight text-charcoal-950">
                {seat.office}
              </h3>
              <p className="mt-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-gold-700">
                {seat.role}
              </p>
              <p className="mt-4 text-[0.86rem] leading-relaxed text-charcoal-500">{seat.body}</p>
            </article>
          ))}

          <article className="flex flex-col justify-between bg-gold-100/70 p-7 md:p-8">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-gold-700">
              {leadership.eyebrow}
            </p>
            <p className="mt-5 font-display text-[1.15rem] leading-snug text-charcoal-900">
              {leadership.note}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
