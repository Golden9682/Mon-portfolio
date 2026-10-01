# Refonte MOTION-CRAFT — portfolio Kokou Komna Abdoul Raouf

> Spec rédigée avant tout code, conformément à `~/.claude/MOTION-CRAFT.md` §1 et §9.
> Statut : voix validée. Audit passe 2 traité (voir §7). Reste : thèmes au scroll et Lenis (3.6).

## Objectif

Faire passer le portfolio d'un site techniquement propre mais visuellement générique
à un site qui a une voix. Le contenu, la structure de navigation et les captures réelles
ne changent pas. Ce qui change : la typographie, la palette, le rythme et les micro-copies.

Critère de réussite (§0) : un visiteur voit le site et veut savoir qui l'a fait.

---

## 1. La voix — réponses au pré-vol §1

**Direction retenue : « l'ingénieur qui montre ses mains ».**

### 1.1 Trois adjectifs
**Direct · précis · concret.**
On ne promet pas, on montre. Chaque affirmation est adossée à un écran, un chiffre ou un dépôt.

### 1.2 Le mot que cette marque n'utiliserait jamais
**« solution ».**
Avec lui tombent : « innovant », « sur-mesure » employé seul, « accompagner », « propulsé par l'IA ».
Frontière : si une phrase pourrait figurer sur le site de n'importe quelle agence, elle dégage.

### 1.3 Les cinq boutons (écrits avant tout dessin)

| Emplacement | Aujourd'hui | Proposé |
|---|---|---|
| Hero — principal | Découvrir mes projets | **Regarde ce que j'ai construit** |
| Hero — secondaire | Discuter d'un projet | **Dis-moi ce qu'il te faut** |
| Navbar | Me contacter | **Écris-moi** |
| Carte projet | Explorer les détails | **Comment c'est fait** |
| Formulaire | Envoyer le message | **Envoie-moi ça** |

Micro-copies qui suivent (§4 — « un loader qui dit Chargement casse tout ») :
- Modal, lien live : *Ouvre le site* · dépôt : *Regarde le code*
- Succès du formulaire : *C'est parti. Je réponds sous 24 h.*
- État vide d'un filtre projet : *Rien dans cette catégorie. Essaie « Tous ».*
- 404 : *Cette page n'existe pas. Celles qui existent sont là ↓*

### 1.4 L'émotion à la seconde 1
**Solide.**
Pas « waouh », pas « créatif » : la sensation que ce qui est montré tient en production,
sur un réseau qui tombe. C'est le hero qui porte ça : un titre massif, une affirmation,
aucune décoration flottante.

### 1.5 L'histoire que raconte le scroll (4 temps)

1. **L'affirmation** — ce que je construis, en une phrase énorme. Fond atelier, presque noir.
2. **Les contraintes** — réseau instable, Mobile Money, smartphones d'entrée de gamme.
   C'est le cadre de travail réel, pas une liste de services.
3. **La preuve** — les projets, les vraies captures, les chiffres. Section la plus dense.
4. **La personne** — parcours, puis prise de contact. Respiration, puis sortie.

---

## 2. Conséquences directes (§1 « conséquence directe »)

### 2.1 Typographie — 3 voix (+ une mono utilitaire)

| Voix | Police | Usage |
|---|---|---|
| Display | **Anton** | Titre du hero à `clamp(3rem, 12vw, 16rem)`, 16vw sous 640 px. Tenable depuis que le titre fait 5 mots. Titres de section à `clamp(2.25rem, 7vw, 5rem)`. |
| Texte | **Archivo** | Corps, descriptions, formulaire. |
| Accent | **Zodiak** italique 700 (Fontshare, hébergée dans `app/fonts`) | Un seul mot, en orange, 2 à 4 fois sur le site : « *non.* » (hero), « *montre.* » (respiration après Projets). |
| Utilitaire | **JetBrains Mono** | Labels, périodes, numéros, piles techniques. Pas un ornement. |

Décision du 1ᵉʳ octobre (audit passe 2, P3a, validée) : la voix d'accent devient un italique,
comme le demande le §3.3. La mono, qui tenait ce rôle, redevient une voix utilitaire.

Interlignes : hero `0.95` ; titres de section `1.1`, parce qu'en capitales françaises la
cédille d'une ligne touchait l'accent de la suivante. Labels `uppercase`, `0.18em`, 11 px.

### 2.2 Palette — un seul accent

| Rôle | Valeur |
|---|---|
| Accent (unique) | `#E2572B` — orange brique |
| Fond atelier | `#0B0B0C` |
| Texte | `#F2EFE9` |

Les six accents actuels (indigo, cyan, emerald, amber, violet, rose) disparaissent.
Les couleurs Tailwind par défaut (`slate-*`, `indigo-*`) sont remplacées par des tokens.
Contraste à vérifier sur **chaque** thème, pas seulement le thème par défaut.

