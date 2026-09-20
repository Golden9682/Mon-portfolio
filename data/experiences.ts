export interface ExperienceItem {
  id: string;
  type: "work" | "education";
  title: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  badges: string[];
  bulletPoints: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "nunya-founder",
    type: "work",
    title: "NUNYA — Fondateur & Développeur Full-Stack",
    role: "Lead Developer & Product Owner",
    organization: "NUNYA (Projet Personnel & Startup EdTech)",
    location: "Lomé, Togo",
    period: "2024 – Présent",
    description: "Conception et développement de bout en bout d'une application mobile gamifiée pour la réussite scolaire au Togo.",
    badges: ["React Native", "Node.js 22", "PostgreSQL", "FedaPay", "Docker", "Sentry"],
    bulletPoints: [
      "Conception complète de l'application mobile (React Native / Expo) avec programmes officiels et annales pour BEPC, BAC 1 et BAC 2.",
      "Développement de l'API REST avec Node.js 22, Express, PostgreSQL, authentification JWT et durcissement de sécurité (Helmet, bcrypt, rate-limiting).",
      "Intégration des paiements Mobile Money (FedaPay — T-Money / Flooz) via webhooks signés.",
      "Mécanismes anti-triche côté serveur (cap journalier, XP validé serveur, reset de classement sécurisé).",
      "Mode 100% hors-ligne pensé pour les contraintes de connectivité locales en Afrique de l'Ouest.",
      "Déploiement Docker sur Railway, migrations SQL automatisées et tests E2E avec Playwright."
    ]
  },
  {
    id: "freelance-dev",
    type: "work",
    title: "Développeur Freelance & Spécialiste Automatisation",
    role: "Freelance & Consultant Indépendant",
    organization: "Clients Internationaux & PME / ONG",
    location: "Remote",
    period: "2022 – Présent",
    description: "Développement d'applications web/mobile et automatisation des processus métier pour des entreprises et des ONG.",
    badges: ["Automation", "Telegram Bots", "Web Scraping", "N8N", "Next.js / Web"],
    bulletPoints: [
      "Création de sites web et applications sur-mesure (ex. Food et Cie — plateforme traiteur avec menu interactif et commande en ligne).",
      "Développement d'un bot Telegram de scraping d'appels à projets et opportunités de subventions pour une ONG, avec extraction IA et résumés quotidiens.",
      "Automatisation de pipelines de données d'entreprises, systèmes de notification instantanée et flux d'e-mails.",
      "Conseil digital et automatisation de contenus pour PME et créateurs."
    ]
  },
  {
    id: "esag-nde",
    type: "education",
    title: "Licence en Communication des Organisations",
    role: "Étudiant Diplômé",
    organization: "ESAG-NDE",
    location: "Lomé, Togo",
    period: "2019 – 2025",
    description: "Formation supérieure alliant stratégie de communication, médias numériques, gestion de projet et comportement organisationnel.",
    badges: ["Stratégie Digitale", "Gestion de Projet", "Storytelling", "Négociation"],
    bulletPoints: [
      "Stratégie de communication d'entreprise et gestion de marque.",
      "Médias numériques, transmedia et storytelling de projet.",
      "Gestion de projet et communication interpersonnelle."
    ]
  },
  {
    id: "bac-a4",
    type: "education",
    title: "Baccalauréat — Série A4 (Lettres & Langues Vivantes)",
    role: "Bachelier",
    organization: "Lycée Akparé",
    location: "Lomé, Togo",
    period: "2018 – 2019",
    description: "Formation littéraire approfondie avec maîtrise des langues vivantes et de l'expression écrite/orale.",
    badges: ["Français", "Anglais", "Allemand", "Littérature"],
    bulletPoints: [
      "Maîtrise de l'expression, analyse critique et langues vivantes étrangères."
    ]
  }
];
