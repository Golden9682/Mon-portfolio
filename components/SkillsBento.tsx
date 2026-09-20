"use client";

import React, { useState } from "react";
import { skillCategories, SkillCategory } from "@/data/skills";
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
  ArrowUpRight,
  Compass,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem, m } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RadialScrollGallery } from "@/components/ui/portfolio-and-image-gallery";
import { Badge } from "@/components/ui/badge";
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

const palette: Record<
  Accent,
  {
    icon: string;
    tile: string;
    tag: string;
    tagHi: string;
    glow: string;
    badgeVariant: "emerald" | "indigo" | "amber" | "cyan" | "secondary" | "default";
  }
> = {
  emerald: {
    icon: "text-emerald-400",
    tile: "bg-emerald-500/10 border-emerald-500/20",
    tag: "hover:border-emerald-500/40",
    tagHi: "bg-emerald-500/10 border-emerald-500/30 text-emerald-100",
    glow: "rgba(16, 185, 129, 0.35)",
    badgeVariant: "emerald",
  },
  indigo: {
    icon: "text-indigo-400",
    tile: "bg-indigo-500/10 border-indigo-500/20",
    tag: "hover:border-indigo-500/40",
    tagHi: "bg-indigo-500/10 border-indigo-500/30 text-indigo-100",
    glow: "rgba(99, 102, 241, 0.35)",
    badgeVariant: "indigo",
  },
  amber: {
    icon: "text-amber-400",
    tile: "bg-amber-500/10 border-amber-500/20",
    tag: "hover:border-amber-500/40",
    tagHi: "bg-amber-500/10 border-amber-500/30 text-amber-100",
    glow: "rgba(245, 158, 11, 0.35)",
    badgeVariant: "amber",
  },
  cyan: {
    icon: "text-cyan-400",
    tile: "bg-cyan-500/10 border-cyan-500/20",
    tag: "hover:border-cyan-500/40",
    tagHi: "bg-cyan-500/10 border-cyan-500/30 text-cyan-100",
    glow: "rgba(6, 182, 212, 0.35)",
    badgeVariant: "cyan",
  },
  violet: {
    icon: "text-violet-400",
    tile: "bg-violet-500/10 border-violet-500/20",
    tag: "hover:border-violet-500/40",
    tagHi: "bg-violet-500/10 border-violet-500/30 text-violet-100",
    glow: "rgba(139, 92, 246, 0.35)",
    badgeVariant: "indigo",
  },
  rose: {
    icon: "text-rose-400",
    tile: "bg-rose-500/10 border-rose-500/20",
    tag: "hover:border-rose-500/40",
    tagHi: "bg-rose-500/10 border-rose-500/30 text-rose-100",
    glow: "rgba(244, 63, 94, 0.35)",
    badgeVariant: "secondary",
  },
};

const spans: Record<string, string> = {
  mobile: "lg:col-span-3",
  backend: "lg:col-span-3",
  automation: "lg:col-span-2",
  fintech: "lg:col-span-2",
  devops: "lg:col-span-2",
  communication: "lg:col-span-6",
};

