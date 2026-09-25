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
  /** Kept for backwards compatibility: first screenshot. */
  previewImage?: string;
  previewLayout?: "mobile" | "desktop";
  /** Ordered screenshots shown in the hover preview and the modal gallery. */
  screenshots?: string[];
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
    previewImage: "/images/projects/nunya-mobile-real.png",
    previewLayout: "mobile",
    screenshots: [
      "/images/projects/nunya-mobile-real.png",
      "/images/projects/nunya-quiz.png",
      "/images/projects/nunya-premium.png",
    ],
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
    title: "XRapido",
    subtitle: "Plateforme de Mobilité, Transport & Livraison au Togo (XRapido S.A.R.L.U.)",
    category: "mobile",
    tag: "Client Réel · Production en Ligne",
    featured: true,
    period: "2024 – En Ligne",
    logoUrl: "/images/projects/rapido-logo.png",
    previewImage: "/images/projects/rapido-mobile-real.png",
    previewLayout: "mobile",
    description: "Conception, développement et mise en ligne de la plateforme officielle et de l'écosystème de transport & livraison pour XRAPIDO S.A.R.L.U. au Togo (mise en relation client-chauffeur, estimation P2P et paiements locaux).",
    longDescription: "XRapido est une solution complète de mobilité et logistique développée pour le marché togolais. La plateforme comprend le site officiel en production (xrapidoexpress.com), une application mobile client pour commander courses et livraisons (moto, tricycle, voiture) avec négociation tarifaire P2P en temps réel, une application chauffeur avec suivi GPS et encaissement sécurisé, et un back-office d'administration avec contrôle KYC.",
    metrics: [
      { label: "Site en Direct", value: "xrapidoexpress.com" },
      { label: "Paiements", value: "FedaPay (YAS & Flooz USSD)" },
      { label: "Sécurité", value: "Vérification KYC & Suivi GPS" },
      { label: "Écosystème", value: "3 Volets (Client, Chauffeur, Admin)" }
    ],
    highlights: [
      "Création, intégration et mise en ligne du site officiel et de la plateforme https://www.xrapidoexpress.com/ pour XRAPIDO S.A.R.L.U.",
      "Écosystème unifié pour le transport de personnes et la livraison de colis (motos, tricycles et voitures) au Togo.",
      "Système de négociation tarifaire P2P en temps réel entre clients et prestataires avec calcul de commission automatique (10%).",
      "Intégration des paiements mobiles locaux sécurisés via la passerelle FedaPay (YAS / T-Money et Moov Flooz en USSD) et gestion des retraits de gains.",
      "Module de sécurité avancé : vérification d'identité KYC par caméra avant validation de profil, suivi d'itinéraire GPS en direct et bouton d'alerte d'urgence.",
      "Back-office d'administration pour la validation pièce par pièce des dossiers prestataires, la gestion des demandes de retrait et le suivi comptable."
    ],
    techStack: [
      "React Native",
      "Expo",
      "React.js / Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "FedaPay (YAS / Flooz)",
      "GPS & Mapping",
      "Tailwind CSS",
      "REST API"
    ],
    links: {
      live: "https://www.xrapidoexpress.com/",
    },
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
    previewImage: "/images/projects/assistant-dg-dashboard.jpg",
    previewLayout: "desktop",
    screenshots: [
      "/images/projects/assistant-dg-dashboard.jpg",
      "/images/projects/assistant-dg-chat.jpg",
      "/images/projects/assistant-dg-tasks.jpg",
    ],
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
    previewImage: "/images/projects/bots-telegram-wide.jpg",
    previewLayout: "desktop",
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
    previewImage: "/images/projects/food-et-cie-home.jpg",
    previewLayout: "desktop",
    screenshots: ["/images/projects/food-et-cie-home.jpg"],
    description: "Site vitrine et système de commande interactif pour un service traiteur d'exception, incluant un menu dynamique multi-cuisines (Européenne, Africaine & Asiatique) et commande en ligne.",
    longDescription: "Conception complète de l'application web pour Food et Cie : identité de marque élégante, présentation des menus traiteur d'exception, système de commande en ligne et réservation événementielle déployé en production sur Netlify.",
    highlights: [
      "Menu interactif avec filtrage par type de cuisine (Européenne, Africaine, Asiatique) et panier de commande.",
      "Design haut de gamme épuré, responsive et optimisé pour le référencement local.",
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
  }
];
