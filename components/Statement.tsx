import React from "react";

/*
 * Respiration (MOTION-CRAFT §4, rythme vertical). Après la section la plus
 * dense, une seule phrase et beaucoup de vide avant de repartir.
 * Deuxième des 2 à 4 usages de la voix d'accent sur le site.
 */
export function Statement() {
  return (
    <section aria-label="Manière de travailler" className="relative py-40 md:py-64">
      <div className="frame">
        <p className="lg:ml-[16.666%] font-display uppercase text-ink leading-[0.95] tracking-[-0.03em] text-[clamp(3rem,9vw,9rem)]">
          Le code,
          <br />
          ça se <em className="text-accent-word text-accent">montre.</em>
        </p>
      </div>
    </section>
  );
}
