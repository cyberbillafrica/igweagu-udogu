"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CloseIcon, PlayIcon } from "@/components/ui/icons";
import { houseFilm } from "@/content/media";
import type { Dictionary } from "@/i18n/get-dictionary";

type FilmProps = {
  film: Dictionary["film"];
};

/**
 * The house's film, presented directly under the hero.
 *
 * The still is the film's own opening frame (`#t=0.5` asks the browser for a
 * frame just inside the file, so the thumbnail is never a blank first frame),
 * and the full recording only loads when the dialog opens. The dialog traps
 * nothing but closes on Escape, on the close control, or on the backdrop, and
 * returns focus to the button that opened it.
 */
export function Film({ film }: FilmProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
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
  }, [open, close]);

  return (
    <section
      id="film"
      aria-labelledby="film-title"
      className="relative isolate overflow-hidden bg-royal-950 text-ivory-100"
    >
      <div aria-hidden="true" className="absolute inset-0 motif opacity-[0.06]" />

      <div className="container-page relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="eyebrow eyebrow--on-dark">{film.eyebrow}</p>
          <h2 id="film-title" className="display-2 mt-5 max-w-sm text-balance text-ivory-50">
            {film.heading}
          </h2>
          <p className="mt-5 max-w-sm text-[0.98rem] leading-[1.75] text-ivory-200/85">
            {film.body}
          </p>
          <p className="mt-8 max-w-sm border-t border-ivory-100/15 pt-5 text-[0.62rem] leading-relaxed tracking-[0.06em] text-ivory-300/70">
            {film.note}
          </p>
        </div>

        <figure className="group relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={film.cta}
            className="relative block w-full overflow-hidden bg-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-royal-950"
          >
            {/* The recording is pillarboxed 4:3, so the still is scaled past
                its own black bars to fill the 16:9 frame. */}
            <video
              src={houseFilm.previewSrc}
              preload="metadata"
              muted
              playsInline
              aria-hidden="true"
              tabIndex={-1}
              className="aspect-video w-full scale-[1.34] object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-90"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,22,44,0.9)_0%,rgba(6,22,44,0.25)_45%,rgba(6,22,44,0.15)_100%)]"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-300/70 bg-royal-950/40 text-gold-200 backdrop-blur-[2px] transition-colors duration-300 group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-charcoal-950 md:h-20 md:w-20">
                <PlayIcon className="h-5 w-5 translate-x-[1px] md:h-6 md:w-6" />
              </span>
              <span className="px-6 text-center text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-ivory-50">
                {film.cta}
              </span>
            </span>
          </button>

          <figcaption className="mt-3 flex items-center justify-between gap-4 text-[0.55rem] uppercase tracking-[0.16em] text-ivory-300/60">
            <span>{film.label}</span>
            <span>{film.format}</span>
          </figcaption>
        </figure>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={film.modalLabel}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-royal-950/95 p-4 backdrop-blur-sm md:p-8"
          onClick={close}
        >
          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 pb-3">
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-ivory-200/70">
                {film.modalLabel}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex min-h-[2.75rem] items-center gap-2 border border-ivory-100/25 px-4 py-3 text-[0.58rem] uppercase tracking-[0.18em] text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <CloseIcon className="h-3.5 w-3.5" />
                {film.close}
              </button>
            </div>

            <video
              src={houseFilm.src}
              controls
              autoPlay
              playsInline
              className="max-h-[76svh] w-full bg-black object-contain"
            >
              {film.unsupported}
            </video>
          </div>
        </div>
      ) : null}
    </section>
  );
}
