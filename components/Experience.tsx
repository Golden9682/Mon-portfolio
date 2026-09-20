"use client";

import React from "react";
import { experiencesData } from "@/data/experiences";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from "lucide-react";

export function Experience() {
  return (
    <section id="parcours" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Expériences &amp; Formation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Parcours Professionnel &amp; Académique
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Une trajectoire marquée par l&apos;entrepreneuriat numérique, des projets concrets et une solide formation en communication.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12">
          {experiencesData.map((item, idx) => (
            <div key={item.id} className="relative pl-6 md:pl-8 group">
              
              {/* Timeline marker icon */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0d1322] border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                {item.type === "work" ? (
                  <Briefcase className="w-3.5 h-3.5" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </div>

              {/* Period badge (on left for wide screens) */}
              <div className="md:absolute md:-left-36 md:top-2 md:text-right md:w-28 text-xs font-mono text-indigo-400 font-semibold mb-2 md:mb-0">
                {item.period}
              </div>

              {/* Card content */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-hover space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3 text-emerald-400" /> {item.location}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-400">
                  {item.organization}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 pt-2">
                  {item.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {item.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
