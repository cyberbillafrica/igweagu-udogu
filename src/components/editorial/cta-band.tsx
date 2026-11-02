import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/cn";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "royal" | "green" | "charcoal";
  className?: string;
};

const tones = {
  royal: "bg-royal-950",
  green: "bg-green-700",
  charcoal: "bg-charcoal-950",
} as const;

export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  tone = "royal",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("relative isolate overflow-hidden text-ivory-100", tones[tone], className)}>
      <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.07]" />
      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-14">
          <div className="max-w-2xl">
            {eyebrow ? <p className="eyebrow eyebrow--on-dark">{eyebrow}</p> : null}
            <h2 className="display-2 mt-5 text-balance text-ivory-50">{title}</h2>
            {body ? (
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-ivory-200/90">
                {body}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="outlineLight">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
