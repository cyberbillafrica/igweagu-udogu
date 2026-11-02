"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { GalleryCategory, GalleryImage } from "@/content/gallery";
import { cn } from "@/lib/cn";

type GalleryExplorerProps = {
  images: readonly GalleryImage[];
  categories: readonly GalleryCategory[];
  labels: {
    filterLabel: string;
    all: string;
    categoryLabels: Record<GalleryCategory, string>;
    lightboxLabel: string;
    closeLabel: string;
    previousImage: string;
    nextImage: string;
    captionLabel: string;
    licenceLabel: string;
    sourceLabel: string;
    photograph: string;
  };
};

export function GalleryExplorer({
  images,
  categories,
  labels,
}: GalleryExplorerProps) {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filtered = useMemo(
    () => images.filter((image) => active === "all" || image.category === active),
    [images, active],
  );

  const current = openIndex === null ? null : filtered[openIndex];

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((index) => {
        if (index === null) return index;
        return (index + direction + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        step(1);
      } else if (event.key === "ArrowLeft") {
        step(-1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, step]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-charcoal-900/15 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal-500">
            {labels.filterLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", ...categories] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setActive(value);
                  setOpenIndex(null);
                }}
                aria-pressed={active === value}
                className={cn(
                  "border px-3.5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                  active === value
                    ? "border-charcoal-950 bg-charcoal-950 text-ivory-50"
                    : "border-charcoal-900/20 text-charcoal-700 hover:border-gold-600 hover:text-gold-700",
                )}
              >
                {value === "all" ? labels.all : labels.categoryLabels[value]}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-charcoal-500">
          {filtered.length} {labels.photograph}
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image, index) => {
          const portrait = image.height / image.width > 1.12;

          return (
            <li
              key={image.id}
              className={cn(
                "group relative overflow-hidden",
                portrait ? "sm:row-span-2" : "",
              )}
            >
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpenIndex(index);
                }}
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                aria-haspopup="dialog"
              >
                <span className="relative block overflow-hidden bg-charcoal-900">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]",
                      portrait ? "aspect-[4/5]" : "aspect-[4/3]",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                  />
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-[0.5rem] uppercase tracking-[0.2em] text-gold-300">
                    {labels.categoryLabels[image.category]}
                  </span>
                  <span className="mt-1.5 block font-display text-[1.02rem] leading-snug text-ivory-50">
                    {image.caption}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {current && openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={labels.lightboxLabel}
          className="fixed inset-0 z-[80] flex flex-col bg-charcoal-950/97 text-ivory-100 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 border-b border-ivory-100/10 px-5 py-4 md:px-8">
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-ivory-200/80">
              {openIndex + 1} / {filtered.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 border border-ivory-100/25 px-3.5 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              {labels.closeLabel}
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-5 md:px-8">
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="h-auto max-h-[64svh] w-auto max-w-full object-contain"
            />
          </div>

          <div className="border-t border-ivory-100/10 px-5 py-5 md:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[0.5rem] uppercase tracking-[0.2em] text-gold-400">
                  {labels.categoryLabels[current.category]}
                </p>
                <p className="mt-2 font-display text-[1.2rem] leading-snug text-ivory-50">
                  {current.caption}
                </p>
                <p className="mt-2 text-[0.68rem] leading-relaxed text-ivory-200/75">
                  {labels.photograph}: {current.credit.author} · {current.credit.licence} ·{" "}
                  <a
                    href={current.credit.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-gold-600/50 underline-offset-4 hover:text-gold-300"
                  >
                    {labels.sourceLabel}
                  </a>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="border border-ivory-100/25 px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.16em] transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  {labels.previousImage}
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="border border-ivory-100/25 px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.16em] transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  {labels.nextImage}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
