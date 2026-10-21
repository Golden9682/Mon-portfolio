"use client";

import React, { useEffect, useRef } from "react";

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  r: number;
  g: number;
  b: number;
}

export function AmbientCursorBacklight() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Uniquement pour les ordinateurs avec souris (pas sur smartphone/tactile)
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: DustParticle[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let isMoving = false;
    let animId: number;
    let currentTheme: "dark" | "light" = "dark";

    // Palettes de poussière selon le thème
    const darkPalette = [
      { r: 226, g: 87, b: 43 },   // Brique accent
      { r: 251, g: 169, b: 76 },  // Ambre doré
      { r: 242, g: 239, b: 233 }, // Étoile claire
      { r: 255, g: 120, b: 70 },  // Étincelle chaude
    ];

    const lightPalette = [
      { r: 179, g: 67, b: 30 },   // Terracotta foncé
      { r: 81, g: 74, b: 66 },    // Encre anthracite
      { r: 130, g: 124, b: 116 }, // Sépia doux
      { r: 195, g: 90, b: 50 },   // Brique papier
    ];

    const spawnParticles = (x: number, y: number, count = 2) => {
      const palette = currentTheme === "light" ? lightPalette : darkPalette;
      for (let i = 0; i < count; i++) {
        const color = palette[Math.floor(Math.random() * palette.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.3;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // Légère dérive vers le haut
          size: Math.random() * 2.2 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.028 + 0.02, // Durée ~0.5s à 0.8s
          r: color.r,
          g: color.g,
          b: color.b,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      // Détecte si le curseur est au-dessus d'une section claire ou sombre
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const section = el?.closest("[data-theme-section]");
      const themeVal = section?.getAttribute("data-theme-section") || document.documentElement.dataset.theme;
      currentTheme = themeVal === "papier" ? "light" : "dark";

      // Génère des grains de poussière directement sous le curseur
      spawnParticles(mouseX, mouseY, 3);

      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      mouseX = -100;
      mouseY = -100;
      isMoving = false;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Point lumineux précis collé au bout de la souris
      if (mouseX > 0 && mouseY > 0) {
        const glowRad = currentTheme === "light" ? 14 : 18;
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowRad);
        if (currentTheme === "light") {
          grad.addColorStop(0, "rgba(179, 67, 30, 0.45)");
          grad.addColorStop(0.5, "rgba(179, 67, 30, 0.15)");
          grad.addColorStop(1, "rgba(179, 67, 30, 0)");
        } else {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.75)");
          grad.addColorStop(0.25, "rgba(226, 87, 43, 0.55)");
          grad.addColorStop(0.7, "rgba(226, 87, 43, 0.15)");
          grad.addColorStop(1, "rgba(226, 87, 43, 0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Traînée de particules de poussière qui s'évaporent
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      // Si plus de particules et la souris ne bouge pas, on stoppe la boucle pour 0% CPU
      if (particles.length > 0 || isMoving) {
        isMoving = false;
        animId = requestAnimationFrame(render);
      } else {
        animId = 0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