### 2.3 Trois thèmes qui basculent au scroll (§3.2)

| Thème | Sections | Fond | Texte |
|---|---|---|---|
| `atelier` | Hero, Contraintes | `#0B0B0C` | `#F2EFE9` |
| `papier` | Parcours, À propos | `#EDEAE3` | `#15110E` |
| `nuit` | Projets, Contact | `#060607` | `#F2EFE9` |

Le passage sombre → clair → sombre crée le rythme vertical qui manque aujourd'hui.

### 2.4 Moteurs d'animation (décision validée)
GSAP + Lenis pour le scroll (ScrollTrigger, thèmes, parallaxe) ;
framer-motion conservé pour l'UI (modal, filtres, menu mobile).
Entorse assumée au §2 ; coût ≈ 45 kB de JS, justifié par l'absence de régression sur l'existant.

---

## 3. Découpage (étapes 3 et 4 du §9)

Chaque tâche se termine par : capture 1440 px + 390 px, critique écrite contre la grille §7,
correction, nouvelle capture. Une section à la fois (§6).

- [x] **3.1** Tokens CSS : palette à un accent, 3 thèmes, échelle d'espacement unique
- [x] **3.2** Polices Anton + Archivo via `next/font`, échelle fluide, suppression d'Inter
- [x] **3.3** Grain global + dégradés en radiales multiples (remplace les orbes flous)
- [x] **3.4** **Corriger le `opacity:0` sans JS** — vérifié par capture `--disable-javascript` :
      la page est entièrement lisible sans JS
- [x] **3.5** Hero : titre à 12vw, mise en page asymétrique, nouveaux libellés
- [ ] **3.6** Lenis + bascule de thème au scroll
- [x] **3.7** Retrait des anti-patterns : glassmorphism (navbar comprise), halo au curseur,
      titre en dégradé, grille de fond, orbes (hero, Contact, Footer), pilules, ✨ Sparkles,
      flèches animées, cartes égales, confettis
- [ ] **4.1** Révélations de texte masquées (SplitText), ease `power4.out`
- [ ] **4.2** Parallaxe à 3 plans de profondeur sur Hero et Projets
- [ ] **4.3** Micro-copies et états (vide, erreur, succès, 404)

Hors périmètre pour l'instant : étapes 5 (souris), 6 (shaders WebGL), 7 (transitions de page).

---

## 4. Sécurité et conformité

Aucune donnée, aucun secret, aucune route serveur touchée : refonte purement front.
Les règles du CLAUDE.md global restent prioritaires sur ce document.
Aucun contenu inventé : les témoignages, chiffres et logos restent absents tant qu'ils ne sont pas réels.

---

## 5. Définition de « terminé »

- La grille §7 passée point par point, captures à l'appui
- Contraste ≥ 4,5:1 vérifié sur les trois thèmes
- Page lisible avec JS désactivé
- Rien ne déborde à 390 px
- `prefers-reduced-motion` testé
- Build de production vert, aucune erreur console

---

## 6. Audit passe 1 — suivi

Ordre imposé : P0 → P1 (arrêt) → P2 → P3 → P4 → passe 2.

