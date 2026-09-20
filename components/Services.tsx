"use client";

import React from "react";
import {
  Smartphone,
  CreditCard,
  Workflow,
  Globe,
  WifiOff,
  ShieldCheck,
  Bot,
  Gauge,
  Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

type Accent = "emerald" | "cyan" | "indigo" | "amber";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accent: Accent;
  chips: { label: string; icon: React.ElementType }[];
  deliverables: string[];
}

const services: Service[] = [
  {
    id: "mobile",
    title: "Applications mobiles offline-first",
    description:
      "Des apps React Native / Expo pensées pour les réseaux instables et les smartphones d'entrée de gamme : tout fonctionne hors-ligne, la synchronisation se fait en arrière-plan.",
    icon: Smartphone,
    accent: "emerald",
    chips: [
      { label: "Hors-ligne", icon: WifiOff },
      { label: "Expo SDK", icon: Layers },
    ],
    deliverables: ["React Native & Expo", "Synchronisation en arrière-plan", "Push notifications & stockage local"],
  },
  {
    id: "fintech",
    title: "Paiements Mobile Money",
    description:
      "Intégration de FedaPay, T-Money et Flooz avec des webhooks signés, une logique anti-fraude et un ledger fiable pour encaisser et redistribuer des fonds en toute sécurité.",
    icon: CreditCard,
    accent: "cyan",
    chips: [
      { label: "Webhooks signés", icon: ShieldCheck },
      { label: "FedaPay", icon: CreditCard },
    ],
    deliverables: ["FedaPay · T-Money · Flooz", "Webhooks sécurisés & signés", "Anti-fraude & ledger"],
  },
  {
    id: "automation",
    title: "Automatisation & bots IA",
    description:
      "Pipelines n8n, scrapers et bots Telegram qui collectent, résument et livrent l'information au bon moment — pour réduire drastiquement les tâches manuelles répétitives.",
    icon: Workflow,
    accent: "indigo",
    chips: [
      { label: "Telegram", icon: Bot },
      { label: "n8n", icon: Workflow },
    ],
    deliverables: ["Workflows n8n modulaires", "Scraping & extraction IA", "Rapports et e-mails automatisés"],
  },
  {
    id: "web",
    title: "Backends & plateformes web",
    description:
      "APIs REST Node.js / PostgreSQL sécurisées, dashboards d'administration et sites vitrines rapides, déployés en continu sur Docker, Railway ou Netlify.",
    icon: Globe,
    accent: "amber",
    chips: [
      { label: "Node.js 22", icon: Gauge },
      { label: "PostgreSQL", icon: Layers },
    ],
    deliverables: ["APIs REST & JWT", "Dashboards d'administration", "CI/CD Docker · Railway · Netlify"],
  },
];

const palette: Record<
  Accent,
  { tile: string; icon: string; chip: string; dot: string; ring: string }
> = {
  emerald: {
    tile: "from-emerald-500/30 via-emerald-500/10 to-transparent",
    icon: "text-emerald-300",
    chip: "border-emerald-500/30 text-emerald-200 bg-emerald-500/10",
    dot: "bg-emerald-400",
    ring: "border-emerald-400/30",
  },
  cyan: {
    tile: "from-cyan-500/30 via-cyan-500/10 to-transparent",
    icon: "text-cyan-300",
    chip: "border-cyan-500/30 text-cyan-200 bg-cyan-500/10",
    dot: "bg-cyan-400",
    ring: "border-cyan-400/30",
  },
  indigo: {
    tile: "from-indigo-500/30 via-indigo-500/10 to-transparent",
    icon: "text-indigo-300",
    chip: "border-indigo-500/30 text-indigo-200 bg-indigo-500/10",
    dot: "bg-indigo-400",
    ring: "border-indigo-400/30",
  },
  amber: {
    tile: "from-amber-500/30 via-amber-500/10 to-transparent",
    icon: "text-amber-300",
    chip: "border-amber-500/30 text-amber-200 bg-amber-500/10",
    dot: "bg-amber-400",
    ring: "border-amber-400/30",
  },
};

/** Illustrated icon scene: gradient tile, orbiting ring and floating chips. */
function ServiceIllustration({ service }: { service: Service }) {
  const p = palette[service.accent];
  const Icon = service.icon;

  return (
    <div className="relative h-36 sm:h-40 mb-6 flex items-center justify-center overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.05] bg-grid-pattern">
      {/* Orbit ring */}
      <div
        aria-hidden
        className={cn(
          "absolute w-32 h-32 rounded-full border border-dashed animate-orbit",
          p.ring
        )}
      >
        <span className={cn("absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full", p.dot)} />
      </div>

      {/* Tile */}
      <div
        className={cn(
          "relative w-[4.5rem] h-[4.5rem] rounded-2xl bg-gradient-to-br border border-white/10 flex items-center justify-center shadow-2xl shadow-black/40 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-3",
          p.tile
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-[#0d1322]/70" />
        <Icon className={cn("relative w-8 h-8", p.icon)} strokeWidth={1.6} />
      </div>

      {/* Floating chips */}
      {service.chips.map(({ label, icon: ChipIcon }, i) => (
        <span
          key={label}
          className={cn(
            "absolute inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium shadow-lg shadow-black/30 transition-transform duration-500 ease-out-expo",
            p.chip,
            i === 0
              ? "top-5 left-5 animate-float group-hover:-translate-y-1"
              : "bottom-5 right-5 animate-float-delayed group-hover:translate-y-1"
          )}
        >
          <ChipIcon className="w-3 h-3" />
          {label}
        </span>
      ))}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          accent="emerald"
          icon={<Layers className="w-3.5 h-3.5" />}
          eyebrow="Ce que je fais"
          title="Des solutions concrètes, de l'idée à la production"
          description="Quatre domaines d'intervention, un même objectif : livrer des produits fiables, adaptés au contexte local et pensés pour durer."
          className="mb-14"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((service) => {
            const p = palette[service.accent];
            return (
              <StaggerItem key={service.id} className="h-full">
                <SpotlightCard accent={service.accent} className="group h-full p-5 flex flex-col">
                  <ServiceIllustration service={service} />

                  <h3 className="text-lg font-bold text-white leading-snug mb-2.5">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed text-pretty mb-5">
                    {service.description}
                  </p>

                  <ul className="mt-auto space-y-2 pt-4 border-t border-white/[0.06]">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", p.dot)} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
