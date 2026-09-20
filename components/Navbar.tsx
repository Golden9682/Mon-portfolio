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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] }
    );

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
        "fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-500 ease-out-expo",
        scrolled || mobileMenuOpen
          ? "bg-[#090d16]/80 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      {/* Scroll progress */}
      <m.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-white font-bold tracking-tight text-lg group"
          aria-label="Retour à l'accueil"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 transition-transform duration-500 ease-out-expo group-hover:scale-105 group-hover:rotate-[-6deg]">
            <Terminal className="w-[18px] h-[18px]" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </div>
          <span className="font-mono text-sm sm:text-base">
            Kokou<span className="text-indigo-400">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] rounded-full p-1 backdrop-blur-md"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-300",
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {isActive && (
                  <m.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#contact" className="btn btn-primary text-xs px-4 py-2 rounded-lg group">
            Me contacter
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden relative p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
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
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-1 border-t border-white/[0.06] mt-3">
              {navLinks.map((link, i) => (
                <m.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className={cn(
                    "flex items-center justify-between text-base font-medium px-3 py-3 rounded-xl transition-colors",
                    active === link.href
                      ? "text-white bg-white/[0.06]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      active === link.href ? "bg-indigo-400" : "bg-transparent"
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
                  className="btn btn-primary w-full text-sm px-4 py-3"
                >
                  Me contacter
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
