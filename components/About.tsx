"use client";

import React from "react";
import { 
  User, 
  Code2, 
  Languages, 
  Globe2, 
  Sparkles, 
  Rocket, 
  Brain,
  CheckCircle,
  Award
} from "lucide-react";

export function About() {
  return (
    <section id="a-propos" className="py-20 relative bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            Profil &amp; Philosophie
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            À Propos de Moi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Développeur autodidacte passionné, alliant créativité technique et rigueur en communication stratégique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story (8 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Brain className="w-6 h-6 text-indigo-400" />
                Bâtir des solutions ancrées dans le réel
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Basé à <strong className="text-white">Lomé (Togo)</strong>, je conçois des produits numériques complets — de l&apos;application mobile moderne aux chaînes d&apos;automatisation métier. Ma démarche est guidée par un objectif clair : <span className="text-emerald-400 font-medium">résoudre des problèmes concrets avec des outils fiables et adaptés au contexte local</span> (gestion des zones hors-ligne, Mobile Money, performance sur smartphones d&apos;entrée de gamme).
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Diplômé en <strong className="text-white">Communication des Organisations (ESAG-NDE)</strong> et développeur autodidacte, je fais le pont entre les exigences techniques complexes et les besoins fonctionnels des utilisateurs et des entreprises.
              </p>
            </div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Approche Offline-First :</strong> Garantir l&apos;accès continu aux services même sans réseau.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span><strong>Fintech Locale :</strong> Intégration native des flux T-Money &amp; Flooz via FedaPay.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <span><strong>Automatisation Utile :</strong> Réduction drastique des tâches manuelles répétitives.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span><strong>Impact Africain :</strong> Passionné par l&apos;EdTech et le développement par la tech en Afrique.</span>
              </div>
            </div>
          </div>

          {/* Languages & Quick Facts (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Languages Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Languages className="w-5 h-5 text-cyan-400" />
                Langues &amp; Communication
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">Français</span>
                    <span className="text-indigo-400">Langue Maternelle</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-full rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">Anglais</span>
                    <span className="text-cyan-400">Courant / Professionnel (B2)</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[80%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">Allemand</span>
                    <span className="text-amber-400">Intermédiaire</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[50%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats / Highlights */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-emerald-400" />
                Centres d&apos;Intérêt
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Tech for Africa",
                  "EdTech & Gamification",
                  "Automatisation & AI Workflows",
                  "Entrepreneuriat Digital",
                  "Sport & Lecture"
                ].map((interest, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
