"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { 
  ArrowUpRight, 
  Sparkles, 
  Wifi, 
  Battery, 
  Smartphone,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  year: string;
  category: string;
  tag?: string;
  link?: string;
  image: string;
  logo?: string;
  techStack?: string[];
  originalProject?: Project;
}

interface ProjectShowcaseProps {
  projects?: ShowcaseProject[];
  onSelectProject?: (project: Project) => void;
  title?: string;
  subtitle?: string;
}

export function ProjectShowcase({
  projects = [],
  onSelectProject,
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full mx-auto"
    >
      {/* Floating Smartphone Mockup on Hover (Desktop) */}
      <div
        className="pointer-events-none fixed z-50 hidden lg:block overflow-hidden transition-all duration-300"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 30}px, ${smoothPosition.y - 200}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), scale 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Realistic Smartphone Phone Frame */}
        <div className="relative w-[240px] h-[460px] bg-[#0c111d] rounded-[42px] p-2.5 border-[5px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(99,102,241,0.25)] ring-1 ring-white/20">
          
          {/* Inner Phone Bezel & Screen */}
          <div className="relative w-full h-full bg-[#090d16] rounded-[34px] overflow-hidden flex flex-col justify-between border border-white/10">
            
            {/* Top Status Bar with Dynamic Island */}
            <div className="relative z-20 pt-2 px-5 flex items-center justify-between text-[10px] text-white/80 font-medium">
              <span>9:41</span>
              
              {/* Dynamic Island Pill */}
              <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end px-1.5 gap-1 border border-white/10 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
              </div>

              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Mobile Screen Contents */}
            <div className="absolute inset-0 pt-8 pb-6 px-1.5 overflow-hidden">
              {projects.map((project, index) => (
                <div
                  key={project.id || project.title}
                  className="absolute inset-0 w-full h-full p-2 flex flex-col items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? "scale(1) translateY(0)" : "scale(1.08) translateY(12px)",
                    filter: hoveredIndex === index ? "none" : "blur(10px)",
                  }}
                >
                  {/* Phone Screen Wallpaper / UI */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-slate-950 flex flex-col">
                    <img
                      src={project.image || "/images/projects/nunya-mobile-leaderboard.png"}
                      alt={`Interface ${project.title}`}
                      className="w-full h-full object-cover object-top"
                    />
                    
                    {/* Bottom floating badge inside mobile UI */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-indigo-300 font-semibold uppercase">
                          {project.category}
                        </div>
                        <div className="text-white text-xs font-bold leading-tight mt-0.5">
                          {project.title}
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-20 pb-1.5 flex justify-center">
              <div className="w-24 h-1 bg-white/40 rounded-full" />
            </div>

          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-0">
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={project.id || project.title}
              onClick={() => {
                if (project.originalProject && onSelectProject) {
                  onSelectProject(project.originalProject);
                }
              }}
              className="group block cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative py-6 border-t border-white/[0.08] transition-all duration-300 ease-out">
                {/* Background highlight on hover */}
                <div
                  className={cn(
                    "absolute inset-0 -mx-4 px-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl transition-all duration-300 ease-out",
                    isHovered ? "opacity-100 scale-100 shadow-lg shadow-black/20" : "opacity-0 scale-[0.98] pointer-events-none"
                  )}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left: Logo/Icon + Title + Subtitle */}
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    {/* Project Logo or Icon */}
                    {project.logo ? (
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 p-1.5 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 group-hover:border-indigo-500/30 transition-all duration-300 shadow-md">
                        <img
                          src={project.logo}
                          alt={`Logo ${project.title}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Smartphone className="w-5 h-5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Title with animated underline */}
                        <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                          <span className="relative inline-block">
                            {project.title}
                            <span
                              className={cn(
                                "absolute left-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 ease-out",
                                isHovered ? "w-full" : "w-0"
                              )}
                            />
                          </span>
                        </h3>

                        {project.tag && (
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                            {project.tag}
                          </span>
                        )}
                      </div>

                      {/* Description with subtle color transition */}
                      <p
                        className={cn(
                          "text-xs sm:text-sm mt-1.5 leading-relaxed transition-colors duration-300",
                          isHovered ? "text-slate-200" : "text-slate-400"
                        )}
                      >
                        {project.description}
                      </p>

                      {/* Tech stack badges */}
                      {project.techStack && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {project.techStack.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Year + Action CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-white/[0.04] md:border-0">
                    <span
                      className={cn(
                        "text-xs font-mono text-slate-500 tabular-nums transition-colors duration-300",
                        isHovered && "text-indigo-300"
                      )}
                    >
                      {project.year}
                    </span>

                    {/* Arrow that slides in */}
                    <div
                      className={cn(
                        "p-2 rounded-xl border transition-all duration-300 flex items-center justify-center",
                        isHovered
                          ? "bg-indigo-600 border-indigo-500 text-white translate-x-0 opacity-100 shadow-md shadow-indigo-600/30"
                          : "bg-white/[0.03] border-white/10 text-slate-400 opacity-60"
                      )}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

                {/* Mobile / Tablet View: Phone Mockup Frame */}
                <div className="block lg:hidden mt-5">
                  <div className="relative mx-auto max-w-[240px] h-[400px] bg-[#0c111d] rounded-[36px] p-2 border-[4px] border-slate-700/80 shadow-xl overflow-hidden">
                    <div className="relative w-full h-full bg-[#090d16] rounded-[28px] overflow-hidden flex flex-col justify-between border border-white/10">
                      
                      {/* Mini top notch */}
                      <div className="relative z-10 pt-2 px-3 flex justify-between items-center text-[9px] text-white/70">
                        <span>9:41</span>
                        <div className="w-12 h-3 bg-black rounded-full" />
                        <div className="flex items-center gap-1">
                          <Wifi className="w-2.5 h-2.5" />
                          <Battery className="w-2.5 h-2.5" />
                        </div>
                      </div>

                      {/* Screen Image */}
                      <div className="absolute inset-0 pt-7 pb-4 px-1">
                        <img
                          src={project.image || "/images/projects/nunya-mobile-leaderboard.png"}
                          alt={`Interface mobile ${project.title}`}
                          className="w-full h-full object-cover object-top rounded-xl"
                        />
                      </div>

                      {/* Bottom indicator */}
                      <div className="relative z-10 pb-1 flex justify-center">
                        <div className="w-16 h-1 bg-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-2.5">
                    <span className="text-[11px] text-indigo-400 font-medium inline-flex items-center gap-1 hover:underline">
                      Ouvrir l&apos;étude de cas complète <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* Bottom border */}
        <div className="border-t border-white/[0.08]" />
      </div>
    </div>
  );
}
