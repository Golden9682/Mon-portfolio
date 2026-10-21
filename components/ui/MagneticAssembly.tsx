"use client";

import React from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type ScatterDirection =
  | "auto"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "rise";

export interface MagneticAssemblyProps {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  amount?: number;
  once?: boolean;
  as?: "div" | "ol" | "ul" | "section" | "article";
  style?: React.CSSProperties;
}

export function MagneticAssembly({
  children,
  stagger = 0.08,
  delayChildren = 0.05,
  className = "",
  amount = 0.15,
  once = true,
  as = "div",
  style,
}: MagneticAssemblyProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const PlainTag = as;
    return (
      <PlainTag className={className} style={style}>
        {children}
      </PlainTag>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delayChildren,
      },
    },
  };

  const Component =
    as === "ol" ? m.ol : as === "ul" ? m.ul : as === "section" ? m.section : as === "article" ? m.article : m.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      style={style}
    >
      {children}
    </Component>
  );
}

export interface AssemblyFragmentProps {
  children: React.ReactNode;
  index?: number;
  direction?: ScatterDirection;
  distanceMultiplier?: number;
  className?: string;
  as?: "div" | "article" | "li" | "span";
  style?: React.CSSProperties;
}

export function AssemblyFragment({
  children,
  index = 0,
  direction = "auto",
  distanceMultiplier = 1,
  className = "",
  as = "div",
  style,
}: AssemblyFragmentProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const PlainTag = as;
    return (
      <PlainTag className={className} style={style}>
        {children}
      </PlainTag>
    );
  }

  const d = distanceMultiplier;
  const computeScatter = (): { x: number; y: number; rotate: number; scale: number } => {
    switch (direction) {
      case "top-left":
        return { x: -45 * d, y: -35 * d, rotate: -4.5, scale: 0.95 };
      case "top-right":
        return { x: 45 * d, y: -35 * d, rotate: 4.5, scale: 0.95 };
      case "bottom-left":
        return { x: -45 * d, y: 45 * d, rotate: -3.5, scale: 0.94 };
      case "bottom-right":
        return { x: 45 * d, y: 45 * d, rotate: 3.5, scale: 0.94 };
      case "left":
        return { x: -55 * d, y: 20 * d, rotate: -4, scale: 0.95 };
      case "right":
        return { x: 55 * d, y: 20 * d, rotate: 4, scale: 0.95 };
      case "rise":
        return { x: 0, y: 50 * d, rotate: 0, scale: 0.93 };
      case "auto":
      default: {
        const signX = index % 2 === 0 ? -1 : 1;
        const xOffset = (35 + (index % 3) * 12) * signX * d;
        const yOffset = (35 + (index % 4) * 8) * d;
        const rot = (index % 2 === 0 ? -3.5 : 3.5) * (1 + (index % 3) * 0.2);
        return { x: xOffset, y: yOffset, rotate: rot, scale: 0.94 };
      }
    }
  };

  const scatter = computeScatter();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: scatter.x,
      y: scatter.y,
      rotate: scatter.rotate,
      scale: scatter.scale,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.72,
        ease: EASE,
      },
    },
  };

  const Component = as === "article" ? m.article : as === "li" ? m.li : as === "span" ? m.span : m.div;

  return (
    <Component
      className={className}
      variants={itemVariants}
      style={{ willChange: "transform, opacity, filter", ...style }}
    >
      {children}
    </Component>
  );
}
