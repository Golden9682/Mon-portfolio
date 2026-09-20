"use client";

import React, { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type Accent = "indigo" | "emerald" | "cyan" | "amber" | "violet" | "rose" | "orange";

const accents: Record<Accent, { glow: string; border: string }> = {
  indigo: { glow: "rgba(99, 102, 241, 0.16)", border: "rgba(129, 140, 248, 0.8)" },
  emerald: { glow: "rgba(16, 185, 129, 0.14)", border: "rgba(52, 211, 153, 0.8)" },
  cyan: { glow: "rgba(6, 182, 212, 0.14)", border: "rgba(34, 211, 238, 0.8)" },
  amber: { glow: "rgba(245, 158, 11, 0.14)", border: "rgba(251, 191, 36, 0.8)" },
  violet: { glow: "rgba(139, 92, 246, 0.16)", border: "rgba(167, 139, 250, 0.8)" },
  rose: { glow: "rgba(244, 63, 94, 0.14)", border: "rgba(251, 113, 133, 0.8)" },
  orange: { glow: "rgba(249, 115, 22, 0.14)", border: "rgba(251, 146, 60, 0.8)" },
};

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: Accent;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Card with a cursor-following radial glow and gradient border.
 * Position is written to CSS variables, so the paint stays on the GPU and
 * React never re-renders on mouse move.
 */
export function SpotlightCard({
  accent = "indigo",
  hover = true,
  className,
  children,
  style,
  as = "div",
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { glow, border } = accents[accent];

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={cn("card spotlight rounded-2xl", hover && "card-hover", className)}
      style={
        {
          "--spot-color": glow,
          "--spot-border": border,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
