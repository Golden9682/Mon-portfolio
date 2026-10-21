"use client";

import React, { useEffect, useRef } from "react";

/**
 * Révélation de texte ligne par ligne (MOTION-CRAFT §3.4) : chaque ligne
 * monte depuis le bas d'un masque quand le titre entre dans l'écran.
 *
 * Le texte est rendu tel quel côté serveur ; le découpage n'arrive qu'après
 * le chargement de GSAP. Sans JS, sans hydratation à temps (`data-js`
 * retiré par le filet de sécurité) ou en mouvement réduit : rien n'est
 * découpé, le titre reste simplement affiché.
 *
 * `autoSplit` redécoupe quand les polices arrivent ou que la largeur change,
 * sinon les coupures de lignes seraient celles de la police de secours.
 * Un titre déjà visible au moment du découpage (rechargement en milieu de
 * page) n'est pas rejoué : on ne cache pas un texte que l'on est en train de lire.
 */
type Tag = "h2" | "h3" | "p";

export function SplitReveal({
  as = "h2",
  className,
  children,
}: {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.hasAttribute("data-js")) return;

    let cancelled = false;
    let revert = () => {};

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      // Déjà à l'écran ? On laisse le texte en place.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            // 160 % et non 110 % : le masque a de la marge (globals.css) pour
            // ne pas rogner accents et cédilles ; à 110 %, le haut des lettres
            // dépassait dans cette marge avant l'entrée.
            yPercent: 160,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }),
      });
      revert = () => split.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  const Component = as as React.ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
