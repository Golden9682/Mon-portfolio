"use client";

import React from "react";
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Download, 
  Layers, 
  Cpu, 
  CreditCard, 
  CheckCircle2, 
  Smartphone,
  Send
} from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-medium text-slate-300 shadow-sm animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
            <span>Disponible pour opportunités Freelance & Remote / CDI</span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-indigo-400" /> Lomé, Togo
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Je transforme des idées en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              produits digitaux
            </span>{" "}
            qui ont de l&apos;impact.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Moi c&apos;est <strong className="text-white font-semibold">Kokou Komna Abdoul Raouf</strong>. 
            Développeur Full-Stack &amp; Spécialiste de l&apos;Automatisation. 
            Je conçois des applications mobiles <span className="text-emerald-400 font-medium">offline-first</span>, 
            des intégrations <span className="text-cyan-400 font-medium">Mobile Money</span> (FedaPay / T-Money / Flooz) 
            et des <span className="text-indigo-400 font-medium">workflows d&apos;automatisation</span> robustes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#projets"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all"
            >
              Découvrir mes projets
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-sm backdrop-blur-md hover:-translate-y-0.5 transition-all"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              Discuter d&apos;un projet
            </a>
          </div>

          {/* Key Value Points Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto">
            <div className="glass-panel p-3.5 rounded-xl text-left border border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                <Smartphone className="w-4 h-4" /> Mobile &amp; Offline
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                React Native &amp; Expo optimisés pour faible débit.
              </p>
            </div>

            <div className="glass-panel p-3.5 rounded-xl text-left border border-white/5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                <CreditCard className="w-4 h-4" /> Fintech &amp; Paiements
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                FedaPay, T-Money, Flooz &amp; webhooks sécurisés.
              </p>
            </div>

            <div className="glass-panel p-3.5 rounded-xl text-left border border-white/5">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
                <Cpu className="w-4 h-4" /> Automatisation &amp; Bots
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Pipelines n8n, scrapers &amp; bots Telegram IA.
              </p>
            </div>

            <div className="glass-panel p-3.5 rounded-xl text-left border border-white/5">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4" /> Double Profil
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Expertise technique &amp; Licence en Communication.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