- [x] **P0 — hero vide.** Mesuré sur le build de prod, cache vide :
      Android d'entrée de gamme simulé (Fast 3G, CPU ÷4, 390 px) : titre visible à **25,4 s**
      avant correctif, **2,77 s** après. Desktop sans limitation : 3,51 s → **1,62 s**.
      Cause : entrée du hero pilotée par framer-motion, donc dépendante de l'hydratation.
      Correctifs : entrée du hero en CSS pur (composant serveur, `.hero-rise`) ; filet de
      sécurité à 1,5 s, opt-in via `data-reveal` (un filet global forçait aussi visibles
      l'aperçu flottant et les calques du showcase) ; `ScrollTrigger.refresh()` après
      `document.fonts.ready`. Vérifié sans JS : 34/34 révélations visibles, aperçu caché.
- [ ] **P1 — titre et boutons.** 8 titres proposés, en attente de validation.
- [ ] P2 — débordement du cadre (l'alignement à gauche est déjà fait).
- [ ] P3 — voix d'accent, 3 plans de profondeur.
- [ ] P4 — paliers 768–1024, captures à 390 / 768 / 1024 / 1440 / 1920.
- [ ] Passe 2 — reste de la page. Déjà relevé : titre de « Ce que je fais » contient
      « solutions » (mot proscrit) et ses capitales accentuées se télescopent en 2ᵉ ligne.

## 7. Audit passe 2 — suivi

Ordre imposé : N5 → P1 + P3a (décision) → N1 → N3 + N4 + N6 → N2 (décision) → captures 390/768/1024/1440.

- [x] **N5 — console.** Deux causes, toutes deux corrigées, vérifiées sur le build de prod
      (console vide, aucune requête en échec) :
      - 404 : `/favicon.ico` absent → `app/icon.svg` (carré accent, invite `>_`).
      - Hydratation : la classe `js` posée sur `<html>` par le script inline entrait en
        conflit avec le `className` que React gère sur cette balise. `suppressHydrationWarning`
        masquait l'avertissement mais pas le fond : React pouvait réécrire `className` et
        effacer `js`. L'état passe en attributs que React ne gère pas : `data-js` (script
        inline) et `data-motion-ready` (MotionProvider). Repli sans JS revérifié : 34/34.
- [x] **P1 + P3a** — titre « Le réseau tombe. L'app, *non.* » (n° 1, validé), voix d'accent
      Zodiak italique (validée). Hero revenu à 12vw (172,8 px à 1440, 2 lignes ; 62 px et
      3 lignes à 390). P2 : les captures NUNYA débordent du viewport à droite. P3b : 3 plans
      (titre et matière fixes, capture du quiz lente, capture du classement rapide), parallaxe
      GSAP désactivée en mouvement réduit, amplitude ÷ 2 sur tactile.
- [x] **N1** — Projets : un bloc large par projet, capture réelle et texte en alternance
      gauche/droite, données (`metrics`) en lignes, « Comment c'est fait » + « Ouvre le site ».
      Pas de phrase de résultat : aucune n'a été fournie, rien n'a été inventé.
      Retirés : le showcase et la grille (`project-showcase.tsx`, `useCursorFollower.ts`).
- [x] **N3** — `SectionHeader` toujours à gauche, retraits variés (Services 1/3, Compétences 1/6,
      Parcours 1/12, Contact 1/3). Cadre unique `.frame` pour navbar, hero et sections.
- [x] **N4** — Services : 4 lignes à colonnes inégales séparées par des filets, plus de cartes.
      Même traitement pour Parcours, À propos, Contact (plus aucune carte sur la page).
- [x] **N6** — Section de respiration après Projets : « Le code, ça se *montre.* »
- [x] **N2** — option B validée : roue 3D remplacée par une grille lisible sans clic
      (`SkillsBento.tsx`, `portfolio-and-image-gallery.tsx`, `badge.tsx` supprimés).
- [x] Captures 390 / 768 / 1024 / 1440 / 1920 : aucun défilement horizontal.

Trouvé et corrigé en route :
- `cn()` (tailwind-merge) supprimait `text-label` quand une couleur `text-*` suivait :
  la navbar et les filtres n'étaient pas en mono. Échelles maison déclarées dans `lib/utils.ts`.
- Navbar : menu burger jusqu'à 1024 px (les liens mono débordaient à 768), fond opaque au
  lieu du flou, suivi de section fiable après un saut de défilement, bouton « Écris-moi » en
  contour quand le hero ou le formulaire ont déjà leur bouton plein.
- `--fg-faint` passé de 3,4:1 à 4,8:1 (AA) sur les trois thèmes.
- Mot proscrit « solution(s) » retiré de 5 textes ; « passionné » et « impact » retirés d'À propos.
- Données inventées retirées : la fausse adresse `bot-pipeline.ai/telegram-engine` et
  `localhost:5000` affichées en barre d'URL ; le lien GitHub de NUNYA (page d'accueil de
  github.com, marqué « À REMPLIR »).
- Confettis du formulaire retirés (`canvas-confetti` désinstallé), succès réécrit : le
  formulaire ouvre la messagerie, il n'envoie rien lui-même.

Mesures (build de prod, cache vide) :
- Mobile 390 px, 4G lente + CPU ÷ 4 : LCP **2,47 s** (4,36 s avant le retrait du préchargement
  de la capture du hero, inutile sur mobile où elle est sous la ligne de flottaison).
  CLS 0,016. Entrée du hero à partir d'une opacité de 0,35 : le texte est compté par le LCP
  dès le premier affichage.
- JS au premier chargement : 201 kB → **150 kB**.
- Sans JS : 46/46 révélations visibles. Mouvement réduit : hero dans son état final à 250 ms.
- Console vide, aucune requête en échec.

Reste ouvert :
- Phrases de résultat réelles par projet (à fournir).
- Capture des bots : c'est un schéma, pas une capture du bot en fonctionnement.
- Thèmes papier / nuit et Lenis (étape 3.6) non commencés.
- Mentions légales absentes du pied de page (checklist CLAUDE.md §8).
- LCP mobile à la limite : alléger les polices (4 fichiers, chargés jusqu'à 3,9 s en 4G lente).
