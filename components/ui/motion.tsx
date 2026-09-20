"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion, type Variants } from "framer-motion";

/**
 * LazyMotion loads only the `domAnimation` feature set (~15 kB instead of ~34 kB).
 * Every animated element in the app must use `m.*` instead of `motion.*`.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export const revealVariants = (direction: Direction = "up", distance = 1): Variants => {
  const o = offsets[direction];
  return {
    hidden: {
      opacity: 0,
      x: o.x ? o.x * distance : 0,
      y: o.y ? o.y * distance : 0,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  };
};

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
}

/** Fades + slides an element in when it enters the viewport. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  once = true,
  amount = 0.25,
  className,
  as = "div",
  style,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={revealVariants(direction)}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
}

/** Container whose direct `StaggerItem` children animate in sequence. */
export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  className,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: Direction;
  as?: "div" | "li";
}

export function StaggerItem({ children, direction = "up", className, as = "div", style }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} style={style} variants={revealVariants(direction)}>
      {children}
    </Tag>
  );
}

export { m };
