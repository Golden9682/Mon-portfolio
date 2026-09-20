"use client";

import React from "react";
import { Terminal, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#070a12] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-white">
              Kokou Komna Abdoul Raouf
            </span>
            <p className="text-xs text-slate-500">
              Digital Developer &amp; Automation Specialist · Lomé, Togo
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#hero" className="hover:text-white transition-colors">Accueil</a>
          <a href="#projets" className="hover:text-white transition-colors">Projets</a>
          <a href="#competences" className="hover:text-white transition-colors">Compétences</a>
          <a href="#parcours" className="hover:text-white transition-colors">Parcours</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()} Tous droits réservés.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
