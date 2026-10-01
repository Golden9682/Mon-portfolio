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
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const iconMap: Record<string, { Icon: React.ElementType; color: string }> = {
  Smartphone: { Icon: Smartphone, color: "text-accent" },
  Briefcase: { Icon: Briefcase, color: "text-accent" },
  Truck: { Icon: Truck, color: "text-accent" },
  Bot: { Icon: Bot, color: "text-accent" },
  Utensils: { Icon: Utensils, color: "text-accent" },
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
          className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 md:p-8 bg-bg/70 backdrop-blur-md overflow-y-auto"
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
            className="relative w-full max-w-3xl my-6 sm:my-8 bg-raise border border-line rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
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
  const { Icon, color } = iconMap[project.iconName] ?? { Icon: Cpu, color: "text-accent" };
  const shots = project.screenshots ?? (project.previewImage ? [project.previewImage] : []);

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
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 p-2 rounded-full bg-surface border border-line text-muted hover:text-ink hover:bg-surface-raise hover:rotate-90 transition-all duration-300"
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
              <div className="w-14 h-14 rounded-2xl bg-surface-raise border border-line p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                <img
                  loading="lazy"
                  decoding="async"
                  src={project.logoUrl}
                  alt={`Logo ${project.title}`}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-surface border border-line shrink-0">
                <Icon className={cn("w-6 h-6", color)} />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-accent-soft text-accent border border-accent-line">
                  {project.tag}
                </span>
                <span className="text-xs text-faint font-mono">{project.period}</span>
              </div>
              <h3
                id="project-modal-title"
                className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-2"
              >
                {project.title}
              </h3>
            </div>
          </div>
          <p className="text-muted text-sm sm:text-base font-medium">{project.subtitle}</p>
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
                className="bg-surface border border-line p-3.5 rounded-xl hover:border-line transition-colors"
              >
                <div className="text-[11px] uppercase tracking-wider text-faint font-semibold">
                  {mtr.label}
                </div>
                <div className="text-sm font-semibold text-ink mt-1">{mtr.value}</div>
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
          {/* Screenshot gallery (device frame + thumbnails) */}
          {shots.length > 0 && (
            <div className="rounded-2xl bg-bg/70 border border-line p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {project.previewLayout === "desktop"
                  ? `Aperçu du logiciel${shots.length > 1 ? ` · ${shots.length} captures` : ""}`
                  : `Aperçu Réel de l'Application Mobile${shots.length > 1 ? ` · ${shots.length} écrans` : ""}`}
              </span>

              <ScreenshotGallery
                key={project.id}
                images={shots}
                title={project.title}
                layout={project.previewLayout ?? "mobile"}
                url={project.links.live ? project.links.live.replace(/^https?:\/\//, "") : project.title}
                liveUrl={project.links.live}
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.15em] flex items-center gap-3">
              Présentation &amp; Contexte
              <span className="flex-1 h-px bg-surface-raise" />
            </h4>
            <p className="text-muted text-sm sm:text-[15px] leading-relaxed text-pretty">
              {project.longDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.15em] flex items-center gap-3">
              Fonctionnalités &amp; Réalisations clés
              <span className="flex-1 h-px bg-surface-raise" />
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((point, idx) => (
                <m.li
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + idx * 0.05, duration: 0.4, ease: EASE }}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span className="mt-0.5 p-0.5 rounded-md bg-accent-soft text-accent shrink-0 border border-accent-line">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-pretty">{point}</span>
                </m.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.15em] flex items-center gap-3">
              Technologies &amp; Outils
              <span className="flex-1 h-px bg-surface-raise" />
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-surface border border-line text-ink hover:bg-surface-raise hover:border-line-strong transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-line">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-5 py-2.5 text-sm group"
              >
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                Ouvre le site
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
                Regarde le code
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-5 py-2.5 rounded-xl hover:bg-surface text-muted hover:text-ink text-sm font-medium transition-colors"
            >
              Fermer
            </button>
          </div>
        </m.div>
      </div>
    </>
  );
}
