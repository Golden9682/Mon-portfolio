"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import {
  Smartphone,
  Server,
  Cpu,
  CreditCard,
  Wrench,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

type Accent = "emerald" | "indigo" | "amber" | "cyan" | "violet" | "rose";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Server,
  Cpu,
  CreditCard,
  Wrench,
  MessageSquare,
};

const palette: Record<Accent, { icon: string; tile: string; tag: string; tagHi: string }> = {
  emerald: {
    icon: "text-emerald-400",
    tile: "bg-emerald-500/10 border-emerald-500/20",
    tag: "hover:border-emerald-500/40",
    tagHi: "bg-emerald-500/10 border-emerald-500/30 text-emerald-100",
  },
  indigo: {
    icon: "text-indigo-400",
    tile: "bg-indigo-500/10 border-indigo-500/20",
    tag: "hover:border-indigo-500/40",
    tagHi: "bg-indigo-500/10 border-indigo-500/30 text-indigo-100",
  },
  amber: {
    icon: "text-amber-400",
    tile: "bg-amber-500/10 border-amber-500/20",
    tag: "hover:border-amber-500/40",
    tagHi: "bg-amber-500/10 border-amber-500/30 text-amber-100",
  },
  cyan: {
    icon: "text-cyan-400",
    tile: "bg-cyan-500/10 border-cyan-500/20",
    tag: "hover:border-cyan-500/40",
    tagHi: "bg-cyan-500/10 border-cyan-500/30 text-cyan-100",
  },
  violet: {
    icon: "text-violet-400",
    tile: "bg-violet-500/10 border-violet-500/20",
    tag: "hover:border-violet-500/40",
    tagHi: "bg-violet-500/10 border-violet-500/30 text-violet-100",
  },
  rose: {
    icon: "text-rose-400",
    tile: "bg-rose-500/10 border-rose-500/20",
    tag: "hover:border-rose-500/40",
    tagHi: "bg-rose-500/10 border-rose-500/30 text-rose-100",
  },
};

/* Asymmetric bento layout on a 6-column grid:
   row 1 → 3 + 3 · row 2 → 2 + 2 + 2 · row 3 → 6 (wide) */
const spans: Record<string, string> = {
  mobile: "lg:col-span-3",
  backend: "lg:col-span-3",
  automation: "lg:col-span-2",
  fintech: "lg:col-span-2",
  devops: "lg:col-span-2",
  communication: "lg:col-span-6",
};

export function SkillsBento() {
  return (
    <section id="competences" className="py-20 md:py-28 relative">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          accent="cyan"
          icon={<Sparkles className="w-3.5 h-3.5" />}
          eyebrow="Stack & Savoir-Faire"
          title="Compétences & Écosystème Technique"
          description="Un équilibre entre rigueur d'ingénierie logicielle, technologies mobiles actuelles et pragmatisme métier."
          className="mb-14"
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] ?? Zap;
            const accent = (category.color as Accent) ?? "indigo";
            const p = palette[accent];
            const wide = category.id === "communication";

            return (
              <StaggerItem
                key={category.id}
                className={cn("h-full", spans[category.id] ?? "lg:col-span-2", wide && "md:col-span-2")}
              >
                <SpotlightCard
                  accent={accent}
                  className={cn(
                    "group h-full p-6 flex flex-col",
                    wide && "lg:flex-row lg:items-center lg:gap-10"
                  )}
                >
                  <div className={cn(wide && "lg:w-1/3 lg:shrink-0")}>
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "p-2.5 rounded-xl border transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-3",
                          p.tile
                        )}
                      >
                        <Icon className={cn("w-5 h-5", p.icon)} />
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{category.title}</h3>
                    </div>

                    {/* Category Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-5 text-pretty">
                      {category.description}
                    </p>
                  </div>

                  <div className={cn("flex flex-col flex-1", wide && "lg:w-2/3")}>
                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={cn(
                            "text-xs px-2.5 py-1.5 rounded-lg font-medium border transition-all duration-300 hover:-translate-y-0.5",
                            skill.highlight
                              ? p.tagHi
                              : "bg-white/[0.03] text-slate-300 border-white/[0.06]",
                            p.tag
                          )}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>

                    {/* Bottom indicator */}
                    <div className="mt-auto pt-5 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Maîtrisé &amp; éprouvé en production</span>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
