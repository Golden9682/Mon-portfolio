"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { m, Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

/*
 * Contact (sortie du scroll). Les moyens directs à gauche en lignes de
 * données, le formulaire à droite. Le formulaire prépare un e-mail dans la
 * messagerie du visiteur (mailto) : l'état de succès le dit tel quel.
 */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const emailAddress = "kokouabdoulraouf@gmail.com";
const whatsappNumber = "22896827078";
const phoneFormatted = "+228 96 82 70 78 / 72 09 81 45";

export function Contact() {
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopy("done");
    } catch {
      setCopy("failed");
    }
    setTimeout(() => setCopy("idle"), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formData.subject || "Prise de contact depuis le portfolio"
    )}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.open(mailtoUrl, "_blank");
    setFormSubmitted(true);
  };

  const update = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  return (
    <section id="contact" data-theme-section="nuit" className="relative py-24 md:py-32">
      <div className="frame">
        <SectionHeader
          eyebrow="Collaboration & opportunités"
          title="Dis-moi ce qu'il te faut."
          description="Disponible pour des missions freelance, du développement mobile ou web, ou un poste à plein temps."
          indent={3}
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16 items-start">
          {/* Moyens directs */}
          <Reveal className="lg:col-span-4">
            <dl className="border-t border-line">
              <div className="py-5 border-b border-line">
                <dt className="text-label text-faint mb-2">E-mail</dt>
                <dd className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a href={`mailto:${emailAddress}`} className="text-ink hover:text-accent transition-colors break-all">
                    {emailAddress}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-label text-muted hover:text-accent transition-colors min-h-[44px]"
                    aria-live="polite"
                  >
                    {copy === "done" ? "Copié" : copy === "failed" ? "Copie impossible" : "Copier"}
                  </button>
                </dd>
              </div>
              <div className="py-5 border-b border-line">
                <dt className="text-label text-faint mb-2">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent transition-colors"
                  >
                    {phoneFormatted} ↗
                  </a>
                  <p className="text-sm text-muted mt-1">Pour une question rapide.</p>
                </dd>
              </div>
              <div className="py-5 border-b border-line">
                <dt className="text-label text-faint mb-2">Lieu & fuseau</dt>
                <dd>
                  <span className="text-ink">Lomé, Togo · GMT / UTC+0</span>
                  <p className="text-sm text-muted mt-1">
                    Ouvert au travail 100 % à distance et aux déplacements ponctuels.
                  </p>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Formulaire */}
          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            <AnimatePresence mode="wait" initial={false}>
              {formSubmitted ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="border-t border-accent py-10"
                  role="status"
                >
                  <p className="font-display uppercase text-ink text-4xl sm:text-5xl leading-none">C&apos;est parti.</p>
                  <p className="text-muted mt-5 max-w-md text-pretty">
                    Ta messagerie s&apos;est ouverte avec le message prêt : il ne reste qu&apos;à l&apos;envoyer. Je
                    réponds sous 24 h. Rien ne s&apos;est ouvert ? Écris directement à{" "}
                    <a href={`mailto:${emailAddress}`} className="text-ink underline underline-offset-4">
                      {emailAddress}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-label text-muted hover:text-accent transition-colors mt-8 min-h-[44px]"
                  >
                    Écrire un autre message
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
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Ton nom">
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={update("name")}
                        className="field"
                      />
                    </Field>
                    <Field label="Ton e-mail">
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={update("email")}
                        className="field"
                      />
                    </Field>
                  </div>

                  <Field label="Le sujet">
                    <input
                      type="text"
                      required
                      placeholder="Application mobile, automatisation, conseil…"
                      value={formData.subject}
                      onChange={update("subject")}
                      className="field"
                    />
                  </Field>

                  <Field label="Ce qu'il te faut">
                    <textarea
                      rows={6}
                      required
                      placeholder="Objectifs, délais, technologies souhaitées…"
                      value={formData.message}
                      onChange={update("message")}
                      className="field resize-y"
                    />
                  </Field>

                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Envoie-moi ça
                  </button>
                </m.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-label text-muted mb-2">{label}</span>
      {children}
    </label>
  );
}
