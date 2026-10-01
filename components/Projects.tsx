"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { LayoutGroup } from "framer-motion";
import { m, Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

/*
 * La preuve (temps 3 du scroll). Un projet par bloc, large, la vraie capture
 * d'un côté et le texte de l'autre ; l'alignement alterne d'un bloc à l'autre
 * pour donner du rythme. C'est la section la plus dense de la page.
 */

const categories = [
  { id: "all", label: "Tous" },
  { id: "mobile", label: "Mobile" },
  { id: "automation", label: "Automatisation & IA" },
  { id: "web", label: "Web & Plateformes" },
];

const isPortrait = (project: Project, src: string) =>
  project.previewLayout === "mobile" || src.includes("mobile");

const shotsOf = (p: Project) => p.screenshots ?? (p.previewImage ? [p.previewImage] : []);

/* Un écran de téléphone. */
function PhoneShot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c1b1d] bg-[#1c1b1d]", className)}>
      <div className="relative aspect-[472/1024] overflow-hidden rounded-[1.25rem]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

/* Un écran d'ordinateur : cadre sobre, le domaine réel s'il existe, sinon le nom. */
function ScreenShot({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="overflow-hidden border border-line-strong bg-raise">
      <div className="flex items-center gap-3 px-4 h-8 border-b border-line">
        <span className="w-2 h-2 bg-line-strong" />
        <span className="text-label text-faint truncate">{label}</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 56vw, 92vw" className="object-contain" />
      </div>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const shots = shotsOf(project);
  const wide = shots.filter((s) => !isPortrait(project, s));
  const tall = shots.filter((s) => isPortrait(project, s));
  const label = project.links.live ? project.links.live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : project.title;

  // Application mobile : deux écrans décalés, le second en retrait.
  // Le second est le dernier écran, pas le suivant : le hero montre déjà les deux premiers de NUNYA.
  if (wide.length === 0) {
    const back = tall.length > 1 ? tall[tall.length - 1] : undefined;
    return (
      <div className="relative bg-raise border border-line aspect-[5/4] overflow-hidden">
        <div className="absolute inset-0 mesh-atelier" />
        {back && (
          <PhoneShot
            src={back}
            alt={`${project.title} — écran 2`}
            className="absolute w-[30%] left-[16%] top-[14%] -rotate-6 opacity-70"
          />
        )}
        <PhoneShot
          src={tall[0]}
          alt={`${project.title} — écran principal`}
          className="absolute w-[34%] left-[44%] top-[8%] rotate-3"
        />
      </div>
    );
  }

  // Logiciel ou site : l'écran large, et le mobile par-dessus s'il existe.
  return (
    <div className="relative pb-[10%] lg:pb-0">
      <ScreenShot src={wide[0]} alt={`${project.title} — capture`} label={label} />
      {tall[0] && (
        <PhoneShot
          src={tall[0]}
          alt={`${project.title} — version mobile`}
          className="absolute w-[24%] right-[4%] -bottom-[2%] lg:-bottom-[12%] rotate-3"
        />
      )}
    </div>
  );
}

function ProjectBlock({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-center py-16 lg:py-24 border-t border-line first:border-t-0 first:pt-4">
      <Reveal
        className={cn("lg:col-span-7", flip && "lg:col-start-6 lg:row-start-1")}
        direction="none"
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Voir les captures et le détail de ${project.title}`}
          className="block w-full text-left"
        >
          <ProjectVisual project={project} />
        </button>
      </Reveal>

      <Reveal className={cn("lg:col-span-5", flip && "lg:col-start-1 lg:row-start-1")} delay={0.08}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-label mb-6">
          <span className="text-accent">
            {num} / {String(total).padStart(2, "0")}
          </span>
          <span className="text-muted">{project.tag}</span>
          <span className="text-faint">{project.period}</span>
        </div>

        <h3 className="font-display uppercase text-ink leading-[0.95] tracking-[-0.02em] text-[clamp(2.25rem,4.2vw,4rem)] text-balance">
          {project.title}
        </h3>
        <p className="text-ink/80 font-medium mt-3">{project.subtitle}</p>
        <p className="text-muted leading-relaxed mt-5 text-pretty">{project.description}</p>

        {project.metrics && (
          <dl className="mt-8 border-t border-line">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex items-baseline justify-between gap-6 py-3 border-b border-line">
                <dt className="text-label text-faint shrink-0">{metric.label}</dt>
                <dd className="text-sm text-ink text-right">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-6 font-mono text-xs text-faint leading-relaxed">
          {project.techStack.slice(0, 6).join(" · ")}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-8">
          <button type="button" onClick={onOpen} className="btn btn-secondary">
            Comment c&apos;est fait
          </button>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label text-muted hover:text-accent transition-colors underline underline-offset-4 decoration-line-strong"
            >
              Ouvre le site ↗
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter(
          (p) =>
            p.category === selectedCategory ||
            (p.categories as string[] | undefined)?.includes(selectedCategory)
        );

  return (
    <section id="projets" data-theme-section="nuit" className="relative py-24 md:py-32">
      <div className="frame">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12 lg:mb-16">
          <SectionHeader
            eyebrow="Réalisations"
            title="Projets conçus & déployés"
            description="Des applications mobiles hors ligne aux suites d'automatisation métier. Chaque projet est montré avec ses vraies captures."
          />

          <LayoutGroup id="project-filters">
            <div role="tablist" aria-label="Filtrer les projets" className="flex flex-wrap gap-x-1 gap-y-2 border-b border-line">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "relative text-label px-3 py-3 transition-colors duration-300",
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    {cat.label}
                    {isActive && (
                      <m.span
                        layoutId="filter-line"
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="py-16 text-muted">Rien dans cette catégorie. Essaie « Tous ».</p>
        ) : (
          <div>
            {filteredProjects.map((project, index) => (
              <ProjectBlock
                key={project.id}
                project={project}
                index={index}
                total={filteredProjects.length}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
