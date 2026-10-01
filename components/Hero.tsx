import React from "react";
import Image from "next/image";
import { MapPin, Cpu, CreditCard, CheckCircle2, Smartphone } from "lucide-react";
import { ParallaxScope } from "@/components/ui/ParallaxScope";

/*
 * Composant serveur. L'entrée est une animation CSS (`.hero-rise`,
 * globals.css) qui démarre au premier rendu : le titre ne dépend pas de
 * l'hydratation. Délais échelonnés de 90 ms.
 *
 * Trois plans (§3.5) : le titre et la matière (fixes), la capture du quiz
 * (lente), la capture du classement (rapide). Les captures débordent du
 * viewport à droite (§4) : c'est la preuve du titre, l'app NUNYA tourne
 * 100 % hors ligne.
 *
 * Pas de `priority` sur les captures : sur mobile elles sont sous la ligne de
 * flottaison, et leur préchargement en priorité haute retardait le premier
 * affichage du texte. Chargement paresseux par défaut : sur desktop, où elles
 * sont dans le viewport, elles partent juste après la mise en page.
 */
const delay = (i: number) => ({ "--d": `${0.12 + i * 0.09}s` }) as React.CSSProperties;

/* Les contraintes de terrain, pas une liste de services. */
const contraintes = [
  { icon: Smartphone, label: "Mobile & offline", text: "React Native & Expo optimisés pour faible débit." },
  { icon: CreditCard, label: "Fintech & paiements", text: "FedaPay, T-Money, Flooz & webhooks sécurisés." },
  { icon: Cpu, label: "Automatisation & bots", text: "Pipelines n8n, scrapers & bots Telegram IA." },
  { icon: CheckCircle2, label: "Double profil", text: "Expertise technique & Licence en Communication." },
];

function Phone({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-[#1c1b1d] bg-[#1c1b1d] ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 22vw, 56vw"
        className="block w-full h-auto rounded-[1.6rem]"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" data-theme-section="atelier" className="relative overflow-hidden mesh-atelier">
      <ParallaxScope className="relative">
        <div className="relative frame pt-36 pb-20 md:pt-44 md:pb-28">
          {/* Statut — une ligne de données, pas une pilule */}
          <div
            style={delay(0)}
            className="hero-rise flex flex-wrap items-center gap-x-6 gap-y-2 text-label text-muted mb-10 md:mb-14"
          >
            <span className="flex items-center gap-2 text-ink">
              <span className="w-1.5 h-1.5 bg-accent" />
              Disponible — freelance, remote ou CDI
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-accent" /> Lomé, Togo
            </span>
            <span className="hidden sm:inline">GMT / UTC+0</span>
          </div>

          {/* Le titre, aligné à gauche. Un seul mot porte la voix d'accent. */}
          <h1 style={delay(1)} className="hero-rise relative z-10 text-display text-ink">
            <span className="block">Le réseau tombe.</span>
            <span className="block">
              L&apos;app, <em className="text-accent-word text-accent">non.</em>
            </span>
          </h1>

          {/* Rupture d'axe : le texte reprend en retrait, pas sous le bord du titre */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 mt-12 md:mt-16">
            <div style={delay(2)} className="hero-rise relative z-10 lg:col-start-3 lg:col-span-6">
              <p className="text-lg sm:text-xl leading-relaxed text-muted text-pretty max-w-2xl">
                Moi c&apos;est <strong className="text-ink font-semibold">Kokou Komna Abdoul Raouf</strong>.
                Développeur Full-Stack &amp; Spécialiste de l&apos;Automatisation.
                Je conçois des applications mobiles <span className="text-ink">offline-first</span>,
                des intégrations <span className="text-ink">Mobile Money</span> (FedaPay / T-Money / Flooz)
                et des <span className="text-ink">workflows d&apos;automatisation</span> robustes.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a href="#projets" className="btn btn-primary">
                  Regarde ce que j&apos;ai construit
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Dis-moi ce qu&apos;il te faut
                </a>
              </div>
            </div>
          </div>

          {/* La preuve : NUNYA, deux plans, débordant à droite */}
          <figure
            style={delay(3)}
            className="hero-rise relative mt-16 h-[118vw] sm:h-[96vw] lg:mt-0 lg:h-auto lg:absolute lg:inset-y-0 lg:right-[calc((100%-100vw)/2)] lg:w-[40vw] pointer-events-none"
          >
            <div
              data-speed="0.08"
              className="absolute w-[42vw] left-[6vw] top-[4vw] sm:w-[30vw] sm:left-[14vw] lg:left-auto lg:w-[15vw] lg:right-[19vw] lg:top-[30vw] xl:top-[27vw] 2xl:w-[13vw] 2xl:right-[16vw] 2xl:top-[31vw]"
            >
              <Phone
                src="/images/projects/nunya-quiz.png"
                alt="NUNYA — écran de quiz hors ligne"
                width={472}
                height={1022}
                className="opacity-60 -rotate-6"
              />
              <p className="mt-8 text-label text-muted whitespace-nowrap">NUNYA<br />100 % hors ligne</p>
            </div>
            <div
              data-speed="0.24"
              className="absolute w-[54vw] -right-[12vw] top-0 sm:w-[40vw] sm:-right-[6vw] lg:w-[21vw] lg:-right-[5vw] lg:top-[20vw] xl:top-[17vw] 2xl:w-[18vw] 2xl:top-[18vw] rotate-[5deg]"
            >
              <Phone
                src="/images/projects/nunya-mobile-real.png"
                alt="NUNYA — classement mensuel et prix versés en Mobile Money"
                width={472}
                height={1024}
              />
            </div>
          </figure>

          {/* Les contraintes — rangée dense, bord à bord, séparée par des filets */}
          <ul
            style={delay(4)}
            className="hero-rise relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-20 md:mt-28 border-t border-line bg-bg/0"
          >
            {contraintes.map(({ icon: Icon, label, text }) => (
              <li
                key={label}
                className="py-6 lg:py-7 lg:px-7 lg:first:pl-0 border-b sm:border-b-0 border-line lg:border-l lg:first:border-l-0"
              >
                <div className="flex items-center gap-2 text-label text-accent mb-3">
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  {label}
                </div>
                <p className="text-sm text-muted leading-relaxed max-w-[28ch]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </ParallaxScope>
    </section>
  );
}
