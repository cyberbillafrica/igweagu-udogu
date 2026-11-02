import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "outlineLight" | "outlineDark" | "quiet";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Renders a plain anchor — required for in-page section links. */
  anchor?: boolean;
  withArrow?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "border border-gold-500 bg-gold-500 text-charcoal-950 hover:border-gold-400 hover:bg-gold-400",
  outlineLight:
    "border border-ivory-100/35 text-ivory-100 hover:border-gold-300/70 hover:bg-ivory-100/[0.06] hover:text-gold-100",
  outlineDark:
    "border border-charcoal-900/20 text-charcoal-900 hover:border-gold-500 hover:text-gold-700",
  quiet: "border border-transparent text-charcoal-700 hover:text-gold-700",
};

const shared =
  "group inline-flex items-center justify-center gap-3 px-7 py-4 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  anchor = false,
  withArrow = true,
}: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (anchor) {
    return (
      <a href={href} className={cn(shared, variants[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(shared, variants[variant], className)}>
      {content}
    </Link>
  );
}
