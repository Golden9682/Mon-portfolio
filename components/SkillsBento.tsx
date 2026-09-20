"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import { 
  Smartphone, 
  Server, 
  Cpu, 
  CreditCard, 
  Wrench, 
  MessageSquare, 
  Sparkles,
  CheckCircle,
  Zap
} from "lucide-react";

export function SkillsBento() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone": return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case "Server": return <Server className="w-5 h-5 text-indigo-400" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-amber-400" />;
      case "CreditCard": return <CreditCard className="w-5 h-5 text-cyan-400" />;
      case "Wrench": return <Wrench className="w-5 h-5 text-violet-400" />;
      case "MessageSquare": return <MessageSquare className="w-5 h-5 text-rose-400" />;
      default: return <Zap className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "emerald": return "glow-emerald border-emerald-500/20";
      case "indigo": return "glow-indigo border-indigo-500/20";
      case "amber": return "glow-amber border-amber-500/20";
      case "cyan": return "glow-cyan border-cyan-500/20";
      case "violet": return "border-violet-500/20 hover:border-violet-500/40";
      case "rose": return "border-rose-500/20 hover:border-rose-500/40";
      default: return "border-white/10";
    }
  };

  return (
    <section id="competences" className="py-20 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Stack &amp; Savoir-Faire
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compétences &amp; Écosystème Technique
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Un équilibre entre rigueur d&apos;ingénierie logicielle, technologies mobiles actuelles et pragmatisme métier.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className={`glass-panel p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${getColorClass(
                category.color
              )}`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Category Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {category.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                        skill.highlight
                          ? "bg-white/10 text-white border border-white/20 shadow-sm"
                          : "bg-white/[0.03] text-slate-300 border border-white/5"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-500">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Maîtrisé &amp; éprouvé en production</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
