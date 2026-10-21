"use client";

import React, { useEffect, useRef, useState } from "react";

export function AmbientCursorBacklight() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vérifie que l'appareil utilise une vraie souris (pas un écran tactile)
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReduced) return;
    setSupported(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      // Détecte la section survolée pour adapter la teinte (sombre vs clair)
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const section = el?.closest("[data-theme-section]");
      const sectionTheme = section?.getAttribute("data-theme-section") || document.documentElement.dataset.theme;

      if (sectionTheme === "papier") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Boucle d'animation fluide à 60 FPS avec lerp (amorti soyeux)
    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!supported) return null;

  const isLight = theme === "light";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          width: isLight ? "480px" : "620px",
          height: isLight ? "480px" : "620px",
          transition: "width 0.5s ease-out, height 0.5s ease-out",
        }}
      >
        {/* Halo principal diffus */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
          style={{
            background: isLight
              ? "radial-gradient(circle, rgba(179, 67, 30, 0.08) 0%, rgba(45, 38, 33, 0.04) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(226, 87, 43, 0.15) 0%, rgba(226, 87, 43, 0.04) 45%, transparent 70%)",
            filter: isLight ? "blur(40px)" : "blur(60px)",
          }}
        />

        {/* Noyau central lumineux discret */}
        <div
          className="absolute inset-[25%] rounded-full transition-all duration-500 ease-out"
          style={{
            background: isLight
              ? "radial-gradient(circle, rgba(179, 67, 30, 0.06) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(242, 239, 233, 0.06) 0%, rgba(226, 87, 43, 0.12) 35%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />
      </div>
    </div>
  );
}
