import { MotifPanel } from "@/components/ui/ornament";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/get-dictionary";

type VisionMissionProps = {
  vision: Dictionary["vision"];
};

export function VisionMission({ vision }: VisionMissionProps) {
  return (
    <section
      aria-labelledby="vision-heading"
      className="relative overflow-hidden bg-green-900 py-20 text-ivory-100 md:py-28"
    >
      <MotifPanel className="opacity-[0.06]" />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="vision-heading"
            tone="dark"
            eyebrow={vision.eyebrow}
            title={vision.heading}
          />

          <div className="mt-10 border-l border-gold-500/40 pl-6">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold-300">
              {vision.visionLabel}
            </p>
            <p className="mt-4 max-w-md font-display text-[1.45rem] leading-snug text-ivory-50 md:text-[1.6rem]">
              {vision.visionBody}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold-300">
            {vision.missionLabel}
          </p>

          <ul className="mt-6 grid gap-px bg-ivory-100/15 sm:grid-cols-2">
            {vision.missionItems.map((item, index) => (
              <li key={item.title} className="bg-green-900 p-6 md:p-7">
                <span className="font-display text-[0.85rem] text-gold-400/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[1.3rem] text-ivory-50">{item.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-ivory-200/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
