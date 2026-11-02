import { cn } from "@/lib/cn";

export type RecordStatus = "announced" | "inDevelopment" | "proposed" | "recorded";

const tones: Record<RecordStatus, string> = {
  announced: "border-green-700/35 bg-green-50 text-green-800",
  inDevelopment: "border-gold-600/45 bg-gold-100 text-gold-700",
  proposed: "border-charcoal-900/20 bg-transparent text-charcoal-500",
  recorded: "border-royal-800/30 bg-royal-50 text-royal-800",
};

export function StatusPill({
  status,
  label,
  className,
}: {
  status: RecordStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em]",
        tones[status],
        className,
      )}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}
