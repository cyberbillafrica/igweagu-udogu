import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  body: string;
  action?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function EmptyState({ title, body, action, className, tone = "light" }: EmptyStateProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "relative border p-8 md:p-10",
        isDark ? "border-ivory-100/20 bg-royal-950" : "border-line bg-ivory-50",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.05]" />
      <div className="relative max-w-md">
        <span
          aria-hidden="true"
          className={cn("block h-1.5 w-1.5 rotate-45", isDark ? "bg-gold-400" : "bg-gold-600")}
        />
        <h3
          className={cn(
            "mt-5 font-display text-[1.4rem] leading-snug",
            isDark ? "text-ivory-50" : "text-charcoal-950",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 text-[0.92rem] leading-relaxed",
            isDark ? "text-ivory-200/85" : "text-charcoal-500",
          )}
        >
          {body}
        </p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </div>
  );
}
