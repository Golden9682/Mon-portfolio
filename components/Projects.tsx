"use client";

import React, { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { 
  Smartphone, 
  Briefcase, 
  Truck, 
  Bot, 
  Utensils, 
  ExternalLink, 
  ChevronRight, 
  Sparkles,
  Layers
} from "lucide-react";

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "Tous les projets" },
    { id: "mobile", label: "Mobile (React Native)" },
    { id: "automation", label: "Automatisation & IA" },
    { id: "web", label: "Web & Plateformes" },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter((p) => p.category === selectedCategory);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone": return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case "Briefcase": return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case "Truck": return <Truck className="w-5 h-5 text-cyan-400" />;
      case "Bot": return <Bot className="w-5 h-5 text-amber-400" />;
      case "Utensils": return <Utensils className="w-5 h-5 text-orange-400" />;
      default: return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="projets" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Réalisations &amp; Études de cas
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projets Conçus &amp; Déployés
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Des applications mobiles offline aux suites d&apos;automatisation métier, découvrez des solutions taillées pour le monde réel.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group relative cursor-pointer rounded-2xl glass-panel p-6 sm:p-7 border border-white/10 glass-panel-hover flex flex-col justify-between overflow-hidden"
            >
              {/* Card top gradient glow */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${project.gradient} rounded-full blur-3xl pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity`}
              />

              <div>
                {/* Header tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {renderIcon(project.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                        {project.tag}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{project.period}</span>
                </div>

                {/* Title and description */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1 mb-3">
                  {project.subtitle}
                </p>
                <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/[0.04] text-slate-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Card footer CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-indigo-400">
                    Explorer les détails
                    <ChevronRight className="w-4 h-4" />
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
          ))}
        </div>

      </div>

      {/* Modal View */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
