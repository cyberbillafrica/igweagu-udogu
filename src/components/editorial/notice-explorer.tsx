"use client";

import { useMemo, useState } from "react";

import { NoticeCard } from "@/components/editorial/cards";
import type { Notice, NoticeCategory } from "@/content/records";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type NoticeExplorerProps = {
  notices: readonly Notice[];
  locale: Locale;
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    filterLabel: string;
    countOne: string;
    countMany: string;
    noResults: string;
    clearFilters: string;
    readMore: string;
    all: string;
  };
  categoryLabels: Record<NoticeCategory, string>;
};

const categories: NoticeCategory[] = ["announcement", "programme", "assembly"];

export function NoticeExplorer({
  notices,
  locale,
  labels,
  categoryLabels,
}: NoticeExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NoticeCategory | "all">("all");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesCategory = category === "all" || notice.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;

      return [notice.title, notice.summary, ...notice.body]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [notices, query, category]);

  const filteredOut = filtered.length === 0;
  const countLabel = filtered.length === 1 ? labels.countOne : labels.countMany;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-charcoal-900/15 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
            {labels.filterLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", ...categories] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={cn(
                  "border px-3.5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                  category === value
                    ? "border-charcoal-950 bg-charcoal-950 text-ivory-50"
                    : "border-charcoal-900/20 text-charcoal-700 hover:border-gold-600 hover:text-gold-700",
                )}
              >
                {value === "all" ? labels.all : categoryLabels[value]}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-72">
          <label
            htmlFor="notice-search"
            className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500"
          >
            {labels.searchLabel}
          </label>
          <input
            id="notice-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="mt-2 w-full border border-charcoal-900/20 bg-ivory-50 px-4 py-2.5 text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-400 focus:border-gold-600"
          />
        </div>
      </div>

      <p className="mt-5 text-[0.6rem] uppercase tracking-[0.16em] text-charcoal-500">
        {filtered.length} {countLabel}
      </p>

      {filteredOut ? (
        <div className="mt-8 border border-line bg-ivory-50 p-8">
          <p className="font-display text-[1.25rem] text-charcoal-950">{labels.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-700 underline decoration-gold-600/50 underline-offset-4"
          >
            {labels.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {filtered.map((notice) => (
            <NoticeCard
              key={notice.slug}
              notice={notice}
              locale={locale}
              readMore={labels.readMore}
              categoryLabel={categoryLabels[notice.category]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
