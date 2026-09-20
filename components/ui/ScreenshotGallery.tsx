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
          <div className="relative w-full max-w-2xl bg-[#0c111d] rounded-2xl p-2.5 sm:p-3 border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(99,102,241,0.25)] overflow-hidden ring-1 ring-white/15">
            <div className="relative w-full bg-[#090d16] rounded-xl overflow-hidden flex flex-col border border-white/10 shadow-inner">
              <div className="h-8 bg-slate-900/95 border-b border-white/10 px-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/50 border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10 text-[11px] text-slate-300 font-mono max-w-[300px] truncate transition-colors"
                    title="Ouvrir le site en direct"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-slate-400">https://</span>
                    <span className="text-indigo-300 font-semibold truncate">{url}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-300 shrink-0" />
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/50 border border-white/10 text-[11px] text-slate-300 font-mono max-w-[300px] truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-slate-400">http://</span>
                    <span className="text-indigo-300 font-semibold truncate">{url}</span>
                  </div>
                )}

                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline shrink-0">
                  {many ? `${index + 1} / ${count}` : "1080p HD"}
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">{slide}</div>
            </div>
          </div>
        ) : (
          /* Phone frame */
          <div className="relative w-full h-[520px] bg-[#0c111d] rounded-[42px] p-2.5 border-[5px] border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.2)] overflow-hidden ring-1 ring-white/10">
            <div className="relative w-full h-full bg-[#090d16] rounded-[34px] overflow-hidden flex flex-col justify-between border border-white/10">
              <div className="relative z-20 pt-2 px-5 flex items-center justify-between text-[10px] text-white/80 font-medium">
                <span>9:41</span>
                <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end px-1.5 gap-1 border border-white/10 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                </div>
                <span className="text-[10px] text-white/60">5G</span>
              </div>

              <div className="absolute inset-0 pt-7 pb-4 px-1">{slide}</div>

              <div className="relative z-20 pb-1.5 flex justify-center">
                <div className="w-24 h-1 bg-white/40 rounded-full" />
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-full p-2 rounded-full bg-[#0d1322] border border-white/10 text-slate-300 hover:text-white hover:border-indigo-400/50 shadow-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Capture suivante"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-full p-2 rounded-full bg-[#0d1322] border border-white/10 text-slate-300 hover:text-white hover:border-indigo-400/50 shadow-lg transition-colors"
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
                  ? "border-indigo-400 ring-2 ring-indigo-500/30 opacity-100"
                  : "border-white/10 opacity-50 hover:opacity-90 hover:border-white/30"
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
