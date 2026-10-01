"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

/*
 * En-tête de section. Toujours aligné à gauche : aucun axe centré sur la page
 * (MOTION-CRAFT §4). `indent` décale l'en-tête d'une section à l'autre pour
 * que les départs de ligne ne tombent pas tous au même endroit.
 */
const indents = {
  0: "",
  1: "lg:ml-[8.333%]",
  2: "lg:ml-[16.666%]",
  3: "lg:ml-[33.333%]",
} as const;

interface SectionHeaderProps {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  indent?: keyof typeof indents;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, indent = 0, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-left max-w-3xl", indents[indent], className)}>
      <Reveal>
        <span className="eyebrow mb-5">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-title text-ink text-balance">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="text-muted text-base sm:text-lg leading-relaxed mt-5 max-w-2xl text-pretty">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