export function SkillsBento() {
  const [viewMode, setViewMode] = useState<"radial" | "bento">("radial");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);

  return (
    <section id="competences" className="py-20 md:py-28 relative overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and View Switcher */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
          <SectionHeader
            accent="cyan"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            eyebrow="Stack & Savoir-Faire"
            title="Compétences & Écosystème Technique"
            description="Un équilibre entre rigueur d'ingénierie logicielle, technologies mobiles actuelles et pragmatisme métier."
            className="xl:max-w-xl"
          />

          {/* Toggle Button: Roue 360° vs Grille Bento */}
          <div className="inline-flex p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] shrink-0 self-start xl:self-end">
            <button
              onClick={() => setViewMode("radial")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300",
                viewMode === "radial"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Roue Orbitale 360°</span>
            </button>

            <button
              onClick={() => setViewMode("bento")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300",
                viewMode === "bento"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grille Bento</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Roue Orbitale 360° (Radial Scroll Gallery) */}
        {viewMode === "radial" && (
          <div className="relative w-full rounded-3xl bg-[#090d16]/80 border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-sm">
            
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-indigo-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Instruction banner */}
            <div className="pt-8 pb-4 flex flex-col items-center justify-center text-center space-y-2 px-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Navigation Interactive 360°
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                Faites défiler la page (scroll) pour faire tourner les compétences sur la roue orbitale et survolez un pôle pour l&apos;explorer.
              </p>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 pt-1">
                <span className="animate-bounce">↓</span> Scrollez pour faire tourner la roue
              </div>
            </div>

            {/* Radial Scroll Gallery component */}
            <RadialScrollGallery
              className="!min-h-[620px] md:!min-h-[680px]"
              baseRadius={460}
              mobileRadius={260}
              visiblePercentage={52}
              scrollDuration={2200}
              onItemSelect={(index) => {
                setActiveCategory(skillCategories[index]);
              }}
            >
              {(hoveredIndex) =>
                skillCategories.map((category, index) => {
                  const Icon = iconMap[category.icon] ?? Zap;
                  const accent = (category.color as Accent) ?? "indigo";
                  const p = palette[accent];
                  const isActive = hoveredIndex === index;

                  return (
                    <div
                      key={category.id}
                      className={cn(
                        "group relative w-[210px] h-[290px] sm:w-[250px] sm:h-[330px] overflow-hidden rounded-2xl bg-[#0d1322] border transition-all duration-500 shadow-xl",
                        isActive
                          ? "border-white/40 shadow-2xl scale-105 ring-2 ring-indigo-500/30"
                          : "border-white/10"
                      )}
                      style={{
                        boxShadow: isActive ? `0 20px 40px -10px ${p.glow}` : undefined,
                      }}
                    >
                      {/* Representative Background Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={category.imageUrl}
                          alt={category.title}
                          className={cn(
                            "h-full w-full object-cover transition-all duration-700 ease-out",
                            isActive ? "scale-110 brightness-95" : "scale-100 brightness-60 grayscale-[30%]"
                          )}
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/80 to-black/40" />
                      </div>

                      {/* Card Content Overlay */}
                      <div className="relative h-full flex flex-col justify-between p-4 sm:p-5 z-10">
                        
                        {/* Top: Badge + Category Icon */}
                        <div className="flex justify-between items-start gap-2">
                          <Badge
                            variant={p.badgeVariant}
                            className="text-[10px] font-mono tracking-tight shadow-md backdrop-blur-md"
                          >
                            {category.badge}
                          </Badge>

                          <div
                            className={cn(
                              "w-8 h-8 rounded-xl p-1.5 flex items-center justify-center border transition-all duration-300 shadow-inner",
                              p.tile
                            )}
                          >
                            <Icon className={cn("w-4 h-4", p.icon)} />
                          </div>
                        </div>

                        {/* Bottom: Title & Top Skill Badges */}
                        <div className="space-y-2.5">
                          <h3 className="text-base sm:text-lg font-bold leading-tight text-white group-hover:text-cyan-300 transition-colors">
                            {category.title}
                          </h3>

                          {/* Skill pills list */}
                          <div className="flex flex-wrap gap-1">
                            {category.skills.slice(0, 3).map((s) => (
                              <span
                                key={s.name}
                                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10"
                              >
                                {s.name}
                              </span>
                            ))}
                            {category.skills.length > 3 && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                                +{category.skills.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Animated bottom border indicator */}
                          <div
                            className={cn(
                              "h-0.5 rounded-full transition-all duration-500",
                              isActive
                                ? "w-full bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-100"
                                : "w-0 opacity-0"
                            )}
                          />
                        </div>

                      </div>
                    </div>
                  );
                })
              }
            </RadialScrollGallery>

          </div>
        )}

        {/* View Mode 2: Grille Bento Complète */}
        {viewMode === "bento" && (
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
                      "group h-full p-6 flex flex-col relative overflow-hidden",
                      wide && "lg:flex-row lg:items-center lg:gap-10"
                    )}
                  >
                    {/* Ambient subtle image thumbnail */}
                    <div className="absolute top-0 right-0 w-36 h-36 opacity-10 rounded-bl-full overflow-hidden pointer-events-none">
                      <img
                        src={category.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

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
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight">{category.title}</h3>
                          <span className="text-[10px] font-mono text-slate-500">{category.badge}</span>
                        </div>
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
        )}

      </div>
    </section>
  );
}
