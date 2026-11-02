import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/get-dictionary";

type StoryTimelineProps = {
  story: Dictionary["story"];
};

export function StoryTimeline({ story }: StoryTimelineProps) {
  return (
    <section
      aria-labelledby="journey-heading"
      className="border-t border-charcoal-900/10 bg-ivory-200/45 py-20 md:py-28"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              id="journey-heading"
              eyebrow={story.eyebrow}
              title={story.heading}
              lede={story.lede}
            />
          </Reveal>

          <div className="hidden items-center gap-3 text-[0.55rem] uppercase tracking-[0.22em] text-charcoal-500 md:flex">
            <span>{story.milestones[0]?.year}</span>
            <span aria-hidden="true" className="h-px w-16 bg-gold-600/50" />
            <span>{story.milestones[story.milestones.length - 1]?.year}</span>
          </div>
        </div>

        <ol className="mt-14 border-t border-charcoal-900/15">
          {story.milestones.map((milestone, index) => (
            <li
              key={milestone.year}
              className="group grid gap-3 border-b border-charcoal-900/10 py-7 transition-colors hover:bg-ivory-50/60 md:grid-cols-[8.5rem_1fr_1.25fr] md:gap-10 md:py-9"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rotate-45 bg-gold-600/70 transition-colors group-hover:bg-gold-600"
                />
                <span className="font-display text-[1.85rem] leading-none text-charcoal-900 transition-colors group-hover:text-gold-700">
                  {milestone.year}
                </span>
              </div>

              <h3 className="font-display text-[1.4rem] leading-tight text-charcoal-950 md:text-[1.5rem]">
                {milestone.title}
              </h3>

              <p className="max-w-xl text-[0.94rem] leading-relaxed text-charcoal-500">
                {milestone.body}
              </p>

              <span className="sr-only">
                {index + 1} / {story.milestones.length}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-3xl text-[0.7rem] leading-relaxed text-charcoal-500">
          {story.footnote}
        </p>
      </div>
    </section>
  );
}
