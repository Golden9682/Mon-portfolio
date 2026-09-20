"use client";

import React, { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { ProjectShowcase, ShowcaseProject } from "@/components/ui/project-showcase";
import {
  Smartphone,
  Briefcase,
  Truck,
  Bot,
  Utensils,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  Star,
  LayoutList,
  LayoutGrid,
} from "lucide-react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { m, Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Tous les projets" },
  { id: "mobile", label: "Mobile (React Native)" },
  { id: "automation", label: "Automatisation & IA" },
  { id: "web", label: "Web & Plateformes" },
];

type Accent = "emerald" | "indigo" | "cyan" | "amber" | "orange";

const iconMap: Record<string, { Icon: React.ElementType; color: string; accent: Accent }> = {
  Smartphone: { Icon: Smartphone, color: "text-emerald-400", accent: "emerald" },
  Briefcase: { Icon: Briefcase, color: "text-indigo-400", accent: "indigo" },
  Truck: { Icon: Truck, color: "text-cyan-400", accent: "cyan" },
  Bot: { Icon: Bot, color: "text-amber-400", accent: "amber" },
  Utensils: { Icon: Utensils, color: "text-orange-400", accent: "orange" },
};

function getIcon(name: string) {
  return iconMap[name] ?? { Icon: Layers, color: "text-indigo-400", accent: "indigo" as Accent };
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  // Convert to ShowcaseProject format
  const showcaseProjects: ShowcaseProject[] = filteredProjects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    year: p.period.split(" ")[0] || "2024",
    category: p.category === "mobile" ? "Mobile" : p.category === "automation" ? "Automation" : "Web",
    tag: p.tag,
    link: p.links.live || "#",
    image: p.previewImage || p.logoUrl || "/images/projects/nunya-logo.png",
    logo: p.logoUrl,
    techStack: p.techStack.slice(0, 4),
    originalProject: p,
  }));

  return (
    <section id="projets" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-8">
          <SectionHeader
            align="left"
            accent="indigo"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            eyebrow="Réalisations & Études de cas"
            title="Projets Conçus & Déployés"
            description="Des applications mobiles offline aux suites d'automatisation métier, découvrez des solutions taillées pour le monde réel."
            className="xl:max-w-xl"
          />

          {/* Controls: View switcher & Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <button
                onClick={() => setViewMode("showcase")}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all",
                  viewMode === "showcase"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                )}
                title="Aperçu interactif au survol"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Showcase</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all",
                  viewMode === "grid"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                )}
                title="Grille de cartes"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grille</span>
              </button>
            </div>

            {/* Filter Pills */}
            <Reveal delay={0.2} className="shrink-0">
              <LayoutGroup id="project-filters">
                <div
                  role="tablist"
                  aria-label="Filtrer les projets"
                  className="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                >
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "relative text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors duration-300",
                          isActive ? "text-white" : "text-slate-400 hover:text-white"
                        )}
                      >
                        {isActive && (
                          <m.span
                            layoutId="filter-pill"
                            className="absolute inset-0 rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/30"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </Reveal>
          </div>
        </div>

        {/* Dynamic View: Showcase vs Grid */}
        {viewMode === "showcase" ? (
          <div className="glass-panel rounded-3xl p-4 sm:p-8 md:p-10 border border-white/[0.08] relative overflow-hidden">
            <ProjectShowcase
              projects={showcaseProjects}
              onSelectProject={(project) => setActiveProject(project)}
            />
          </div>
        ) : (
          <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => {
                const { Icon, color, accent } = getIcon(project.iconName);
                const isHero = project.id === "nunya";

                return (
                  <m.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(isHero && "md:col-span-2")}
                  >
                    <SpotlightCard
                      accent={accent}
                      as="article"
                      role="button"
                      tabIndex={0}
                      aria-label={`Voir les détails du projet ${project.title}`}
                      onClick={() => setActiveProject(project)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveProject(project);
                        }
                      }}
                      className={cn(
                        "group h-full cursor-pointer overflow-hidden flex flex-col",
                        isHero ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-7"
                      )}
                    >
                      {/* Ambient gradient */}
                      <div
                        aria-hidden
                        className={cn(
                          "absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-bl rounded-full blur-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700",
                          project.gradient
                        )}
                      />

                      <div
                        className={cn(
                          "relative flex-1 flex flex-col",
                          isHero && "lg:grid lg:grid-cols-12 lg:gap-10"
                        )}
                      >
                        {/* Main column */}
                        <div className={cn("flex flex-col", isHero && "lg:col-span-7")}>
                          {/* Header tag & Icon / Logo */}
                          <div className="flex items-start justify-between gap-3 mb-5">
                            <div className="flex items-center gap-3">
                              {project.logoUrl ? (
                                <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-3">
                                  <img
                                    src={project.logoUrl}
                                    alt={`Logo ${project.title}`}
                                    className="w-full h-full object-contain drop-shadow"
                                  />
                                </div>
                              ) : (
                                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-3">
                                  <Icon className={cn("w-5 h-5", color)} />
                                </div>
                              )}
                              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-slate-300">
                                {project.tag}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {isHero && (
                                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2 py-1 rounded-md">
                                  <Star className="w-3 h-3 fill-amber-300" /> Phare
                                </span>
                              )}
                              <span className="text-xs font-mono text-slate-500">{project.period}</span>
                            </div>
                          </div>

                          {/* Title and description */}
                          <h3
                            className={cn(
                              "font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-indigo-300",
                              isHero ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
                            )}
                          >
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium text-slate-400 mt-1.5 mb-4">{project.subtitle}</p>
                          <p
                            className={cn(
                              "text-slate-300/90 text-sm leading-relaxed mb-6 text-pretty",
                              !isHero && "line-clamp-3"
                            )}
                          >
                            {project.description}
                          </p>

                          <div className="mt-auto">
                            {/* Tech Pills */}
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {project.techStack.slice(0, isHero ? 6 : 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 transition-colors group-hover:border-white/10"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > (isHero ? 6 : 4) && (
                                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/[0.04] text-slate-500">
                                  +{project.techStack.length - (isHero ? 6 : 4)}
                                </span>
                              )}
                            </div>

                            {/* Card footer CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-semibold">
                              <span className="inline-flex items-center gap-1.5 text-indigo-400 transition-all duration-300 group-hover:gap-2.5 group-hover:text-indigo-300">
                                Explorer les détails
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </span>

                              {project.links.live && (
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Live
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Metrics column (hero card only) */}
                        {isHero && project.metrics && (
                          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center gap-3">
                            {project.metrics.map((metric, i) => (
                              <div
                                key={metric.label}
                                className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 ease-out-expo group-hover:border-white/10 group-hover:translate-x-1"
                                style={{ transitionDelay: `${i * 40}ms` }}
                              >
                                <span className="text-xs font-medium text-slate-400">{metric.label}</span>
                                <span className="text-sm font-semibold text-white text-right">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </SpotlightCard>
                  </m.div>
                );
              })}
            </AnimatePresence>
          </m.div>
        )}
      </div>

      {/* Modal View */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
