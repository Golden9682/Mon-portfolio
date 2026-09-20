"use client";

import React from "react";
import { experiencesData } from "@/data/experiences";
import { Briefcase, GraduationCap, MapPin, CheckCircle2, Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, m } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="parcours" className="py-20 md:py-28 relative">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          accent="emerald"
          icon={<Award className="w-3.5 h-3.5" />}
          eyebrow="Expériences & Formation"
          title="Parcours Professionnel & Académique"
          description="Une trajectoire marquée par l'entrepreneuriat numérique, des projets concrets et une solide formation en communication."
          className="mb-16"
        />

        {/* Timeline */}
        <div className="relative ml-4 md:ml-36">
          {/* Vertical line: static base + animated gradient fill */}
          <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.08]" />
          <m.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400/0"
          />

          <ol className="space-y-10 md:space-y-12">
            {experiencesData.map((item, idx) => {
              const isWork = item.type === "work";
              const accent = isWork ? "indigo" : "cyan";

              return (
                <Reveal
                  key={item.id}
                  as="li"
                  delay={idx * 0.05}
                  amount={0.2}
                  className="relative pl-8 md:pl-10 group"
                >
                  {/* Timeline marker */}
                  <div
                    className={cn(
                      "absolute -left-[15px] top-1 w-[30px] h-[30px] rounded-full bg-[#0d1322] border-2 flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:scale-110",
                      isWork
                        ? "border-indigo-500 text-indigo-400 shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
                        : "border-cyan-500 text-cyan-400 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
                    )}
                  >
                    {isWork ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                  </div>

                  {/* Period (left column on wide screens) */}
                  <div className="md:absolute md:-left-[9.5rem] md:top-1.5 md:w-28 md:text-right mb-3 md:mb-0">
                    <span
                      className={cn(
                        "inline-block text-xs font-mono font-semibold",
                        isWork ? "text-indigo-300" : "text-cyan-300"
                      )}
                    >
                      {item.period}
                    </span>
                    <span
                      className={cn(
                        "block mt-1 text-[10px] uppercase tracking-[0.15em] font-semibold",
                        isWork ? "text-indigo-500/80" : "text-cyan-500/80"
                      )}
                    >
                      {isWork ? "Expérience" : "Formation"}
                    </span>
                  </div>

                  {/* Card content */}
                  <SpotlightCard accent={accent} className="p-6 sm:p-7 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-indigo-200">
                          {item.title}
                        </h3>
                        <div className="text-sm font-medium text-slate-400 mt-1">{item.organization}</div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md shrink-0">
                        <MapPin className="w-3 h-3 text-emerald-400" /> {item.location}
                      </span>
                    </div>

                    <p className="text-slate-300/90 text-sm leading-relaxed text-pretty">{item.description}</p>

                    {/* Bullet points */}
                    <ul className="space-y-2.5 pt-1">
                      {item.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <CheckCircle2
                            className={cn("w-4 h-4 mt-0.5 shrink-0", isWork ? "text-indigo-400" : "text-cyan-400")}
                          />
                          <span className="text-pretty">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 transition-colors hover:border-white/15 hover:text-white"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
