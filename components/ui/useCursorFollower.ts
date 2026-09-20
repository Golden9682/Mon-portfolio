"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Options {
  /** Offset (px) between the cursor and the floating element. */
  offset?: (index: number) => { x: number; y: number };
  /** Lerp factor per frame (0–1). Higher = snappier. */
  smoothing?: number;
}

/**
 * Cursor-following preview card.
 *
 * Position is written straight to the DOM inside a rAF loop that only runs
 * while something is hovered, so React never re-renders on mouse move and
 * nothing runs while the user is idle.
 */
export function useCursorFollower({ offset, smoothing = 0.15 }: Options = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const hoveredRef = useRef<number | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isVisible = hoveredIndex !== null;

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  const tick = useCallback(() => {
    const el = floatRef.current;
    const container = containerRef.current;
    if (!el || !container || hoveredRef.current === null) {
      stop();
      return;
    }

    current.current.x += (target.current.x - current.current.x) * smoothing;
    current.current.y += (target.current.y - current.current.y) * smoothing;

    const rect = container.getBoundingClientRect();
    const o = offset ? offset(hoveredRef.current) : { x: 30, y: -200 };
    el.style.transform = `translate3d(${rect.left + current.current.x + o.x}px, ${
      rect.top + current.current.y + o.y
    }px, 0)`;

    raf.current = requestAnimationFrame(tick);
  }, [offset, smoothing, stop]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const show = useCallback(
    (index: number) => {
      hoveredRef.current = index;
      setHoveredIndex(index);
      // Snap to the cursor on first appearance instead of sliding from (0,0)
      if (raf.current === null) {
        current.current = { ...target.current };
        raf.current = requestAnimationFrame(tick);
      }
    },
    [tick]
  );

  const hide = useCallback(() => {
    hoveredRef.current = null;
    setHoveredIndex(null);
    stop();
  }, [stop]);

  useEffect(() => stop, [stop]);

  return { containerRef, floatRef, hoveredIndex, isVisible, onMouseMove, show, hide };
}
