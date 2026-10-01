"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { m } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

interface ScreenshotGalleryProps {
  images: string[];
  title: string;
  layout: "mobile" | "desktop";
  /** Shown in the browser address bar of the desktop frame. */
  url?: string;
  /** When set, the address bar becomes a real link. */
  liveUrl?: string;
}

/**
 * Device-framed screenshot gallery with thumbnails and keyboard arrows.
 * Mobile layout: phone frame. Desktop layout: browser window.
 */
export function ScreenshotGallery({ images, title, layout, url, liveUrl }: ScreenshotGalleryProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const many = count > 1;

  // Start over whenever a different set of screenshots comes in.
  const imagesKey = images.join("|");
  useEffect(() => setIndex(0), [imagesKey]);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [many, go]);

  const slide = (
    <AnimatePresence mode="wait" initial={false}>
      <m.img
        key={images[index]}
        src={images[index]}
        alt={`${title} — capture ${index + 1} sur ${count}`}
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("w-full h-full object-cover object-top", layout === "mobile" && "rounded-2xl")}
      />
    </AnimatePresence>
  );

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className={cn("relative w-full flex justify-center", layout === "mobile" && "max-w-[280px]")}>
        {layout === "desktop" ? (
          /* Browser window */
          <div className="relative w-full max-w-2xl bg-raise rounded-2xl p-2.5 sm:p-3 border border-line-strong overflow-hidden ring-1 ring-line">
            <div className="relative w-full bg-bg rounded-xl overflow-hidden flex flex-col border border-line shadow-inner">
              <div className="h-8 bg-raise/95 border-b border-line px-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-soft inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-soft inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-soft inline-block" />
                </div>

                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-bg/70 border border-line hover:border-accent-line hover:bg-accent-soft text-[11px] text-muted font-mono max-w-[300px] truncate transition-colors"
                    title="Ouvrir le site en direct"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted">https://</span>
                    <span className="text-accent font-semibold truncate">{url}</span>
                    <ExternalLink className="w-3 h-3 text-faint group-hover:text-accent shrink-0" />
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-bg/70 border border-line text-[11px] text-muted font-mono max-w-[300px] truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted">http://</span>
                    <span className="text-accent font-semibold truncate">{url}</span>
                  </div>
                )}

                <span className="text-[10px] font-mono text-faint hidden sm:inline shrink-0">
                  {many ? `${index + 1} / ${count}` : "1080p HD"}
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-raise">{slide}</div>
            </div>
          </div>
        ) : (
          /* Phone frame */
          <div className="relative w-full h-[520px] bg-raise rounded-[42px] p-2.5 border-[5px] border-line-strong overflow-hidden ring-1 ring-line">
            <div className="relative w-full h-full bg-bg rounded-[34px] overflow-hidden flex flex-col justify-between border border-line">
              <div className="relative z-20 pt-2 px-5 flex items-center justify-between text-[10px] text-ink/80 font-medium">
                <span>9:41</span>
                <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end px-1.5 gap-1 border border-line shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                </div>
                <span className="text-[10px] text-ink/60">5G</span>
              </div>

              <div className="absolute inset-0 pt-7 pb-4 px-1">{slide}</div>

              <div className="relative z-20 pb-1.5 flex justify-center">
                <div className="w-24 h-1 bg-line-strong rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Arrows */}
        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Capture précédente"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-full p-2 rounded-full bg-raise border border-line text-muted hover:text-ink hover:border-accent-line shadow-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Capture suivante"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-full p-2 rounded-full bg-raise border border-line text-muted hover:text-ink hover:border-accent-line shadow-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {many && (
        <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Captures d'écran">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Capture ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "relative overflow-hidden rounded-lg border transition-all duration-300",
                layout === "mobile" ? "w-10 h-[4.3rem]" : "w-20 h-12",
                i === index
                  ? "border-accent-line ring-2 opacity-100"
                  : "border-line opacity-50 hover:opacity-90 hover:border-line-strong"
              )}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
