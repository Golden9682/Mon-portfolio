"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Sparkles, ExternalLink, Smartphone, Bot, Briefcase, Truck, Utensils, Gamepad2 } from "lucide-react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  year: string;
  category: string;
  link?: string;
  image: string;
  logo?: string;
  tag?: string;
  techStack?: string[];
  originalProject?: Project;
}

interface ProjectShowcaseProps {
  projects?: ShowcaseProject[];
  onSelectProject?: (project: Project) => void;
  title?: string;
  subtitle?: string;
}

const defaultProjects: ShowcaseProject[] = [
  {
    id: "nunya",
    title: "NUNYA",
    subtitle: "EdTech Gamifiée & Offline-First",
    description: "Application mobile pour préparer le BEPC, BAC 1 & 2 avec annales officielles et paiements Mobile Money (FedaPay).",
    year: "2024",
    category: "Mobile",
    tag: "Projet Phare · EdTech & Fintech",
    link: "#",
    image: "/images/projects/nunya-badge.png",
    logo: "/images/projects/nunya-logo.png",
    techStack: ["React Native", "Expo", "Node.js", "PostgreSQL", "FedaPay"]
  },
  {
    id: "rapido",
    title: "XRAPIDO",
    subtitle: "Logistique & Livraison Rapide",
    description: "Plateforme multi-plateforme complète avec application mobile de commande, panel admin et backend de dispatch.",
    year: "2024",
    category: "Mobile & Web",
    tag: "Full-Stack & Logistique",
    link: "#",
    image: "/images/projects/rapido-scooter.png",
    logo: "/images/projects/rapido-logo.png",
    techStack: ["React Native", "React.js", "Node.js", "Express", "REST API"]
  },
  {
    id: "assistant-dg",
    title: "Assistant DG",
    subtitle: "Suite d'Automatisation de Direction",
    description: "Solution intelligente d'assistance aux dirigeants : transcription audio, parsing PDF/Excel et scheduler de tâches.",
    year: "2024",
    category: "Automation",
    tag: "Productivité & IA Entreprise",
    link: "#",
    image: "/images/projects/assistant-dg-icon.png",
    logo: "/images/projects/assistant-dg-icon.png",
    techStack: ["Python", "Flask", "Audio Transcription", "Excel Automation"]
  },
  {
    id: "bots-automation",
    title: "Bots IA & Scraping (N8N & Telegram)",
    subtitle: "Pipelines de Veille pour ONG",
    description: "Système autonome de veille d'opportunités d'appels d'offres avec extraction par IA et synthèses quotidiennes Telegram.",
    year: "2023 - 2026",
    category: "Automation",
    tag: "Automatisation & IA",
    link: "#",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    techStack: ["Python", "N8N", "Telegram API", "Web Scraping", "OpenAI"]
  },
  {
    id: "food-et-cie",
    title: "Food et Cie",
    subtitle: "Plateforme Traiteur & Commande en Ligne",
    description: "Site vitrine et système de commande interactif pour un service traiteur avec menu multi-cuisines, déployé sur Netlify.",
    year: "2023",
    category: "Web",
    tag: "Web App & Production",
    link: "https://food-et-cie.netlify.app",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    techStack: ["HTML5", "Modern JS", "Tailwind CSS", "Netlify"]
  },
  {
    id: "zombie-shock",
    title: "Zombie Shock & Game Lab",
    subtitle: "Développement de Jeu Vidéo & Graphismes",
    description: "Création d'actifs graphiques, logique de gameplay et mécaniques interactives pour jeux mobiles.",
    year: "2023",
    category: "Game Dev",
    tag: "Game Art & Mobile",
    link: "#",
    image: "/images/projects/zombie-shock-preview.png",
    techStack: ["Game Design", "React Native / 2D", "Sprite Assets"]
  }
];

