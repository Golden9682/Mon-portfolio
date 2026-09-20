export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "mobile" | "backend" | "automation" | "web" | "all";
  tag: string;
  featured: boolean;
  period: string;
  description: string;
  longDescription: string;
  metrics?: { label: string; value: string }[];
  highlights: string[];
  techStack: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
    docs?: string;
  };
  gradient: string;
  accentColor: string;
  iconName: string;
  logoUrl?: string;
  previewImage?: string;
}

export const projectsData: Project[] = [
  {
    id: "nunya",
    title: "NUNYA",
    subtitle: "Application Mobile EdTech Gamifiée & Offline-First",
    category: "mobile",
    tag: "Projet Phare · EdTech & Fintech",
    featured: true,
    period: "2024 – Présent",
    logoUrl: "/images/projects/nunya-logo.png",
    previewImage: "/images/projects/nunya-badge.png",
    description: "Application mobile gamifiée pour les élèves togolais préparant le BEPC, BAC 1 et BAC 2 avec annales officielles, classements mensuels et paiements Mobile Money.",
    longDescription: "NUNYA a été conçu pour résoudre le défi d'accès aux ressources éducatives de qualité au Togo. L'application intègre un mode 100% hors-ligne indispensable pour les zones à faible connectivité, un système de récompenses financières mensuelles pour stimuler les meilleurs élèves, et une sécurité renforcée contre la triche.",
    metrics: [
      { label: "Connectivité", value: "100% Offline-Ready" },
      { label: "Paiements", value: "FedaPay (T-Money / Flooz)" },
      { label: "Backend", value: "Node.js 22 + PostgreSQL" },
      { label: "Monitoring", value: "Sentry + E2E Tests" }
    ],
    highlights: [
      "Conception complète de l'application mobile en React Native / Expo (SDK 57) avec Zustand et React Navigation.",
      "Intégration des paiements Mobile Money (FedaPay — T-Money / Flooz) via webhooks sécurisés et signés pour débloquer le Pass Annuel et distribuer des gains.",
      "Mécanismes anti-triche côté serveur : plafonnement journalier d'XP, validation d'XP par le serveur, réinitialisation mensuelle sécurisée du classement.",
      "Fonctionnement hors-ligne complet avec synchronisation des scores en arrière-plan.",
      "Déploiement Docker sur Railway avec migrations SQL automatisées et tests de bout en bout avec Playwright."
    ],
    techStack: [
      "React Native",
      "Expo SDK 57",
      "Node.js",
      "Express",
      "PostgreSQL",
      "FedaPay (T-Money / Flooz)",
      "Docker",
      "Railway",
      "Sentry",
      "Playwright",
      "Zustand"
    ],
    links: {
      github: "https://github.com",
    },
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10b981",
    iconName: "Smartphone"
  },
  {
    id: "rapido",
    title: "XRAPIDO",
    subtitle: "Plateforme Multi-Service de Commande & Livraison Rapide",
    category: "mobile",
    tag: "Full-Stack & Logistique",
    featured: true,
    period: "2024",
    logoUrl: "/images/projects/rapido-logo.png",
    previewImage: "/images/projects/rapido-scooter.png",
    description: "Écosystème complet de commande et livraison comprenant une application mobile pour les utilisateurs, un tableau de bord administrateur et un backend haute performance.",
    longDescription: "Architecture complète à 4 volets conçue pour gérer le cycle de vie complet d'une commande : catalogue en ligne, prise de commande client, assignation aux livreurs et supervision administrative en temps réel.",
    metrics: [
      { label: "Architecture", value: "4 Modules complets" },
      { label: "Temps réel", value: "Gestion des flux de livraison" },
      { label: "Backend", value: "API REST sécurisée" }
    ],
    highlights: [
      "Application mobile utilisateur fluide pour la navigation dans les catalogues et le passage de commande.",
      "Panneau d'administration web dédié à la gestion des commandes, des livreurs et des statistiques.",
      "Backend REST centralisé pour la synchronisation en direct des statuts de livraison.",
      "Frontend web moderne et responsive pour les commandes en ligne directes."
    ],
    techStack: [
      "React Native",
      "React.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Tailwind CSS",
      "REST API"
    ],
    links: {},
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    accentColor: "#06b6d4",
    iconName: "Truck"
  },
  {
    id: "assistant-dg",
    title: "Assistant DG",
    subtitle: "Suite d'Automatisation & Productivité de Direction",
    category: "automation",
    tag: "Productivité & IA Entreprise",
    featured: true,
    period: "2024",
    logoUrl: "/images/projects/assistant-dg-icon.png",
    previewImage: "/images/projects/assistant-dg-icon.png",
    description: "Solution intelligente d'assistance à la Direction Générale : transcription audio, génération & lecture PDF/Excel, planificateur de rappels et génération automatique de rapports.",
    longDescription: "Un outil sur-mesure créé pour décharger les dirigeants de tâches chronophages. Il permet de dicter des notes (transcription vocale), d'extraire automatiquement des données de documents PDF et Excel, et de générer des synthèses d'activité complètes et des alertes par e-mail en un clic.",
    metrics: [
      { label: "Automatisation", value: "100% Autonome" },
      { label: "Documents", value: "PDF & Excel dynamiques" },
      { label: "Planification", value: "Scheduler de tâches" },
      { label: "Interface", value: "Web Python & Flask" }
    ],
    highlights: [
      "Moteur de transcription audio pour la synthèse rapide de réunions et mémos vocaux.",
      "Scripts automatisés de génération et lecture de documents administratifs (PDF, feuilles Excel structurées).",
      "Ordonnanceur de rappels (Scheduler) et envoi automatisé d'e-mails de suivi.",
      "Tableau de bord web interactif pour la gestion et le suivi des activités de direction."
    ],
    techStack: [
      "Python",
      "Flask",
      "Audio Transcription",
      "PDF Generation / Parser",
      "Excel Automation",
      "Task Scheduler",
      "Email Automation"
    ],
    links: {},
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    accentColor: "#6366f1",
    iconName: "Briefcase"
  },
  {
    id: "bots-automation",
    title: "Scrapers & Bots IA (N8N & Telegram)",
    subtitle: "Pipelines de Veille & Automatisation pour ONG et Entreprises",
    category: "automation",
    tag: "Automatisation & IA",
    featured: true,
    period: "2023 – Présent",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Système autonome de scraping d'appels à projets et de financements du web, extraction des données clés et livraison quotidienne résumée via Telegram et Email.",
    longDescription: "Développement d'un pipeline de données pour une organisation non gouvernementale : le bot scrape quotidiennement de multiples plateformes d'appels d'offres et opportunités de subventions, en extrait les critères d'éligibilité, dates limites et budgets avec un moteur d'IA, et génère des synthèses prêtes à l'action.",
    metrics: [
      { label: "Fréquence", value: "Veille 24/7" },
      { label: "Canaux", value: "Telegram & Email" },
      { label: "Moteur", value: "IA + N8N Workflows" }
    ],
    highlights: [
      "Scraping automatique de sites web et portails d'opportunités avec gestion de la pagination et des filtres.",
      "Extraction assistée par IA pour synthétiser le titre, la date limite et le budget éligible.",
      "Livraison automatisée de résumés quotidiens dans des groupes Telegram dédiés et par mailing list.",
      "Mise en place de workflows N8N modulaires et réutilisables."
    ],
    techStack: [
      "Python",
      "Telegram Bot API",
      "N8N",
      "Web Scraping (BeautifulSoup/Selenium)",
      "OpenAI / AI Engine",
      "Email Automation"
    ],
    links: {},
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    accentColor: "#f59e0b",
    iconName: "Bot"
  },
  {
    id: "food-et-cie",
    title: "Food et Cie",
    subtitle: "Plateforme Web Interactive pour Service Traiteur",
    category: "web",
    tag: "Web App & Production",
    featured: false,
    period: "2023",
    previewImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    description: "Site vitrine et système de commande interactif pour un service traiteur, incluant un menu dynamique multi-cuisines, une galerie et la prise de contact instantanée.",
    longDescription: "Création d'une identité de marque digitale avec une interface accueillante, rapide et entièrement optimisée pour mobile et desktop, déployée en production sur Netlify.",
    highlights: [
      "Menu interactif avec filtrage par type de cuisine et gestion des commandes.",
      "Design épuré, responsive et optimisé pour le référencement local.",
      "Déploiement continu automatisé sur Netlify."
    ],
    techStack: [
      "HTML5 / Modern JS",
      "Tailwind CSS",
      "Netlify CI/CD",
      "Interactive Menu UI"
    ],
    links: {
      live: "https://food-et-cie.netlify.app",
    },
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
    accentColor: "#f97316",
    iconName: "Utensils"
  },
  {
    id: "zombie-shock",
    title: "Zombie Shock & Game Lab",
    subtitle: "Développement de Jeu Vidéo & Création Graphique",
    category: "mobile",
    tag: "Mobile Game & Assets",
    featured: false,
    period: "2023",
    previewImage: "/images/projects/zombie-shock-preview.png",
    description: "Conception d'assets 2D, sprites, interfaces dynamiques et mécaniques de gameplay pour jeux vidéo et divertissement mobile.",
    longDescription: "Projet d'exploration et de création dans le domaine du gaming mobile : design des personnages, environnement interactif, intégration d'effets visuels et optimisation des performances sur smartphone.",
    highlights: [
      "Création complète d'assets graphiques, personnages et décors de jeu.",
      "Développement de mécaniques de jeu interactives et réactives.",
      "Gestion de la physique 2D, des collisions et de l'audio."
    ],
    techStack: [
      "Game Engine / 2D",
      "JavaScript / TypeScript",
      "Sprite Design",
      "Mobile Performance"
    ],
    links: {},
    gradient: "from-rose-500/20 via-red-500/10 to-transparent",
    accentColor: "#f43f5e",
    iconName: "Smartphone"
  }
];
