"use client";

import React, { useEffect, useState } from "react";

export function HeroSpotlight() {
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) return;

    let rafId: number;
    let targetX = 50;
    let targetY = 30;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const loop = () => {
      setPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.05,
        y: prev.y + (targetY - prev.y) * 0.05,
      }));
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted || reducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-10 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[140px] will-change-transform"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
          transition: "opacity 0.5s ease-out",
        }}
      />
    </div>
  );
}
