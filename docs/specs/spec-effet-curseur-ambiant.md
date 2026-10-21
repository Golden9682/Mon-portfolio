# Spécification technique — Effet interactif de curseur sur fonds vide (Sombre & Clair)

> Statut : **Terminé & validé**  
> Choix confirmés :
> - Effet sombre : Halo lumineux doux et profond (lumière ambrée/brique #E2572B à double noyau).
> - Effet clair : Lavis d'encre doux et soyeux (tons terre cuite et graphite artisanal à faible opacité).
> - Mobile/tactile : Désactivé sur les appareils tactiles (`hover: hover and pointer: fine`) pour préserver l'ergonomie.

---

## 1. Objectif & Expérience Visuelle

Donner vie aux espaces vides du portfolio lors du déplacement du curseur, en s'adaptant dynamiquement aux deux univers chromatiques du site :
- **Sur les fonds sombres (Atelier & Nuit)** : révélation lumineuse douce sous le curseur (effet "spotlight / rétroéclairage d'ingénierie" qui fait vivre le fond noir et met en valeur la profondeur).
- **Sur les fonds clairs (Papier)** : sillage subtil inspiré du papier et de l'encre (lavis chaud à faible opacité qui magnifie la texture artisanale sans altérer la lisibilité).

---

## 2. Architecture Technique

- Composant : `components/ui/AmbientCursorBacklight.tsx`
- Intégration globale : `app/page.tsx`
- Détection dynamique de la section sous le pointeur (`document.elementFromPoint` + `[data-theme-section]`).
- Amorti cinématique 60 FPS avec interpolation lerp `0.12`.
- GPU acceleration : `transform: translate3d(...)` + `willChange`.

---

## 3. Plan de tâches séquentielles

- [x] **Tâche 1** : Créer le composant `components/ui/AmbientCursorBacklight.tsx` avec suivi fluide du curseur et écoute du thème sous le pointeur.
- [x] **Tâche 2** : Intégrer le composant au niveau global (`app/page.tsx`).
- [x] **Tâche 3** : Harmoniser l'effet sur les sections sombres (Hero, Projets, Contact) et claires (Statement, Compétences, Expérience, À propos).
- [x] **Tâche 4** : Vérifier la performance (60 FPS, zéro jank), le build Next.js et tester sur mobile.
