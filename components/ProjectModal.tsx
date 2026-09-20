"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Github, Check, Smartphone, Server, Cpu, Truck, Briefcase, Bot, Utensils } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone": return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case "Briefcase": return <Briefcase className="w-6 h-6 text-indigo-400" />;
      case "Truck": return <Truck className="w-6 h-6 text-cyan-400" />;
      case "Bot": return <Bot className="w-6 h-6 text-amber-400" />;
      case "Utensils": return <Utensils className="w-6 h-6 text-orange-400" />;
      default: return <Cpu className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-8 bg-[#0d1322] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className={`h-3 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Title & Tag */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                {renderIcon(project.iconName)}
              </div>
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {project.tag}
                </span>
                <span className="text-xs text-slate-500 ml-2 font-mono">{project.period}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {project.title}
                </h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics if available */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 font-medium">{m.label}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Présentation &amp; Contexte
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Fonctionnalités &amp; Réalisations clés
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Technologies &amp; Outils
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Voir le site en direct
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/10 transition-all"
              >
                <Github className="w-4 h-4" />
                Code Source (GitHub)
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
