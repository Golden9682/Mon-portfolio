"use client";

import React, { useEffect, useRef } from "react";

/**
 * Parallaxe de scroll à plusieurs plans (MOTION-CRAFT §3.5).
 *
 * Chaque descendant `[data-speed]` glisse verticalement à sa propre vitesse
 * pendant que la zone traverse l'écran : plus la valeur est grande, plus le
 * plan semble proche. Le rendu serveur reste statique et complet ; ce
 * composant n'ajoute qu'une couche.
 *
 * - `prefers-reduced-motion` : aucune parallaxe.
 * - Écran tactile ou étroit : amplitude divisée par deux (§5 Mobile).
 * - GSAP est chargé à la demande, après le premier rendu.
 */
export function ParallaxScope({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const coarse = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;
      const amplitude = coarse ? 0.5 : 1;

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-speed]", scope).forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0") * amplitude;
          gsap.to(el, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
          });
        });
      }, scope);

      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
