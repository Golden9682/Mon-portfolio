"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

type Accent = "indigo" | "emerald" | "cyan" | "amber" | "violet";

const eyebrowStyles: Record<Accent, string> = {
  indigo: "bg-indigo-500/10 border-indigo-500/25 text-indigo-300",
  emerald: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300",
  cyan: "bg-cyan-500/10 border-cyan-500/25 text-cyan-300",
  amber: "bg-amber-500/10 border-amber-500/25 text-amber-300",
  violet: "bg-violet-500/10 border-violet-500/25 text-violet-300",
};

interface SectionHeaderProps {
  eyebrow: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  accent?: Accent;
  align?: "center" | "left";
  className?: string;
}

/** Consistent eyebrow + title + lede used at the top of every section. */
export function SectionHeader({
  eyebrow,
  icon,
  title,
  description,
  accent = "indigo",
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl", className)}>
      <Reveal>
        <span className={cn("eyebrow mb-4", eyebrowStyles[accent])}>
          {icon}
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-title font-extrabold text-white text-balance">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={cn("text-slate-400 text-base sm:text-lg leading-relaxed mt-4 text-pretty", centered && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
