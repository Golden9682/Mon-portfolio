"use client";

import React, { useState, useRef, useEffect } from "react";
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
  List,
  Compass,
  LayoutGrid,
  Layers,
  ChevronRight,
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
    accentColor: string;
    badgeVariant: "emerald" | "indigo" | "amber" | "cyan" | "secondary" | "default";
  }
> = {
  emerald: {
    icon: "text-emerald-400",
    tile: "bg-emerald-500/10 border-emerald-500/20",
    tag: "hover:border-emerald-500/40",
    tagHi: "bg-emerald-500/10 border-emerald-500/30 text-emerald-100",
    glow: "rgba(16, 185, 129, 0.4)",
    accentColor: "#10b981",
    badgeVariant: "emerald",
  },
  indigo: {
    icon: "text-indigo-400",
    tile: "bg-indigo-500/10 border-indigo-500/20",
    tag: "hover:border-indigo-500/40",
    tagHi: "bg-indigo-500/10 border-indigo-500/30 text-indigo-100",
    glow: "rgba(99, 102, 241, 0.4)",
    accentColor: "#6366f1",
    badgeVariant: "indigo",
  },
  amber: {
    icon: "text-amber-400",
    tile: "bg-amber-500/10 border-amber-500/20",
    tag: "hover:border-amber-500/40",
    tagHi: "bg-amber-500/10 border-amber-500/30 text-amber-100",
    glow: "rgba(245, 158, 11, 0.4)",
    accentColor: "#f59e0b",
    badgeVariant: "amber",
  },
  cyan: {
    icon: "text-cyan-400",
    tile: "bg-cyan-500/10 border-cyan-500/20",
    tag: "hover:border-cyan-500/40",
    tagHi: "bg-cyan-500/10 border-cyan-500/30 text-cyan-100",
    glow: "rgba(6, 182, 212, 0.4)",
    accentColor: "#06b6d4",
    badgeVariant: "cyan",
  },
  violet: {
    icon: "text-violet-400",
    tile: "bg-violet-500/10 border-violet-500/20",
    tag: "hover:border-violet-500/40",
    tagHi: "bg-violet-500/10 border-violet-500/30 text-violet-100",
    glow: "rgba(139, 92, 246, 0.4)",
    accentColor: "#8b5cf6",
    badgeVariant: "indigo",
  },
  rose: {
    icon: "text-rose-400",
    tile: "bg-rose-500/10 border-rose-500/20",
    tag: "hover:border-rose-500/40",
    tagHi: "bg-rose-500/10 border-rose-500/30 text-rose-100",
    glow: "rgba(244, 63, 94, 0.4)",
    accentColor: "#f43f5e",
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
  const [viewMode, setViewMode] = useState<"lumina" | "radial" | "bento">("lumina");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Smooth lerp physics for cursor following preview card
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <section id="competences" className="py-20 md:py-28 relative overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & View Controls */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
          <SectionHeader
            accent="cyan"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            eyebrow="Stack & Savoir-Faire"
            title="Compétences & Écosystème Technique"
            description="Un équilibre entre rigueur d'ingénierie logicielle, technologies mobiles actuelles et pragmatisme métier."
            className="xl:max-w-xl"
          />

          {/* View Mode Switcher: Lumina Interactive List · Roue 360° · Grille Bento */}
          <div className="inline-flex flex-wrap p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] shrink-0 self-start xl:self-end gap-1">
            <button
              onClick={() => setViewMode("lumina")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-300",
                viewMode === "lumina"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
              title="Liste interactive Quiet Luxury avec aperçu au survol"
            >
              <List className="w-3.5 h-3.5" />
              <span>Liste Lumina</span>
            </button>

            <button
              onClick={() => setViewMode("radial")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-300",
                viewMode === "radial"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
              title="Roue orbitale 360 degrés animée au scroll"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Roue 360°</span>
            </button>

            <button
              onClick={() => setViewMode("bento")}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-300",
                viewMode === "bento"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
              title="Grille Bento détaillée"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grille Bento</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Lumina Interactive List (Modèle 21st.dev) */}
        {viewMode === "lumina" && (
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full rounded-3xl bg-[#090d16]/80 border border-white/[0.08] p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-sm"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Floating Visual Preview Card following the cursor (Desktop >= lg) */}
            <div
              className="pointer-events-none fixed z-50 hidden lg:block overflow-hidden transition-all duration-300"
              style={{
                left: containerRef.current?.getBoundingClientRect().left ?? 0,
                top: containerRef.current?.getBoundingClientRect().top ?? 0,
                transform: `translate3d(${smoothPosition.x + 35}px, ${smoothPosition.y - 130}px, 0)`,
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.85,
                transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), scale 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.12s ease-out",
              }}
            >
              {hoveredIndex !== null && (
                <div
                  className="relative w-[360px] h-[240px] bg-[#0c111d] rounded-2xl p-2 border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(99,102,241,0.3)] ring-1 ring-white/20 overflow-hidden"
                  style={{
                    boxShadow: `0 25px 60px -15px rgba(0,0,0,0.95), 0 0 35px ${palette[(skillCategories[hoveredIndex].color as Accent) ?? "indigo"].glow}`,
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex flex-col justify-between p-4">
                    
                    {/* Background image */}
                    <img
                      src={skillCategories[hoveredIndex].imageUrl}
                      alt={skillCategories[hoveredIndex].title}
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-60 scale-105 transition-transform duration-700"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-black/50" />

                    {/* Top row inside floating card */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/60 border border-white/20 text-cyan-300 backdrop-blur-md">
                        {skillCategories[hoveredIndex].badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        0{hoveredIndex + 1} / 0{skillCategories.length}
                      </span>
                    </div>

                    {/* Bottom row inside floating card */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{
                            backgroundColor: palette[(skillCategories[hoveredIndex].color as Accent) ?? "indigo"].accentColor,
                          }}
                        />
                        <h4 className="text-white font-bold text-base leading-tight">
                          {skillCategories[hoveredIndex].title}
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {skillCategories[hoveredIndex].skills.slice(0, 3).map((s) => (
                          <span
                            key={s.name}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/15 text-slate-100 border border-white/10"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Quiet Luxury Interactive List */}
            <div className="space-y-0">
              {skillCategories.map((category, index) => {
                const isHovered = hoveredIndex === index;
                const Icon = iconMap[category.icon] ?? Zap;
                const accent = (category.color as Accent) ?? "indigo";
                const p = palette[accent];

                return (
                  <div
                    key={category.id}
                    className="group block cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative py-6 sm:py-7 border-t border-white/[0.08] transition-all duration-300 ease-out">
                      
                      {/* Background highlight on hover */}
                      <div
                        className={cn(
                          "absolute inset-0 -mx-3 px-3 sm:-mx-4 sm:px-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl transition-all duration-300 ease-out",
                          isHovered ? "opacity-100 scale-100 shadow-lg shadow-black/20" : "opacity-0 scale-[0.98] pointer-events-none"
                        )}
                      />

                      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                        
                        {/* Left: Number + Icon + Title & Description */}
                        <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                          
                          {/* Number 01–06 in quiet luxury typography */}
                          <span
                            className={cn(
                              "text-xs sm:text-sm font-mono font-bold tracking-widest transition-colors duration-300 shrink-0 mt-1 sm:mt-0",
                              isHovered ? "text-cyan-300" : "text-slate-500"
                            )}
                          >
                            0{index + 1}
                          </span>

                          {/* Category Icon */}
                          <div
                            className={cn(
                              "w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-2 flex items-center justify-center shrink-0 border transition-transform duration-300 shadow-inner group-hover:scale-105",
                              p.tile
                            )}
                          >
                            <Icon className={cn("w-5 h-5 sm:w-5.5 sm:h-5.5", p.icon)} />
                          </div>

                          {/* Title, Badge & Description */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Title with animated underline */}
                              <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                                <span className="relative inline-block">
                                  {category.title}
                                  <span
                                    className={cn(
                                      "absolute left-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-300 ease-out",
                                      isHovered ? "w-full" : "w-0"
                                    )}
                                  />
                                </span>
                              </h3>

                              {/* Category Badge */}
                              <Badge
                                variant={p.badgeVariant}
                                className="text-[10px] font-mono px-2.5 py-0.5"
                              >
                                {category.badge}
                              </Badge>
                            </div>

                            {/* Description */}
                            <p
                              className={cn(
                                "text-xs sm:text-sm mt-1.5 leading-relaxed transition-colors duration-300",
                                isHovered ? "text-slate-200" : "text-slate-400"
                              )}
                            >
                              {category.description}
                            </p>

                            {/* Key Skill Pills */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {category.skills.map((s) => (
                                <span
                                  key={s.name}
                                  className={cn(
                                    "text-[10px] font-mono px-2 py-0.5 rounded border transition-colors",
                                    s.highlight
                                      ? "bg-white/[0.06] text-slate-200 border-white/15"
                                      : "bg-white/[0.02] text-slate-400 border-white/5"
                                  )}
                                >
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Right: Interactive Arrow Indicator */}
                        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-white/[0.04] md:border-0">
                          <div
                            className={cn(
                              "p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center",
                              isHovered
                                ? "bg-indigo-600 border-indigo-500 text-white translate-x-0 opacity-100 shadow-md shadow-indigo-600/30"
                                : "bg-white/[0.03] border-white/10 text-slate-400 opacity-60"
                            )}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                      </div>

                      {/* Mobile / Tablet View Preview Card (Inline for screen < lg) */}
                      <div className="block lg:hidden mt-4">
                        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                          <img
                            src={category.imageUrl}
                            alt={category.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent p-4 flex flex-col justify-end">
                            <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase">
                              {category.badge}
                            </span>
                            <span className="text-white text-sm font-bold mt-0.5">
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

              {/* Bottom Border */}
              <div className="border-t border-white/[0.08]" />
            </div>

          </div>
        )}

        {/* View Mode 2: Roue Orbitale 360° (Radial Scroll Gallery) */}
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

        {/* View Mode 3: Grille Bento Complète */}
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
