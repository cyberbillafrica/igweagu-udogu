import Link from "next/link";

import { cn } from "@/lib/cn";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  label: string;
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
};

/**
 * A short trail: Home → section → page. The current page is the last item and
 * is not a link, so keyboard users are never invited to reload where they are.
 */
export function Breadcrumbs({ label, items, tone = "light", className }: BreadcrumbsProps) {
  const isDark = tone === "dark";

  return (
    <nav aria-label={label} className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.58rem] uppercase tracking-[0.18em]",
          isDark ? "text-ivory-200/80" : "text-charcoal-500",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2.5">
              {index > 0 ? (
                <span aria-hidden="true" className={isDark ? "text-gold-500/70" : "text-gold-600/70"}>
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    isDark ? "hover:text-gold-300" : "hover:text-gold-700",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? (isDark ? "text-gold-300" : "text-charcoal-900") : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
