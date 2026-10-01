"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/motion";

/*
 * Ce que je fais. Pas une grille de cartes égales (MOTION-CRAFT §8) : quatre
 * lignes séparées par des filets, chacune sur des colonnes inégales.
 * Le numéro, le métier, ce que ça règle, ce qui est livré.
 */
const services = [
  {
    id: "mobile",
    title: "Applications mobiles offline-first",
    description:
      "Des apps React Native / Expo pensées pour les réseaux instables et les smartphones d'entrée de gamme : tout fonctionne hors-ligne, la synchronisation se fait en arrière-plan.",
    deliverables: ["React Native & Expo", "Synchronisation en arrière-plan", "Push notifications & stockage local"],
  },
  {
    id: "fintech",
    title: "Paiements Mobile Money",
    description:
      "Intégration de FedaPay, T-Money et Flooz avec des webhooks signés, une logique anti-fraude et un ledger fiable pour encaisser et redistribuer des fonds en toute sécurité.",
    deliverables: ["FedaPay · T-Money · Flooz", "Webhooks sécurisés & signés", "Anti-fraude & ledger"],
  },
  {
    id: "automation",
    title: "Automatisation & bots IA",
    description:
      "Pipelines n8n, scrapers et bots Telegram qui collectent, résument et livrent l'information au bon moment, pour réduire drastiquement les tâches manuelles répétitives.",
    deliverables: ["Workflows n8n modulaires", "Scraping & extraction IA", "Rapports et e-mails automatisés"],
  },
  {
    id: "web",
    title: "Backends & plateformes web",
    description:
      "APIs REST Node.js / PostgreSQL sécurisées, dashboards d'administration et sites vitrines rapides, déployés en continu sur Docker, Railway ou Netlify.",
    deliverables: ["APIs REST & JWT", "Dashboards d'administration", "CI/CD Docker · Railway · Netlify"],
  },
];

export function Services() {
  return (
    <section id="services" data-theme-section="atelier" className="relative py-24 md:py-32">
      <div className="frame">
        <SectionHeader
          eyebrow="Ce que je fais"
          title="De l'idée à la production."
          description="Quatre domaines d'intervention, un même objectif : livrer des produits fiables, adaptés au contexte local et pensés pour durer."
          indent={3}
          className="mb-16 md:mb-20"
        />

        <ol className="border-t border-line">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              as="li"
              delay={i * 0.06}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 py-10 lg:py-12 border-b border-line"
            >
              <span className="lg:col-span-1 text-label text-accent pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="lg:col-span-4 font-display uppercase text-ink leading-[0.95] tracking-[-0.01em] text-[clamp(1.75rem,2.8vw,2.75rem)] text-balance">
                {service.title}
              </h3>
              <p className="lg:col-span-4 text-muted leading-relaxed text-pretty">{service.description}</p>
              <ul className="lg:col-span-3 space-y-2 font-mono text-xs text-faint leading-relaxed lg:pt-1">
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
