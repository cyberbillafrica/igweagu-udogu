import { cn } from "@/lib/cn";

/** Faint geometric ground used sparingly behind feature blocks. */
export function MotifPanel({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 motif opacity-[0.07]",
        className,
      )}
    />
  );
}

/** Gold hairline with a centred diamond — the only ornamental divider used. */
export function DiamondRule({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "via-gold-500/45" : "via-gold-600/40";
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-3", className)}>
      <span className={cn("h-px flex-1 bg-gradient-to-r from-transparent", line, "to-transparent")} />
      <span className={cn("h-1.5 w-1.5 rotate-45", tone === "dark" ? "bg-gold-400" : "bg-gold-600")} />
      <span className={cn("h-px flex-1 bg-gradient-to-r from-transparent", line, "to-transparent")} />
    </div>
  );
}
