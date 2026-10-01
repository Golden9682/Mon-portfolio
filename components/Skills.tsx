"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/motion";

/*
 * Compétences. Une grille simple, tout est lisible sans cliquer.
 * La roue 3D pilotée au scroll a été retirée (audit passe 2, N2 option B) :
 * cartes inclinées peu lisibles et longue séquence de scroll épinglée.
 * Les compétences en surbrillance dans les données passent en couleur pleine.
 */
export function Skills() {
  return (
    <section id="competences" className="relative py-24 md:py-32">
      <div className="frame">
        <SectionHeader
          eyebrow="Stack & savoir-faire"
          title="Compétences techniques"
          description="Un équilibre entre rigueur d'ingénierie logicielle, technologies mobiles actuelles et pragmatisme métier."
          indent={2}
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={(i % 3) * 0.06} className="border-t border-line pt-6 pb-12">
              <div className="flex items-center gap-4 text-label mb-5">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted">{category.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-ink leading-tight">{category.title}</h3>
              {category.subtitle && <p className="font-mono text-xs text-faint mt-2">{category.subtitle}</p>}
              <p className="text-sm text-muted leading-relaxed mt-4 text-pretty">{category.description}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5 mt-5 text-sm">
                {category.skills.map((skill, j) => (
                  <li key={skill.name} className={skill.highlight ? "text-ink" : "text-faint"}>
                    {skill.name}
                    {j < category.skills.length - 1 && <span className="text-line-strong ml-3" aria-hidden>/</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
