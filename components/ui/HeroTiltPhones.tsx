"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

function PhoneFrame({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2.2rem] border-[6px] border-[#1c1b1d] bg-[#121113] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(226,87,43,0.12)] transition-shadow duration-500 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 22vw, 56vw"
        className="block w-full h-auto rounded-[1.8rem]"
      />
    </div>
  );
}

export function HeroTiltPhones() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    if (mq.matches) return () => mq.removeEventListener("change", handler);

    let rafId: number;
    let targetRx = 0;
    let targetRy = 0;
    let targetTx = 0;
    let targetTy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 à 1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 à 1

      targetRx = -normY * 8; // Max 8 deg rotation X
      targetRy = normX * 12; // Max 12 deg rotation Y
      targetTx = normX * 16; // Max 16px translation X
      targetTy = normY * 16; // Max 16px translation Y
    };

    const updateLoop = () => {
      setTilt((prev) => ({
        rx: prev.rx + (targetRx - prev.rx) * 0.08,
        ry: prev.ry + (targetRy - prev.ry) * 0.08,
        tx: prev.tx + (targetTx - prev.tx) * 0.08,
        ty: prev.ty + (targetTy - prev.ty) * 0.08,
      }));
      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      mq.removeEventListener("change", handler);
    };
  }, []);

  return (
    <figure
      ref={containerRef}
      className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] h-[380px] sm:h-[450px] lg:h-[480px] pointer-events-none perspective-[1200px]"
      aria-label="Aperçu des écrans NUNYA en 3D"
    >
      {/* Plan Arrière : Écran de Quiz (Profondeur z = -35px) */}
      <div
        className="absolute w-[180px] sm:w-[220px] lg:w-[240px] left-[4%] top-[12%] sm:left-[8%] lg:left-[6%] will-change-transform z-10"
        style={{
          transform: !reducedMotion && isClient
            ? `translate3d(${tilt.tx * 0.5}px, ${tilt.ty * 0.5}px, -35px) rotateX(${tilt.rx * 0.7}deg) rotateY(${tilt.ry * 0.7 - 7}deg)`
            : "rotate(-7deg)",
          transition: reducedMotion ? "none" : undefined,
        }}
      >
        <PhoneFrame
          src="/images/projects/nunya-quiz.png"
          alt="NUNYA — sélection des épreuves et révision hors ligne"
          width={472}
          height={1022}
          className="opacity-70"
        />
        <div className="mt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <p className="text-label text-muted font-mono uppercase tracking-wider text-[10px] sm:text-xs">
            NUNYA · 100% hors ligne
          </p>
        </div>
      </div>

      {/* Plan Avant : Écran Classement & Mobile Money (Profondeur z = +25px, plus réactif) */}
      <div
        className="absolute w-[200px] sm:w-[245px] lg:w-[270px] right-[4%] top-[2%] sm:right-[8%] lg:right-[6%] will-change-transform z-20"
        style={{
          transform: !reducedMotion && isClient
            ? `translate3d(${tilt.tx * 1.2}px, ${tilt.ty * 1.2}px, 25px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry + 5}deg)`
            : "rotate(5deg)",
          transition: reducedMotion ? "none" : undefined,
        }}
      >
        <div className="relative group">
          <PhoneFrame
            src="/images/projects/nunya-mobile-real.png"
            alt="NUNYA — compte à rebours examen BAC 1 et suivi de révision"
            width={472}
            height={1024}
            className="ring-1 ring-white/10"
          />

          {/* Badge flottant 3D d'impact */}
          <div
            className="absolute -bottom-3 -left-3 sm:-left-5 z-30 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#141416]/95 border border-line-strong shadow-2xl backdrop-blur-md text-ink text-[10px] sm:text-xs font-mono"
            style={{
              transform: !reducedMotion && isClient
                ? `translate3d(${tilt.tx * 0.4}px, ${tilt.ty * 0.4}px, 45px)`
                : undefined,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>FedaPay · T-Money / Flooz</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
