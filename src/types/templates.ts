import { Format } from "./editor";
import { 
  HookSlide, 
  PromesseSlide, 
  ValeurSlide, 
  ConclusionSlide, 
  CTASlide, 
  HookVisuelSlide,
  ListeItemSlide,
  InsightSlide,
  RecapSlide,
  AvantSlide,
  PriseConscienceSlide,
  ChangementSlide,
  ApresSlide,
  FrameworkSlide,
  StepSlide,
  ConclusionMiniGuideSlide
} from "./slides";

type CarouselBase = {
  variantId: string;
  format: Format;
  settings?: {
    showNumbers?: boolean;
  };
};

/**
 * Template "Hook → Promesse → Valeur" :  
 * - 7 à 10 slides max  
 * Exemple :  
 * - Slide 1 : Hook
 * - Slide 2 à 3 : Promesse claire (Ce que le lecteur va apprendre ou gagner)
 * - Slide 4 à N-2 : Valeur progressive (3 à 6 points de valeur progressive, du plus important au moins important)
 * - Slide N-1 : Conclusion (Synthèse ou puncline forte)
 * - Slide N : CTA
 */
export type HookValeurCarousel = CarouselBase & {
  templateType: "hook_valeur";
  slides: [
    HookSlide,
    PromesseSlide,
    ...ValeurSlide[],
    ConclusionSlide,
    CTASlide
  ];
};

/**
 * Template "Liste / Erreurs / Étapes" :  
 * - 5 à 12 slides max  
 * Exemple :  
 * - Slide 1 : Hook
 * - Slide 2 à N-2 : Items de la liste (3 à 10 items max, selon la longueur du texte)
 * - Slide N-1 : Récap ou warning
 * - Slide N : CTA
 */
export type ListeCarousel = CarouselBase & {
  templateType: "liste";
  slides: [
    HookSlide,
    ...ListeItemSlide[],
    RecapSlide,
    CTASlide
  ];
};

/**
 * Template "Problème → Avant / Après" :
 * - 6 à 9 slides max  
 * Exemple :  
 * - Slide 1 : Hook
 * - Slide 2 : Situation douloureuse (Avant)
 * - Slide 3 : Prise de conscience
 * - Slide 4 : Changement
 * - Slide 5 : Résultat (Après)
 * - Slide 6 : CTA
 */
export type AvantApresCarousel = CarouselBase & {
  templateType: "avant_apres";
  slides: [
    HookSlide,
    AvantSlide,
    PriseConscienceSlide,
    ChangementSlide,
    ApresSlide,
    CTASlide
  ];
};

/**
 * Template "Visuel + Insight" :  
 * - 5 à 7 slides max  
 * Exemple :  
 * - Slide 1 : Hook visuel (Image dominante)
 * - Slide 2 à N-1 : Insight courte (Texte + visuel secondaire optionnel)
 * - Slide N : CTA
 */
export type VisuelInsightCarousel = CarouselBase & {
  templateType: "visuel_insight";
  slides: [
    HookVisuelSlide,
    ...InsightSlide[],
    CTASlide
  ];
};

/**
 * Template "Mini-guide" :  
 * - 8 à 15 slides max  
 * Exemple :  
 * - Slide 1 : Hook
 * - Slide 2 à 3 : Framework ou checklist
 * - Slide 4 à N-2 : Étapes claires
 * - Slide N-1 : Conclusion actionnable
 * - Slide N : CTA
 */
export type MiniGuideCarousel = CarouselBase & {
  templateType: "mini_guide";
  slides: [
    HookSlide,
    FrameworkSlide,
    ...StepSlide[],
    ConclusionMiniGuideSlide,
    CTASlide
  ];
};

