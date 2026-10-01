"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, useScroll, useSpring } from "framer-motion";
import { m } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "Projets", href: "#projets" },
  { name: "Compétences", href: "#competences" },
  { name: "Parcours", href: "#parcours" },
  { name: "À propos", href: "#a-propos" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    // L'observateur sert de déclencheur ; la section active est relue à chaque
    // fois (celle qui passe sous la ligne de lecture, à 45 % de la hauteur).
    // Se fier aux seules entrées reçues laissait un mauvais lien actif après
    // un saut de défilement (lien d'ancre, touche Début).
    const pick = () => {
      const y = window.innerHeight * 0.45;
      // Sections hors menu (Services, la respiration) : on garde la dernière
      // section du menu commencée au-dessus de la ligne.
      const above = sections.filter((s) => s.getBoundingClientRect().top <= y);
      const hit = above[above.length - 1] ?? sections[0];
      if (hit) setActive(`#${hit.id}`);
    };
    const observer = new IntersectionObserver(pick, {
      rootMargin: "-40% 0px -50% 0px",
      threshold: [0, 0.2, 0.5],
    });

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        // Pas de transition sur le fond : il suit déjà les couleurs du thème, qui
        // s'animent seules. Une seconde transition le mettait en retard sur le texte.
        "fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ease-out-expo",
        scrolled || mobileMenuOpen
          ? "bg-bg border-b border-line py-3"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      {/* Scroll progress */}
      <m.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-accent"
      />

      <div className="frame flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-ink font-bold tracking-tight text-lg group"
          aria-label="Retour à l'accueil"
        >
          <div className="relative w-9 h-9 bg-accent flex items-center justify-center text-on-accent transition-colors duration-300 group-hover:bg-ink">
            <Terminal className="w-[18px] h-[18px]" />
                      </div>
          <span className="font-mono text-sm sm:text-base">
            Kokou<span className="text-accent">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-label px-4 py-2 transition-colors duration-300",
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {isActive && (
                  <m.span
                    layoutId="nav-pill"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3 ml-auto mr-3 lg:ml-0 lg:mr-0">
          {/* Un seul bouton plein à l'écran : le hero et le formulaire de contact ont déjà le leur. */}
          <a
            href="#contact"
            className={cn(
              "btn !min-h-0 py-2.5",
              active === "#hero" || active === "#contact" ? "btn-secondary" : "btn-primary"
            )}
          >
            Écris-moi
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="lg:hidden relative p-2 bg-surface border border-line text-muted hover:text-ink transition-colors"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
        >
          <AnimatePresence initial={false} mode="wait">
            <m.span
              key={mobileMenuOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-ink" />}
            </m.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-1 border-t border-line mt-3">
              {navLinks.map((link, i) => (
                <m.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className={cn(
                    "flex items-center justify-between text-base font-medium px-3 py-3 transition-colors",
                    active === link.href
                      ? "text-ink bg-surface-raise"
                      : "text-muted hover:text-ink hover:bg-surface"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "w-1.5 h-1.5 transition-colors",
                      active === link.href ? "bg-accent" : "bg-transparent"
                    )}
                  />
                </m.a>
              ))}
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="pt-3"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Écris-moi
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
