"use client";

import React from "react";
import { experiencesData } from "@/data/experiences";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/motion";

/*
 * Parcours. Une ligne par étape, la période en marge gauche comme dans un CV
 * imprimé. Pas de cartes, pas de pastilles d'icône : des filets.
 */
export function Experience() {
  return (
    <section id="parcours" data-theme-section="papier" className="relative py-24 md:py-32">
      <div className="frame">
        <SectionHeader
          eyebrow="Expériences & formation"
          title="Parcours professionnel & académique"
          description="Une trajectoire marquée par l'entrepreneuriat numérique, des projets concrets et une solide formation en communication."
          indent={1}
          className="mb-16 md:mb-20"
        />

        <ol className="border-t border-line">
          {experiencesData.map((item, idx) => (
            <Reveal
              key={item.id}
              as="li"
              delay={idx * 0.04}
              amount={0.15}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 py-10 lg:py-14 border-b border-line"
            >
              <div className="lg:col-span-3 flex lg:flex-col gap-x-4 gap-y-2 text-label">
                <span className="text-accent">{item.period}</span>
                <span className="text-faint">{item.type === "work" ? "Expérience" : "Formation"}</span>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-xl sm:text-2xl font-semibold text-ink leading-tight">{item.title}</h3>
                <p className="text-sm text-muted mt-2">
                  {item.organization} · {item.location}
                </p>
                <p className="text-muted leading-relaxed mt-5 text-pretty">{item.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {item.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="grid grid-cols-[1.25rem_1fr] text-sm text-muted leading-relaxed">
                      <span aria-hidden className="text-faint">–</span>
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-mono text-xs text-faint leading-relaxed">{item.badges.join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
