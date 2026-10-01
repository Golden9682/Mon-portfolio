"use client";

import { useEffect } from "react";

/**
 * Moteur de défilement (MOTION-CRAFT §3.1 et §3.2).
 *
 * - Lenis donne l'inertie à la molette (lerp 0.1). Le tactile garde le
 *   défilement natif. Aucune prise d'otage : clavier, barre de défilement et
 *   liens d'ancre fonctionnent normalement.
 * - Chaque section porte `data-theme-section` ; quand elle passe sous la ligne
 *   des 55 % de l'écran, <html> prend son thème. Les couleurs étant des
 *   @property (globals.css), toute la page glisse d'un thème à l'autre.
 * - Mouvement réduit : pas de Lenis, mais les thèmes basculent quand même
 *   (ce n'est pas du mouvement), sans transition.
 * - Quand une modale ou le menu mobile bloque le défilement de la page
 *   (`body { overflow: hidden }`), Lenis est mis en pause.
 *
 * Tout est chargé après le premier rendu : le hero n'attend rien de ce module.
 */
export function ScrollEngine() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1. Inertie
      let lenis: import("lenis").default | null = null;
      let tick: ((time: number) => void) | null = null;
      if (!reduce) {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        // anchors : Lenis reprend le scroll-padding-top (88 px) de globals.css,
        // comme le défilement natif : aucun décalage à ajouter.
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      // 2. Thèmes au scroll
      const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-theme-section]")).map(
        (section) =>
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: ({ isActive }) => {
              if (isActive) root.dataset.theme = section.dataset.themeSection;
            },
          })
      );

      // 3. Pause quand la page est verrouillée (modale, menu mobile)
      const lockObserver = new MutationObserver(() => {
        if (!lenis) return;
        if (document.body.style.overflow === "hidden") lenis.stop();
        else lenis.start();
      });
      lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });

      // Positions justes une fois les polices chargées (§3.3)
      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      cleanup = () => {
        lockObserver.disconnect();
        triggers.forEach((t) => t.kill());
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        delete root.dataset.theme;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
