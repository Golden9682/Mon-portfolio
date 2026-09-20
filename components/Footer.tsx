"use client";

import React from "react";
import { Terminal, ArrowUp } from "lucide-react";

const links = [
  { name: "Accueil", href: "#hero" },
  { name: "Projets", href: "#projets" },
  { name: "Compétences", href: "#competences" },
  { name: "Parcours", href: "#parcours" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#070a12] py-12 overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-white block">Kokou Komna Abdoul Raouf</span>
            <p className="text-xs text-slate-500">
              Digital Developer &amp; Automation Specialist · Lomé, Togo
            </p>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Liens rapides" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative hover:text-white transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-indigo-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.name}
            </a>
          ))}
        </nav>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">© {new Date().getFullYear()} Tous droits réservés.</span>
          <button
            onClick={scrollToTop}
            className="group p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
