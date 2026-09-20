"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  User,
  AtSign,
  Tag,
  MessageSquareText,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { m, Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const emailAddress = "kokouabdoulraouf@gmail.com";
  const whatsappNumber = "22896827078";
  const phoneFormatted = "+228 96 82 70 78 / 72 09 81 45";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable: nothing to do */
    }
  };

  const fireConfetti = async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Loaded on demand so it never weighs on the initial bundle.
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#6366f1", "#22d3ee", "#34d399", "#fbbf24"],
      disableForReducedMotion: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formData.subject || "Prise de contact depuis le portfolio"
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setFormSubmitted(true);
    void fireConfetti();
  };

  const update = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div aria-hidden className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          accent="indigo"
          icon={<Sparkles className="w-3.5 h-3.5" />}
          eyebrow="Collaboration & Opportunités"
          title="Prêt à Réaliser Votre Prochain Projet ?"
          description="Disponible pour des missions freelance, du développement mobile/web sur-mesure ou une opportunité à plein temps."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Direct Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <Reveal direction="right">
              <SpotlightCard accent="indigo" className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Email Direct</h3>
                      <p className="text-sm sm:text-base font-medium text-white truncate">{emailAddress}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="relative p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Copier l'email"
                    aria-label="Copier l'adresse email"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <m.span
                        key={copied ? "check" : "copy"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="block"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </m.span>
                    </AnimatePresence>
                  </button>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* WhatsApp Card */}
            <Reveal direction="right" delay={0.08}>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl group"
              >
                <SpotlightCard accent="emerald" className="p-5 sm:p-6 space-y-3 border-emerald-500/20">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6 shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.15em]">WhatsApp Direct</h3>
                        <p className="text-sm sm:text-base font-medium text-white">{phoneFormatted}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 pl-[3.25rem]">
                    Discutez instantanément de votre besoin ou posez une question rapide.
                  </p>
                </SpotlightCard>
              </a>
            </Reveal>

            {/* Location & Availability */}
            <Reveal direction="right" delay={0.16}>
              <SpotlightCard accent="cyan" className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Localisation &amp; Fuseau</h3>
                    <p className="text-sm sm:text-base font-medium text-white">Lomé, Togo (GMT / UTC+0)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 pl-[3.25rem]">
                  Ouvert au travail 100% à distance (Remote international) et déplacements ponctuels.
                </p>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-7">
            <SpotlightCard accent="indigo" hover={false} className="p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {formSubmitted ? (
                  <m.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="py-12 text-center space-y-4"
                  >
                    <m.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </m.div>
                    <h3 className="text-xl font-bold text-white">Message préparé avec succès !</h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto text-pretty">
                      Votre client de messagerie s&apos;est ouvert pour l&apos;envoi. Vous pouvez également me joindre directement sur WhatsApp.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4 pt-2 font-medium"
                    >
                      Envoyer un autre message
                    </button>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Envoyez-moi un message</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Votre Nom" icon={<User className="w-4 h-4" />}>
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Ex. Jean Dupont"
                          value={formData.name}
                          onChange={update("name")}
                          className="field"
                        />
                      </Field>

                      <Field label="Votre Email" icon={<AtSign className="w-4 h-4" />}>
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jean@example.com"
                          value={formData.email}
                          onChange={update("email")}
                          className="field"
                        />
                      </Field>
                    </div>

                    <Field label="Sujet / Type de projet" icon={<Tag className="w-4 h-4" />}>
                      <input
                        type="text"
                        required
                        placeholder="Ex. Application Mobile, Automatisation de processus, Consultation..."
                        value={formData.subject}
                        onChange={update("subject")}
                        className="field"
                      />
                    </Field>

                    <Field label="Détails de votre demande" icon={<MessageSquareText className="w-4 h-4" />} textarea>
                      <textarea
                        rows={5}
                        required
                        placeholder="Décrivez brièvement vos objectifs, délais ou technologies souhaitées..."
                        value={formData.message}
                        onChange={update("message")}
                        className="field resize-none"
                      />
                    </Field>

                    <button type="submit" className="btn btn-primary w-full px-6 py-3.5 text-sm group mt-2">
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Envoyer le message
                    </button>
                  </m.form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
  textarea = false,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  textarea?: boolean;
}) {
  return (
    <label className="block group/field">
      <span className="block text-xs font-semibold text-slate-300 mb-1.5">{label}</span>
      <span className="relative block">
        <span
          className={`absolute left-3.5 text-slate-500 transition-colors group-focus-within/field:text-indigo-400 pointer-events-none ${
            textarea ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}
