import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kokou Komna Abdoul Raouf | Digital Developer & Automation Specialist",
  description: "Portfolio de Kokou Komna Abdoul Raouf — Développeur Full-Stack, Mobile (React Native) et Spécialiste de l'Automatisation & Fintech (FedaPay, Mobile Money) basé à Lomé, Togo.",
  keywords: [
    "Kokou Komna Abdoul Raouf",
    "Développeur Full-Stack Togo",
    "React Native Togo",
    "Automatisation n8n",
    "Telegram Bot",
    "FedaPay Integration",
    "Nunya App",
    "Lomé Togo",
    "EdTech Africa"
  ],
  authors: [{ name: "Kokou Komna Abdoul Raouf" }],
  openGraph: {
    title: "Kokou Komna Abdoul Raouf | Digital Developer & Automation Specialist",
    description: "Concepteur de produits numériques de bout en bout : applications mobiles offline-first, intégrations Mobile Money et automatisations intelligentes.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
