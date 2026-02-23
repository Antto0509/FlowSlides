# FlowSlides

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#flowslides)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![Status](https://img.shields.io/badge/Status-🚧%20In%20Development-yellow)](#-état-du-projet)

---

> **FlowSlides** est un outil de création de carrousels **LinkedIn & Instagram**,  
> conçu pour produire du contenu **clair, structuré et performant** en quelques minutes.  
>
> Pas de canvas vide.  
> Pas de design au hasard.  
> **Des templates solides + une IA qui écrit pour toi.**

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-pourquoi-flowslides-)

## ➤ Pourquoi FlowSlides ?

Créer des carrousels efficaces prend du temps :

- trouver l’angle
- structurer les slides
- écrire un texte percutant
- garder un design cohérent

👉 **FlowSlides élimine ces frictions.**

Tu pars d’un **contenu généré par IA**,  
tu choisis un **template optimisé**,  
tu ajustes…  
et tu exportes.

Simple. Rapide. Propre.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-fonctionnalités-clés)

## ➤ Fonctionnalités clés

### 🧠 Génération de texte par IA (centrale)

- Génère le texte complet d’un carrousel à partir de :
  - un sujet
  - une audience
  - un ton
  - une plateforme (LinkedIn / Instagram)
- Texte structuré **slide par slide**

> L’IA écrit.  
> **Le design reste maîtrisé.**

---

### 🧱 Templates guidés (pas de chaos)

- Templates conçus à la main
- Design verrouillé pour garantir un rendu propre
- Deux formats disponibles :
  - **1:1 — 1080×1080**
  - **4:5 — 1080×1350** (recommandé)

👉 L’utilisateur modifie le contenu, pas la structure.

---

### ✏️ Édition simple et rapide

- Modification du texte
- Ajout / remplacement d’images
- Ajustements légers (selon le template)

Pas de surcharge.
Pas de décisions inutiles.

---

### 🖼️ Export prêt à poster

- Export image haute qualité
- Slides optimisées pour LinkedIn et Instagram
- Résultat fidèle à l’aperçu (WYSIWYG réel)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-comment-ça-marche-)

## ➤ Comment ça marche ?

1. **Générer le contenu**
   - Indique le sujet, l’audience, le ton, la plateforme et le format
   - L’IA génère 3 hooks

2. **Choisir un hook**
   - Sélectionne le hook d’accroche qui te plaît le plus
   - L’IA génère le texte complet du carrousel

3. **Ajuster si nécessaire**
   - Modifier le texte
   - Ajouter/Remplacer les images
   - Modifier le thème de couleurs

4. **Exporter**
   - Images/PDF prêtes à être publiées

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-stack-technique)

## ➤ Stack technique

FlowSlides est construit avec une stack moderne, fiable et scalable :

- **Next.js** — Framework React (App Router)
- **TypeScript** — Typage strict et robustesse
- **Tailwind CSS** — Styling rapide et maintenable
- **shadcn/ui** — Composants UI accessibles et cohérents
- **Vercel** — Déploiement et performance

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-architecture)

## ➤ Architecture

```txt
FlowSlides/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ api/                 // endpoints pour la génération de contenu
│  │  ├─ create-carousel/     // interface de création de carrousel
│  │  ├─ examples/            // exemples de carrousels générés
│  │  ├─ legal/               // mentions légales
│  │  ├─ pricing/             // page de tarification
│  │  ├─ privacy/             // politique de confidentialité
│  │  ├─ terms/               // CGU (Conditions Générales d’Utilisation)
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ components/
│  │  ├─ examples/            // composants spécifiques aux exemples de carrousels
│  │  ├─ landing/             // composants spécifiques à la landing page
│  │  ├─ legal/               // composants pour les pages légales
│  │  ├─ pricing/             // composants pour la page de tarification
│  │  ├─ ui/                  //shadcn/ui components
│  │  ├─ CarouselForm.tsx     // formulaire de génération
│  │  ├─ Footer.tsx           // pied de page
│  │  ├─ HookSelection.tsx    // sélection du hook d’accroche
│  │  ├─ Navigation.tsx       // barre de navigation
│  │  ├─ ScrollableThumbnails.tsx   // aperçu des slides sous forme de miniatures
│  │  ├─ SlideEditor.tsx      // éditeur de contenu pour chaque slide
│  │  ├─ SlidePreview.tsx     // aperçu en temps réel
│  │  ├─ StepIndicator.tsx    // indicateur de progression
│  │  └─ ThemeProvider.tsx    // gestion des thèmes de couleurs
│  ├─ lib/
│  │  └─ utils.ts
│  └─ types/
│     ├─ carousel.ts
│     ├─ example.ts
│     └─ pricing.ts
├─ .gitignore
├─ components.json
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-état-du-projet)

## ➤ État du projet

🚧 **En cours de développement**

FlowSlides est en phase active de construction.  
Les fonctionnalités, l’UX et les templates évoluent en continu.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-philosophie)

## ➤ Philosophie

> Un bon carrousel, ce n’est pas plus d’options.  
> C’est moins de décisions et plus de clarté.
