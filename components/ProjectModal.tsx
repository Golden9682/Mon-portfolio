"use client";

import React, { useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  Github,
  Check,
  Smartphone,
  Cpu,
  Truck,
  Briefcase,
  Bot,
  Utensils,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { m } from "@/components/ui/motion";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const iconMap: Record<string, { Icon: React.ElementType; color: string }> = {
  Smartphone: { Icon: Smartphone, color: "text-emerald-400" },
  Briefcase: { Icon: Briefcase, color: "text-indigo-400" },
  Truck: { Icon: Truck, color: "text-cyan-400" },
  Bot: { Icon: Bot, color: "text-amber-400" },
  Utensils: { Icon: Utensils, color: "text-orange-400" },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    // Move focus into the dialog for keyboard users
    const t = setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(t);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <m.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 md:p-8 bg-black/70 backdrop-blur-md overflow-y-auto"
        >
          <m.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-6 sm:my-8 bg-[#0d1322] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            <ModalContent project={project} onClose={onClose} closeRef={closeRef} />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function ModalContent({
  project,
  onClose,
  closeRef,
}: {
  project: Project;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement>;
}) {
  const { Icon, color } = iconMap[project.iconName] ?? { Icon: Cpu, color: "text-indigo-400" };

  return (
    <>
      {/* Header decoration */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", project.gradient)} />
      <div
        aria-hidden
        className={cn(
          "absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-bl rounded-full blur-3xl pointer-events-none opacity-70",
          project.gradient
        )}
      />

      {/* Close Button */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300"
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative p-6 sm:p-8 space-y-7">
        {/* Header Title & Tag */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          className="space-y-3 pr-10"
        >
          <div className="flex items-start gap-4">
            {project.logoUrl ? (
              <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/10 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                <img
                  loading="lazy"
                  decoding="async"
                  src={project.logoUrl}
                  alt={`Logo ${project.title}`}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                <Icon className={cn("w-6 h-6", color)} />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {project.tag}
                </span>
                <span className="text-xs text-slate-500 font-mono">{project.period}</span>
              </div>
              <h3
                id="project-modal-title"
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2"
              >
                {project.title}
              </h3>
            </div>
          </div>
          <p className="text-slate-400 text-sm sm:text-base font-medium">{project.subtitle}</p>
        </m.div>

        {/* Metrics if available */}
        {project.metrics && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {project.metrics.map((mtr) => (
              <div
                key={mtr.label}
                className="bg-white/[0.03] border border-white/[0.06] p-3.5 rounded-xl hover:border-white/10 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  {mtr.label}
                </div>
                <div className="text-sm font-semibold text-white mt-1">{mtr.value}</div>
              </div>
            ))}
          </m.div>
        )}

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease: EASE }}
          className="space-y-7"
        >
          {/* Project Preview (Desktop Browser or Mobile Smartphone Frame) */}
          {project.previewImage && (
            <div className="rounded-2xl bg-black/40 border border-white/10 p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.previewLayout === "desktop"
                  ? "Aperçu de la Plateforme & Architecture Système"
                  : "Aperçu Réel de l'Application Mobile"}
              </span>

              {project.previewLayout === "desktop" ? (
                /* Wide Desktop Browser Mockup in Modal */
                <div className="relative w-full max-w-2xl bg-[#0c111d] rounded-2xl p-2.5 sm:p-3 border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(99,102,241,0.25)] overflow-hidden ring-1 ring-white/15">
                  <div className="relative w-full bg-[#090d16] rounded-xl overflow-hidden flex flex-col border border-white/10 shadow-inner">
                    
                    {/* Header */}
                    <div className="h-8 bg-slate-900/95 border-b border-white/10 px-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/50 border border-white/10 text-[11px] text-slate-300 font-mono max-w-[280px] truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-slate-400">https://</span>
                        <span className="text-indigo-300 font-semibold">
                          {project.id === "food-et-cie"
                            ? "food-et-cie.netlify.app"
                            : project.id === "assistant-dg"
                            ? "assistant-dg.enterprise/workflow"
                            : "bot-pipeline.ai/telegram-engine"}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">1080p HD</span>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={project.previewImage}
                        alt={`Interface ${project.title}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                  </div>
                </div>
              ) : (
                /* Sleek Smartphone Mockup in Modal */
                <div className="relative max-w-[280px] w-full h-[520px] bg-[#0c111d] rounded-[42px] p-2.5 border-[5px] border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.2)] overflow-hidden ring-1 ring-white/10">
                  <div className="relative w-full h-full bg-[#090d16] rounded-[34px] overflow-hidden flex flex-col justify-between border border-white/10">
                    
                    {/* Top Status Bar with Dynamic Island */}
                    <div className="relative z-20 pt-2 px-5 flex items-center justify-between text-[10px] text-white/80 font-medium">
                      <span>9:41</span>
                      <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end px-1.5 gap-1 border border-white/10 shadow-inner">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                      </div>
                      <span className="text-[10px] text-white/60">5G</span>
                    </div>

                    <div className="absolute inset-0 pt-7 pb-4 px-1">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={project.previewImage}
                        alt={`Interface ${project.title}`}
                        className="w-full h-full object-cover object-top rounded-2xl"
                      />
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="relative z-20 pb-1.5 flex justify-center">
                      <div className="w-24 h-1 bg-white/40 rounded-full" />
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-3">
              Présentation &amp; Contexte
              <span className="flex-1 h-px bg-white/[0.06]" />
            </h4>
            <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed text-pretty">
              {project.longDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-3">
              Fonctionnalités &amp; Réalisations clés
              <span className="flex-1 h-px bg-white/[0.06]" />
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((point, idx) => (
                <m.li
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + idx * 0.05, duration: 0.4, ease: EASE }}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <span className="mt-0.5 p-0.5 rounded-md bg-emerald-500/15 text-emerald-400 shrink-0 border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-pretty">{point}</span>
                </m.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-3">
              Technologies &amp; Outils
              <span className="flex-1 h-px bg-white/[0.06]" />
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-5 py-2.5 text-sm group"
              >
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                Voir le site en direct
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-5 py-2.5 text-sm"
              >
                <Github className="w-4 h-4" />
                Code Source (GitHub)
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-5 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Fermer
            </button>
          </div>
        </m.div>
      </div>
    </>
  );
}
