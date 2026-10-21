import React from "react";
import { MapPin, Cpu, CreditCard, CheckCircle2, Smartphone, ArrowUpRight, Sparkles } from "lucide-react";
import { ParallaxScope } from "@/components/ui/ParallaxScope";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroTiltPhones } from "@/components/ui/HeroTiltPhones";
import { MagneticAssembly, AssemblyFragment } from "@/components/ui/MagneticAssembly";

const delay = (i: number) => ({ "--d": `${0.1 + i * 0.08}s` }) as React.CSSProperties;

const contraintes = [
  { icon: Smartphone, label: "Mobile & offline", text: "React Native & Expo optimisés pour faible débit." },
  { icon: CreditCard, label: "Fintech & paiements", text: "FedaPay, T-Money, Flooz & webhooks sécurisés." },
  { icon: Cpu, label: "Automatisation & bots", text: "Pipelines n8n, scrapers & bots Telegram IA." },
  { icon: CheckCircle2, label: "Double profil", text: "Expertise technique & Licence en Communication." },
];

export function Hero() {
  return (
    <section id="hero" data-theme-section="atelier" className="relative overflow-hidden mesh-atelier">
      <ParallaxScope className="relative z-10">
        <div className="relative frame pt-36 pb-20 md:pt-44 md:pb-28">
          
          {/* Badge de statut & Localisation en temps réel */}
          <div
            style={delay(0)}
            className="hero-rise flex flex-wrap items-center gap-x-6 gap-y-2 text-label text-muted mb-8 md:mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raise border border-line text-ink text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Disponible — freelance, remote ou CDI
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-accent" /> Lomé, Togo
            </span>
            <span className="hidden sm:inline text-xs font-mono text-faint">GMT / UTC+0</span>
          </div>

          {/* Révélation cinétique du titre principal */}
          <div className="overflow-hidden">
            <h1
              style={delay(1)}
              className="hero-rise relative z-10 text-display text-ink tracking-tight select-none"
            >
              <span className="block overflow-hidden py-1">
                <span className="block transition-transform duration-700 ease-out">
                  Le réseau tombe.
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="block transition-transform duration-700 ease-out delay-75">
                  L&apos;app,{" "}
                  <em className="text-accent-word text-accent relative inline-block not-italic transition-all duration-300 hover:scale-105">
                    non.
                  </em>
                </span>
              </span>
            </h1>
          </div>

          {/* Rupture d'axe & Présentation + Vitrine 3D smartphones */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 mt-10 md:mt-14 items-center">
            <div style={delay(2)} className="hero-rise relative z-10 lg:col-span-6 xl:col-span-6">
              <p className="text-lg sm:text-xl leading-relaxed text-muted text-pretty max-w-2xl">
                Moi c&apos;est <strong className="text-ink font-semibold">Kokou Komna Abdoul Raouf</strong>.
                Développeur Full-Stack &amp; Spécialiste de l&apos;Automatisation.
                Je conçois des applications mobiles <span className="text-ink font-medium">offline-first</span>,
                des intégrations <span className="text-ink font-medium">Mobile Money</span> (FedaPay / T-Money / Flooz)
                et des <span className="text-ink font-medium">workflows d&apos;automatisation</span> robustes.
              </p>

              {/* Boutons d'action magnétiques 21st.dev */}
              <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-10">
                <MagneticButton
                  href="#projets"
                  strength={0.32}
                  radius={90}
                  className="btn btn-primary group shadow-lg shadow-accent/15"
                >
                  <span>Regarde ce que j&apos;ai construit</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>

                <MagneticButton
                  href="#contact"
                  strength={0.25}
                  radius={80}
                  className="btn btn-secondary group hover:border-line-strong"
                >
                  <span>Dis-moi ce qu&apos;il te faut</span>
                </MagneticButton>
              </div>
            </div>

            {/* Vitrine interactive 3D Tilt des smartphones NUNYA */}
            <div style={delay(3)} className="hero-rise lg:col-span-6 xl:col-span-6 relative w-full flex justify-center lg:justify-end">
              <HeroTiltPhones />
            </div>
          </div>

          {/* Contraintes de terrain & Savoir-faire avec micro-interactions */}
          <MagneticAssembly
            as="ul"
            stagger={0.07}
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-20 md:mt-28 border-t border-line bg-bg/0"
          >
            {contraintes.map(({ icon: Icon, label, text }, idx) => (
              <AssemblyFragment
                key={label}
                as="li"
                index={idx}
                direction="auto"
                className="group py-6 lg:py-7 lg:px-7 lg:first:pl-0 border-b sm:border-b-0 border-line lg:border-l lg:first:border-l-0 transition-colors duration-300 hover:bg-surface/50"
              >
                <div className="flex items-center gap-2 text-label text-accent mb-3 transition-transform duration-300 group-hover:translate-x-1">
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>{label}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed max-w-[28ch] group-hover:text-ink transition-colors duration-300">
                  {text}
                </p>
              </AssemblyFragment>
            ))}
          </MagneticAssembly>

        </div>
      </ParallaxScope>
    </section>
  );
}
