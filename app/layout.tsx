import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/ui/motion";
import "./globals.css";

// Self-hosted via next/font: no external request, no layout shift.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
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
  themeColor: "#090d16",
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
    <html lang="fr" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
