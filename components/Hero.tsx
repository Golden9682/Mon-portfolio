"use client";

import React from "react";
import {
  MapPin,
  ArrowRight,
  Cpu,
  CreditCard,
  CheckCircle2,
  Smartphone,
  Send,
  ChevronDown,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { m } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const highlights = [
  {
    icon: Smartphone,
    label: "Mobile & Offline",
    text: "React Native & Expo optimisés pour faible débit.",
    color: "text-emerald-400",
    accent: "emerald" as const,
  },
  {
    icon: CreditCard,
    label: "Fintech & Paiements",
    text: "FedaPay, T-Money, Flooz & webhooks sécurisés.",
    color: "text-cyan-400",
    accent: "cyan" as const,
  },
  {
    icon: Cpu,
    label: "Automatisation & Bots",
    text: "Pipelines n8n, scrapers & bots Telegram IA.",
    color: "text-indigo-400",
    accent: "indigo" as const,
  },
  {
    icon: CheckCircle2,
    label: "Double Profil",
    text: "Expertise technique & Licence en Communication.",
    color: "text-amber-400",
    accent: "amber" as const,
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-grid-pattern"
    >
      {/* Background glowing orbs */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-gradient-to-tr from-indigo-600/25 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-slow"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-float-delayed"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <m.div
          className="max-w-4xl mx-auto text-center"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          {/* Status badge */}
          <m.div variants={item} className="flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Disponible pour opportunités Freelance &amp; Remote / CDI</span>
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-indigo-400" /> Lomé, Togo
              </span>
            </div>
          </m.div>

          {/* Main Title */}
          <m.h1
            variants={item}
            className="text-display font-extrabold text-white text-balance mt-8"
          >
            Je transforme des idées en{" "}
            <span className="text-gradient animate-shimmer">produits digitaux</span>{" "}
            qui ont de l&apos;impact.
          </m.h1>

          {/* Subtitle */}
          <m.p
            variants={item}
            className="text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-2xl mx-auto mt-7 text-pretty"
          >
            Moi c&apos;est <strong className="text-white font-semibold">Kokou Komna Abdoul Raouf</strong>.
            Développeur Full-Stack &amp; Spécialiste de l&apos;Automatisation.
            Je conçois des applications mobiles <span className="text-emerald-400 font-medium">offline-first</span>,
            des intégrations <span className="text-cyan-400 font-medium">Mobile Money</span> (FedaPay / T-Money / Flooz)
            et des <span className="text-indigo-400 font-medium">workflows d&apos;automatisation</span> robustes.
          </m.p>

          {/* Action Buttons */}
          <m.div variants={item} className="flex flex-wrap items-center justify-center gap-3.5 mt-10">
            <a href="#projets" className="btn btn-primary px-6 py-3.5 text-sm group">
              Découvrir mes projets
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a href="#contact" className="btn btn-secondary px-6 py-3.5 text-sm group">
              <Send className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              Discuter d&apos;un projet
            </a>
          </m.div>

          {/* Key Value Points */}
          <m.div
            variants={item}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-14 max-w-4xl mx-auto"
          >
            {highlights.map(({ icon: Icon, label, text, color, accent }) => (
              <SpotlightCard
                key={label}
                accent={accent}
                className="p-4 text-left rounded-xl"
              >
                <div className={`flex items-center gap-2 ${color} text-xs font-semibold mb-1.5`}>
                  <Icon className="w-4 h-4" /> {label}
                </div>
                <p className="text-xs text-slate-400 leading-snug">{text}</p>
              </SpotlightCard>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* Scroll hint */}
      <m.a
        href="#services"
        aria-label="Faire défiler"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Défiler</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </m.a>
    </section>
  );
}
