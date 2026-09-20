"use client";

import React from "react";
import { User, Languages, Rocket, Brain, CheckCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, m } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

const values = [
  { color: "text-emerald-400", label: "Approche Offline-First :", text: "Garantir l'accès continu aux services même sans réseau." },
  { color: "text-cyan-400", label: "Fintech Locale :", text: "Intégration native des flux T-Money & Flooz via FedaPay." },
  { color: "text-indigo-400", label: "Automatisation Utile :", text: "Réduction drastique des tâches manuelles répétitives." },
  { color: "text-amber-400", label: "Impact Africain :", text: "Passionné par l'EdTech et le développement par la tech en Afrique." },
];

const languages = [
  { name: "Français", level: "Langue Maternelle", width: "100%", bar: "from-indigo-500 to-indigo-400", label: "text-indigo-300" },
  { name: "Anglais", level: "Courant / Professionnel (B2)", width: "80%", bar: "from-cyan-500 to-cyan-400", label: "text-cyan-300" },
  { name: "Allemand", level: "Intermédiaire", width: "50%", bar: "from-amber-500 to-amber-400", label: "text-amber-300" },
];

const interests = [
  "Tech for Africa",
  "EdTech & Gamification",
  "Automatisation & AI Workflows",
  "Entrepreneuriat Digital",
  "Sport & Lecture",
];

export function About() {
  return (
    <section id="a-propos" className="py-20 md:py-28 relative">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          accent="violet"
          icon={<User className="w-3.5 h-3.5" />}
          eyebrow="Profil & Philosophie"
          title="À Propos de Moi"
          description="Développeur autodidacte passionné, alliant créativité technique et rigueur en communication stratégique."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Story */}
          <Reveal className="lg:col-span-7 h-full" direction="right">
            <SpotlightCard accent="violet" className="h-full p-6 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
                  <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Brain className="w-5 h-5 text-indigo-400" />
                  </span>
                  Bâtir des solutions ancrées dans le réel
                </h3>

                <p className="text-slate-300 text-[15px] sm:text-base leading-relaxed text-pretty">
                  Basé à <strong className="text-white font-semibold">Lomé (Togo)</strong>, je conçois des produits numériques complets — de l&apos;application mobile moderne aux chaînes d&apos;automatisation métier. Ma démarche est guidée par un objectif clair : <span className="text-emerald-400 font-medium">résoudre des problèmes concrets avec des outils fiables et adaptés au contexte local</span> (gestion des zones hors-ligne, Mobile Money, performance sur smartphones d&apos;entrée de gamme).
                </p>

                <p className="text-slate-300 text-[15px] sm:text-base leading-relaxed text-pretty">
                  Diplômé en <strong className="text-white font-semibold">Communication des Organisations (ESAG-NDE)</strong> et développeur autodidacte, je fais le pont entre les exigences techniques complexes et les besoins fonctionnels des utilisateurs et des entreprises.
                </p>
              </div>

              {/* Core Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/[0.08]">
                {values.map((v) => (
                  <div
                    key={v.label}
                    className="flex items-start gap-2.5 text-[13px] text-slate-300 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.04] transition-colors"
                  >
                    <CheckCircle className={cn("w-4 h-4 mt-0.5 shrink-0", v.color)} />
                    <span>
                      <strong className="text-white">{v.label}</strong> {v.text}
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Languages & Interests */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal direction="left" delay={0.1} className="flex-1">
              <SpotlightCard accent="cyan" className="h-full p-6 space-y-5">
                <h4 className="text-base font-bold text-white flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <Languages className="w-4 h-4 text-cyan-400" />
                  </span>
                  Langues &amp; Communication
                </h4>
                <div className="space-y-4">
                  {languages.map((lang, i) => (
                    <div key={lang.name}>
                      <div className="flex justify-between items-baseline text-xs font-semibold mb-1.5">
                        <span className="text-slate-200">{lang.name}</span>
                        <span className={lang.label}>{lang.level}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <m.div
                          initial={{ width: 0 }}
                          whileInView={{ width: lang.width }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                          className={cn("h-full rounded-full bg-gradient-to-r", lang.bar)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <SpotlightCard accent="emerald" className="p-6 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Rocket className="w-4 h-4 text-emerald-400" />
                  </span>
                  Centres d&apos;Intérêt
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-white"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