export function ProjectShowcase({
  projects = defaultProjects,
  onSelectProject,
  title = "Selected Work",
  subtitle = "Survolez un projet pour afficher son aperçu visuel en direct"
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full mx-auto"
    >
      {/* Floating Image Preview on Hover (Desktop) */}
      <div
        className="pointer-events-none fixed z-50 hidden md:block overflow-hidden rounded-2xl shadow-2xl shadow-black/80 border border-white/20 bg-[#0d1322]"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 120}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), scale 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="relative w-[340px] h-[220px] bg-slate-900/90 rounded-2xl overflow-hidden p-1">
          {projects.map((project, index) => (
            <div
              key={project.id || project.title}
              className="absolute inset-0 w-full h-full p-2 flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "scale(1)" : "scale(1.1)",
                filter: hoveredIndex === index ? "none" : "blur(12px)",
              }}
            >
              <img
                src={project.image || "/images/projects/nunya-logo.png"}
                alt={project.title}
                className="w-full h-full object-cover rounded-xl border border-white/10"
              />
              {/* Subtle gradient overlay & tag */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl flex items-end p-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                    {project.category}
                  </span>
                  <div className="text-white text-xs font-bold mt-1">
                    {project.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-0">
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={project.id || project.title}
              onClick={() => {
                if (project.originalProject && onSelectProject) {
                  onSelectProject(project.originalProject);
                }
              }}
              className="group block cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative py-6 border-t border-white/[0.08] transition-all duration-300 ease-out">
                {/* Background highlight on hover */}
                <div
                  className={cn(
                    "absolute inset-0 -mx-4 px-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl transition-all duration-300 ease-out",
                    isHovered ? "opacity-100 scale-100 shadow-lg shadow-black/20" : "opacity-0 scale-[0.98] pointer-events-none"
                  )}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left: Logo/Icon + Title + Subtitle */}
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    {/* Project Logo or Icon */}
                    {project.logo ? (
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 p-1.5 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 group-hover:border-indigo-500/30 transition-all duration-300">
                        <img
                          src={project.logo}
                          alt={`Logo ${project.title}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Title with animated underline */}
                        <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                          <span className="relative inline-block">
                            {project.title}
                            <span
                              className={cn(
                                "absolute left-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 ease-out",
                                isHovered ? "w-full" : "w-0"
                              )}
                            />
                          </span>
                        </h3>

                        {project.tag && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-400">
                            {project.tag}
                          </span>
                        )}
                      </div>

                      {/* Description with subtle color transition */}
                      <p
                        className={cn(
                          "text-xs sm:text-sm mt-1 leading-relaxed transition-colors duration-300",
                          isHovered ? "text-slate-200" : "text-slate-400"
                        )}
                      >
                        {project.description}
                      </p>

                      {/* Tech stack badges */}
                      {project.techStack && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {project.techStack.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-slate-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Year + Arrow CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-white/[0.04] md:border-0">
                    <span
                      className={cn(
                        "text-xs font-mono text-slate-500 tabular-nums transition-colors duration-300",
                        isHovered && "text-indigo-300"
                      )}
                    >
                      {project.year}
                    </span>

                    {/* Arrow that slides in */}
                    <div
                      className={cn(
                        "p-2 rounded-xl border transition-all duration-300 flex items-center justify-center",
                        isHovered
                          ? "bg-indigo-600 border-indigo-500 text-white translate-x-0 opacity-100 shadow-md shadow-indigo-600/30"
                          : "bg-white/[0.03] border-white/10 text-slate-400 opacity-60"
                      )}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

                {/* Mobile Thumbnail view (when hover is not possible) */}
                <div className="block md:hidden mt-4 rounded-xl overflow-hidden border border-white/10 h-40 bg-black/40 relative">
                  <img
                    src={project.image || "/images/projects/nunya-logo.png"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium flex items-center gap-1">
                      Toucher pour voir les détails <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* Bottom border */}
        <div className="border-t border-white/[0.08]" />
      </div>
    </div>
  );
}
