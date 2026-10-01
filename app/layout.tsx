import type { Metadata, Viewport } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/ui/motion";
import "./globals.css";

/* Trois voix — voir docs/specs/refonte-motion-craft.md §2.1 */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const text = Archivo({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

/* Voix d'accent — italique, 2 à 4 usages sur tout le site (MOTION-CRAFT §3.3).
   Zodiak (Fontshare, licence ITF FFL), hébergée localement : pas de requête tierce. */
const accent = localFont({
  src: "./fonts/zodiak-701.woff2",
  weight: "700",
  style: "italic",
  variable: "--font-accent",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://funny-cobbler-414dbe.netlify.app"),
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

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-theme="atelier"
      className={`${display.variable} ${text.variable} ${mono.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Filet de sécurité du contenu animé (MOTION-CRAFT §5 : le motion est une
          couche, pas le support). `data-js` active les états initiaux d'animation.
          Si l'app ne s'est pas hydratée en 1,5 s — JS désactivé, lent ou en
          erreur, cas courant en 3G sur Android d'entrée de gamme — on retire
          `data-js` et globals.css affiche tout dans son état final.
          Des attributs data-* et non `className` : React gère `className` sur
          <html> et l'écrase au rendu (avertissement d'hydratation, classe perdue).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d){d.setAttribute('data-js','');setTimeout(function(){if(!d.hasAttribute('data-motion-ready'))d.removeAttribute('data-js')},1500)})(document.documentElement)`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
