# Spécification technique — Animation « Déconstruction & Assemblage Magnétique »

> Statut : **Terminé & validé**  
> Choix confirmés :
> - Déclenchement : Une seule fois par section (`once: true`) pour une lecture confortable une fois assemblé.
> - Intensité : Éclatement équilibré (40px à 60px d'offset, rotation de 4° à 6°, magnétique & précis).
> - Périmètre : Tout le site (Hero, Projets, Services, Compétences, Expérience, À propos, Contact).

---

## 1. Objectif & Vision

Transformer la visite du portfolio en une expérience cinématique vivante :
- **État éclaté au départ** : les différents sous-éléments de chaque bloc (titres, cartes, badges technologiques, captures d'écrans, indicateurs) flottent légèrement décalés avec rotation et flou cinétique.
- **Assemblage magnétique en descendant** : dès que le visiteur scroll sur une section, tous les blocs se rassemblent automatiquement un à un (stagger de 70ms à 100ms), verrouillant la structure dans un alignement parfait.

---

## 2. Architecture Technique

### Composant central : `components/ui/MagneticAssembly.tsx`
- Utilise `framer-motion` (`m.div`, `m.ol`, etc.) compatible avec `LazyMotion strict`.
- Système de fragmentation parent/enfant :
  - `MagneticAssembly` (conteneur déclencheur `whileInView` avec `viewport: { once: true, amount: 0.15 }`).
  - `AssemblyFragment` (enfant qui prend une direction ou un profil d'éparpillement prédéfini : `top-left`, `top-right`, `bottom-left`, `bottom-right`, `tilt-left`, `tilt-right`, ou vecteur dynamique basé sur son index).
- Paramètres de trajectoire :
  - `x`: -55px à +55px
  - `y`: 35px à 50px
  - `rotate`: -4.5deg à +4.5deg
  - `scale`: 0.94
  - `filter`: blur(5px) -> blur(0px)
  - `opacity`: 0 -> 1
  - Courbe d'animation : `cubic-bezier(0.16, 1, 0.3, 1)` (amortis doux et dynamique de 720ms).
- Support strict de `prefers-reduced-motion` : aucune translation ni rotation si l'utilisateur a désactivé les animations.

---

## 3. Plan de tâches séquentielles

- [x] **Tâche 1** : Créer le composant `components/ui/MagneticAssembly.tsx` avec ses variantes et son système de fragments.
- [x] **Tâche 2** : Intégrer l'assemblage magnétique dans la section Projets (`components/Projects.tsx`).
- [x] **Tâche 3** : Intégrer l'assemblage magnétique dans la section Services (`components/Services.tsx`) et Compétences (`components/Skills.tsx`).
- [x] **Tâche 4** : Intégrer l'assemblage magnétique dans Expérience (`components/Experience.tsx`), À propos (`components/About.tsx`) et Contact (`components/Contact.tsx`).
- [x] **Tâche 5** : Vérifier la compilation, la réactivité 60 FPS, l'absence de débordement horizontal (`overflow-x: hidden`) et rapporter au client.
