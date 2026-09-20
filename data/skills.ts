export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    description?: string;
    highlight?: boolean;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "mobile",
    title: "Développement Mobile",
    icon: "Smartphone",
    color: "emerald",
    description: "Création d'applications mobiles cross-platform performantes et adaptées aux environnements à faible connectivité.",
    skills: [
      { name: "React Native", highlight: true },
      { name: "Expo (SDK 57)", highlight: true },
      { name: "React Navigation" },
      { name: "Zustand (State Management)" },
      { name: "Offline-First Architecture", highlight: true },
      { name: "Push Notifications" },
      { name: "SQLite / Local Storage" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Base de Données",
    icon: "Server",
    color: "indigo",
    description: "Conception d'APIs REST robustes, sécurisées et prêtes pour la mise en production.",
    skills: [
      { name: "Node.js (v20+ / v22)", highlight: true },
      { name: "Express.js", highlight: true },
      { name: "PostgreSQL", highlight: true },
      { name: "Python / Flask" },
      { name: "Authentification JWT & Bcrypt", highlight: true },
      { name: "REST APIs Design" },
      { name: "Rate Limiting & Helmet Security" }
    ]
  },
  {
    id: "automation",
    title: "Automatisation, Scraping & IA",
    icon: "Cpu",
    color: "amber",
    description: "Gain de temps et automatisation de flux de travail complexes pour les entreprises et les ONG.",
    skills: [
      { name: "Telegram Bots", highlight: true },
      { name: "N8N Workflows", highlight: true },
      { name: "Web Scraping (Python / Cheerio)", highlight: true },
      { name: "Pipelines de Données" },
      { name: "Automatisation d'Emails & Rapports" },
      { name: "Intégration d'APIs d'IA" }
    ]
  },
  {
    id: "fintech",
    title: "Fintech & Mobile Money",
    icon: "CreditCard",
    color: "cyan",
    description: "Intégration des moyens de paiement locaux africains et gestion des flux financiers.",
    skills: [
      { name: "FedaPay Integration", highlight: true },
      { name: "T-Money (Togo)", highlight: true },
      { name: "Flooz (Moov Togo)", highlight: true },
      { name: "Webhooks Sécurisés & Signés", highlight: true },
      { name: "Anti-Fraud & Ledger Logic" }
    ]
  },
  {
    id: "devops",
    title: "DevOps, Tests & Outils",
    icon: "Wrench",
    color: "violet",
    description: "Déploiement continu, tests automatisés et monitoring en temps réel.",
    skills: [
      { name: "Docker", highlight: true },
      { name: "Railway & Netlify", highlight: true },
      { name: "Playwright (Tests E2E)", highlight: true },
      { name: "Sentry Monitoring" },
      { name: "Git & GitHub Actions" },
      { name: "Migrations SQL" }
    ]
  },
  {
    id: "communication",
    title: "Communication & Gestion",
    icon: "MessageSquare",
    color: "rose",
    description: "Double compétence unique associant vision technique et stratégie de communication.",
    skills: [
      { name: "Licence Communication des Organisations", highlight: true },
      { name: "Gestion de Projet Agile" },
      { name: "Rédaction Stratégique & Storytelling" },
      { name: "Relation Client & Consulting" },
      { name: "Français (Natif) · Anglais (B2) · Allemand" }
    ]
  }
];
