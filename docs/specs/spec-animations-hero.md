# Spécification Technique : Animations Dynamiques du Hero (Style Awwwards / 21st.dev)

> Fichier : `docs/specs/spec-animations-hero.md`
> Conforme à la règle de travail : cadrer et spécifier avant de coder, attendre validation.

## 1. Objectif
Rendre la section **Hero** (la première impression du portfolio) spectaculaire, vivante et percutante (Style Awwwards / 21st.dev), tout en préservant la voix de marque (« l'ingénieur qui montre ses mains ») et des performances optimales (60 fps, zéro dépendance réseau lente).

---

## 2. Parcours Visuel & Expérience Utilisateur

### 2.1 Révélation du Titre Punchy (Kinetic Masked Reveal)
- **Animation d'entrée** : Les lignes de texte du titre (*« Le réseau tombe. / L'app, non. »*) émergent de masques de rognage inférieurs avec une courbe d'accélération puis freinage net (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Mise en valeur du mot d'accent** : Le mot clé « *non.* » (en typographie Zodiak italique orange brique) se dévoile avec un léger décalage et une lueur chaude instantanée.

### 2.2 Effet de Profondeur 3D Interactif sur les Smartphones (NUNYA Showcase)
- **Tilt 3D & Parallaxe au curseur** : Les deux maquettes de smartphones flottant à droite réagissent aux mouvements de la souris de l'utilisateur avec deux plans de profondeur distincts (le smartphone arrière bouge lentement, le smartphone avant réagit avec un angle 3D dynamique et des reflets de lumière spéculaire).
- **Sur mobile / tactile** : Animation de flottaison douce et continue (respiration à deux temps) sans surcharger le processeur.

### 2.3 Boutons Magnétiques Vivants (Micro-interactions 21st.dev)
- **Effet d'aimant (Magnetic Hover)** : Le bouton principal (« Regarde ce que j'ai construit ») s'oriente doucement vers le curseur lorsqu'il s'approche (rayon de capture de 40px).
- **Réflecteur de bordure (Border Shimmer / Spotlight)** : Un léger reflet de lumière suit l'angle de la souris sur le bouton au survol.
- **Micro-clic physique** : Enfoncement tactile élastique au clic (`scale: 0.96` pendant 120ms).

### 2.4 Spot d'Éclairage Atelier en Arrière-plan
- Un halo de lumière feutré et discret (teinte ambre/brique très douce) suit le mouvement du curseur en arrière-plan sans bloquer les textes ni créer de lag (calcul GPU via `transform3d` et `CSS variables`).

---

## 3. Règles de Performance & Accessibilité (`design-apps.md`)
- **60 FPS constants** : Animation exclusive de `transform` et `opacity` via accélération matérielle GPU (`will-change`).
- **Mouvement réduit (`prefers-reduced-motion`)** : Désactivation totale du tilt 3D et des effets magnétiques pour les utilisateurs sensibles ; affichage instantané et propre.
- **Résilience réseau** : Aucune dépendance externe requise (les polices et scripts restent locaux).

---

## 4. Découpage des Tâches

- [ ] **Tâche 1** : Créer le hook/composant de bouton magnétique avec reflet de bordure (`components/ui/MagneticButton.tsx`).
- [ ] **Tâche 2** : Créer le composant de carte/smartphones avec effet Tilt 3D réactif au curseur (`components/ui/HeroTiltPhones.tsx`).
- [ ] **Tâche 3** : Implémenter la cinématique de révélation cinétique du titre dans `Hero.tsx`.
- [ ] **Tâche 4** : Intégrer l'éclairage de fond feutré réactif au curseur dans la section Hero.
- [ ] **Tâche 5** : Vérifier sur mobile, tester les performances, vérifier avec `npm run build` et rapporter le résultat.

---

## 5. Critères de « Terminé »
- [ ] Le Hero s'anime dès l'arrivée avec du dynamisme et du caractère.
- [ ] Les téléphones réagissent à la souris de façon fluide et naturelle.
- [ ] Les boutons ont un retour tactile immédiat et magnétique.
- [ ] Aucune régression sur mobile ou pour `prefers-reduced-motion`.
- [ ] `npm run build` compile avec 0 erreur.
