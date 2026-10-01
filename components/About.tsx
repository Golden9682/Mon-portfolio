"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/motion";

/*
 * À propos (temps 4 du scroll : la personne). Un texte qui respire à gauche,
 * les données factuelles en marge à droite. Pas de cartes, pas de barres de
 * niveau de langue : le niveau s'écrit.
 */
const values = [
  { label: "Offline-first", text: "Garantir l'accès continu aux services même sans réseau." },
  { label: "Fintech locale", text: "Intégration native des flux T-Money & Flooz via FedaPay." },
  { label: "Automatisation utile", text: "Réduction drastique des tâches manuelles répétitives." },
  { label: "Tech en Afrique", text: "L'EdTech et le développement par la technologie." },
];

const languages = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "Courant / professionnel (B2)" },
  { name: "Allemand", level: "Intermédiaire" },
];

const interests = [
  "Tech for Africa",
  "EdTech & gamification",
  "Automatisation & AI workflows",
  "Entrepreneuriat digital",
  "Sport & lecture",
];

export function About() {
  return (
    <section id="a-propos" className="relative py-24 md:py-32">
      <div className="frame">
        <SectionHeader
          eyebrow="Profil & philosophie"
          title="À propos de moi"
          description="Développeur autodidacte, alliant créativité technique et rigueur en communication stratégique."
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16">
          <Reveal className="lg:col-span-7">
            <h3 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight text-balance">
              Des produits ancrés dans le réel.
            </h3>
            <div className="mt-6 space-y-5 text-lg text-muted leading-relaxed text-pretty">
              <p>
                Basé à <strong className="text-ink font-semibold">Lomé (Togo)</strong>, je conçois des produits
                numériques complets, de l&apos;application mobile moderne aux chaînes d&apos;automatisation métier. Ma
                démarche est guidée par un objectif clair :{" "}
                <span className="text-ink">
                  résoudre des problèmes concrets avec des outils fiables et adaptés au contexte local
                </span>{" "}
                (gestion des zones hors-ligne, Mobile Money, performance sur smartphones d&apos;entrée de gamme).
              </p>
              <p>
                Diplômé en{" "}
                <strong className="text-ink font-semibold">Communication des Organisations (ESAG-NDE)</strong> et
                développeur autodidacte, je fais le pont entre les exigences techniques complexes et les besoins
                fonctionnels des utilisateurs et des entreprises.
              </p>
            </div>

            <dl className="mt-12 border-t border-line">
              {values.map((v) => (
                <div key={v.label} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-x-6 gap-y-1 py-4 border-b border-line">
                  <dt className="text-label text-accent pt-1">{v.label}</dt>
                  <dd className="text-muted">{v.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="lg:col-start-9 lg:col-span-4 space-y-12" delay={0.1}>
            <div>
              <h4 className="text-label text-faint mb-4">Langues</h4>
              <dl className="border-t border-line">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-baseline justify-between gap-6 py-3 border-b border-line">
                    <dt className="text-ink">{lang.name}</dt>
                    <dd className="text-sm text-muted text-right">{lang.level}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h4 className="text-label text-faint mb-4">Centres d&apos;intérêt</h4>
              <ul className="space-y-2 text-muted">
                {interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
