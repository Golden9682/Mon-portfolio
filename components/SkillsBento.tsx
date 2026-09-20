"use client";

import React, { useState } from "react";
import { skillCategories, SkillCategory } from "@/data/skills";
import { RadialScrollGallery } from "@/components/ui/portfolio-and-image-gallery";
import { Badge } from "@/components/ui/badge";
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
  LayoutGrid,
  Disc3,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem, m } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatePresence } from "framer-motion";
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

const palette: Record<Accent, { icon: string; tile: string; tag: string; tagHi: string; border: string; glow: string }> = {
  emerald: {
    icon: "text-emerald-400",
    tile: "bg-emerald-500/10 border-emerald-500/20",
    tag: "hover:border-emerald-500/40",
    tagHi: "bg-emerald-500/10 border-emerald-500/30 text-emerald-100",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  indigo: {
    icon: "text-indigo-400",
    tile: "bg-indigo-500/10 border-indigo-500/20",
    tag: "hover:border-indigo-500/40",
    tagHi: "bg-indigo-500/10 border-indigo-500/30 text-indigo-100",
    border: "border-indigo-500/30",
    glow: "shadow-indigo-500/20",
  },
  amber: {
    icon: "text-amber-400",
    tile: "bg-amber-500/10 border-amber-500/20",
    tag: "hover:border-amber-500/40",
    tagHi: "bg-amber-500/10 border-amber-500/30 text-amber-100",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
  },
  cyan: {
    icon: "text-cyan-400",
    tile: "bg-cyan-500/10 border-cyan-500/20",
    tag: "hover:border-cyan-500/40",
    tagHi: "bg-cyan-500/10 border-cyan-500/30 text-cyan-100",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
  },
  violet: {
    icon: "text-violet-400",
    tile: "bg-violet-500/10 border-violet-500/20",
    tag: "hover:border-violet-500/40",
    tagHi: "bg-violet-500/10 border-violet-500/30 text-violet-100",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
  },
  rose: {
    icon: "text-rose-400",
    tile: "bg-rose-500/10 border-rose-500/20",
    tag: "hover:border-rose-500/40",
    tagHi: "bg-rose-500/10 border-rose-500/30 text-rose-100",
    border: "border-rose-500/30",
    glow: "shadow-rose-500/20",
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
  const [viewMode, setViewMode] = useState<"wheel" | "grid">("wheel");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);

  return (
    <section id="competences" className="py-20 md:py-28 relative overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeader
            align="left"
            accent="cyan"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            eyebrow="Stack & Savoir-Faire"
            title="Compétences & Écosystème Technique"
            description="Un équilibre entre rigueur d'ingénierie logicielle, technologies mobiles actuelles et pragmatisme métier."
            className="md:max-w-2xl"
          />

          {/* View Switcher Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode("wheel")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300",
                viewMode === "wheel"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
              title="Galerie radiale 3D"
            >
              <Disc3 className={cn("w-4 h-4", viewMode === "wheel" && "animate-spin-slow")} />
              <span>Roue Radiale 3D</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300",
                viewMode === "grid"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
              title="Grille Bento détaillée"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grille Bento</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Interactive Radial Scroll Gallery */}
        {viewMode === "wheel" ? (
          <div className="relative w-full rounded-3xl bg-[#090d16]/70 border border-white/[0.08] backdrop-blur-md overflow-hidden p-2 sm:p-6 shadow-2xl">
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Scroll Hint */}
            <div className="flex flex-col items-center justify-center pt-6 pb-2 text-center relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-2 inline-flex items-center gap-1.5">
                <Disc3 className="w-3 h-3 animate-spin-slow" /> Galerie Radiale Interactive
              </span>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md">
                Faites défiler la page pour faire pivoter la roue 3D et survolez les cartes pour découvrir chaque écosystème.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2 animate-bounce">
                <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                <span>Défilez vers le bas</span>
              </div>
            </div>

            {/* GSAP Radial Scroll Gallery Wheel */}
            <RadialScrollGallery
              className="!min-h-[580px] sm:!min-h-[660px]"
              baseRadius={460}
              mobileRadius={240}
              visiblePercentage={52}
              scrollDuration={2200}
              onItemSelect={(index) => setActiveCategory(skillCategories[index])}
            >
              {(hoveredIndex) =>
                skillCategories.map((cat, index) => {
                  const isActive = hoveredIndex === index;
                  const Icon = iconMap[cat.icon] ?? Zap;
                  const accent = (cat.color as Accent) ?? "indigo";
                  const p = palette[accent];

                  return (
                    <div
                      key={cat.id}
                      className={cn(
                        "group relative w-[210px] h-[290px] sm:w-[260px] sm:h-[350px] overflow-hidden rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-500 ease-out",
                        isActive
                          ? cn("bg-slate-900/95 border-indigo-400/50 shadow-indigo-500/30 scale-105", p.border)
                          : "bg-slate-950/90 border-white/10 hover:border-white/20"
                      )}
                    >
                      {/* Background Visual Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className={cn(
                            "h-full w-full object-cover transition-all duration-700 ease-out",
                            isActive ? "scale-110 blur-0 opacity-80" : "scale-100 blur-[1px] opacity-40 grayscale-[20%]"
                          )}
                        />
                        {/* High Quality Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/75 to-transparent" />
                      </div>

                      {/* Card Foreground Content */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 z-10">
                        {/* Top Category Badge & Icon */}
                        <div className="flex justify-between items-start gap-2">
                          <Badge
                            variant="secondary"
                            className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 bg-black/60 border border-white/15 text-slate-200 backdrop-blur-md shadow-md"
                          >
                            {cat.badge}
                          </Badge>

                          <div
                            className={cn(
                              "w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all duration-500 border backdrop-blur-md shadow-lg",
                              isActive
                                ? "bg-indigo-600 text-white border-indigo-400 scale-110 rotate-0 shadow-indigo-600/40"
                                : "bg-black/50 text-slate-300 border-white/10 -rotate-12"
                            )}
                          >
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>

                        {/* Middle/Bottom Title & Skills Preview */}
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white leading-tight tracking-tight drop-shadow-md">
                              {cat.title}
                            </h3>
                            {cat.subtitle && (
                              <p className="text-[11px] sm:text-xs text-indigo-300 font-medium line-clamp-1 mt-0.5">
                                {cat.subtitle}
                              </p>
                            )}
                          </div>

                          {/* Skill Tags Preview */}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {cat.skills.slice(0, 3).map((s) => (
                              <span
                                key={s.name}
                                className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-200 backdrop-blur"
                              >
                                {s.name}
                              </span>
                            ))}
                            {cat.skills.length > 3 && (
                              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                                +{cat.skills.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Animated underline indicator */}
                          <div
                            className={cn(
                              "h-0.5 bg-gradient-to-r from-indigo-400 to-cyan-400 mt-2 transition-all duration-500 rounded-full",
                              isActive ? "w-full opacity-100" : "w-0 opacity-0"
                            )}
                          />

                          {/* Action CTA */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-slate-400 font-medium group-hover:text-white transition-colors">
                              Cliquer pour détailler
                            </span>
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                              <ArrowUpRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </RadialScrollGallery>
          </div>
        ) : (
          /* View Mode 2: Detailed Bento Grid */
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
                      "group h-full p-6 flex flex-col cursor-pointer transition-all duration-300 hover:border-white/20",
                      wide && "lg:flex-row lg:items-center lg:gap-10"
                    )}
                    onClick={() => setActiveCategory(category)}
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
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight">{category.title}</h3>
                          {category.subtitle && (
                            <span className="text-[11px] text-indigo-300 font-medium block">
                              {category.subtitle}
                            </span>
                          )}
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
                      <div className="mt-auto pt-5 flex items-center justify-between text-[11px] text-slate-500 border-t border-white/[0.04]">
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span>Maîtrisé &amp; éprouvé en production</span>
                        </span>
                        <span className="text-indigo-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Détails <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        {/* Detailed Skill Category Modal */}
        <AnimatePresence>
          {activeCategory && (
            <m.div
              key="skill-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            >
              <m.div
                key="skill-modal-content"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl bg-[#0d1322] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
              >
                {/* Visual Header Image Banner */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/60 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white hover:bg-black/80 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Badge & Title */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <Badge className="mb-2 bg-indigo-600 text-white font-semibold shadow-md">
                        {activeCategory.badge}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {activeCategory.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-7 space-y-6">
                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activeCategory.description}
                  </p>

                  {/* Complete List of Technologies & Tools */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Technologies &amp; Maîtrise Approfondie
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeCategory.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 text-xs"
                        >
                          <span className="p-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className={cn(skill.highlight && "font-semibold text-white")}>
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
