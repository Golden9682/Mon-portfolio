import React from "react";
import { Terminal } from "lucide-react";

const links = [
  { name: "Accueil", href: "#hero" },
  { name: "Projets", href: "#projets" },
  { name: "Compétences", href: "#competences" },
  { name: "Parcours", href: "#parcours" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="frame flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent flex items-center justify-center text-on-accent shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-ink block">Kokou Komna Abdoul Raouf</span>
            <p className="text-xs text-faint">Digital Developer &amp; Automation Specialist · Lomé, Togo</p>
          </div>
        </div>

        <nav aria-label="Liens rapides" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-label text-muted hover:text-ink transition-colors py-2">
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <span className="text-xs text-faint">© {new Date().getFullYear()} Kokou Komna Abdoul Raouf</span>
          <a href="#hero" className="text-label text-muted hover:text-accent transition-colors py-2">
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
