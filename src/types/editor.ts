// ==================================
// Réseaux sociaux ciblés par le carousel
// ==================================

import { AvantApresCarousel, HookValeurCarousel, ListeCarousel, MiniGuideCarousel, VisuelInsightCarousel } from "./templates";

/**
 * Plateformes sociales ciblées par le carousel
 */
export type Plateforme = "linkedin" | "instagram" | "both";

/**
 * Format du carousel
 */
export type Format = "1:1" | "4:5";

// ==================================
// Hook
// ==================================

/**
 * Types de hook possibles
 */
export type HookType =
  | "promesse"
  | "liste"
  | "avant_apres"
  | "punchline"
  | "guide";

/**
 * Score d’un hook (1 à 5) 
 * → utilisé pour classer les hooks et templates proposés
 */
export type HookScore = 1 | 2 | 3 | 4 | 5;

/**
 * Hook généré pour le carousel
 */
export type Hook = {
  id: string;
  text: string;
  type: HookType;
  templateType: TemplateType;
  score: HookScore;
  explanation: {
    reason: string;
    feedback: string;
  };
  analysis: {
    checks: {
      label: string;
      passed: boolean;
    }[];
  };
};

/**
 * Réponse de l’API lors de la génération de hooks
 */
export type HookResponse = {
  hooks: [Hook, Hook, Hook];
};

/**
 * Données envoyées à l’API pour générer des hooks
 */
export type HookRequest = {
  sujet: string;
  audience: Audience;
  ton: Tone;
};

// ==================================
// Template
// ==================================

/**
 * Types de template possibles
 */
export type TemplateType =
  | "hook_valeur"   // pour les hooks de type "promesse"
  | "liste"         // pour les hooks de type "liste"
  | "avant_apres"   // pour les hooks de type "avant_apres"
  | "visuel_insight"  // pour les hooks de type "punchline"
  | "mini_guide";   // pour les hooks de type "guide"

// ==================================
// Slides
// ==================================

/**
 * Slide d’un carousel
 */
export type Slide = {
  id: number;
  title: string;
  content: string;
};

// ==================================
// Carousel
// ==================================

/**
 * Carousel de slides
 */
export type Carousel = 
  | HookValeurCarousel
  | ListeCarousel
  | AvantApresCarousel
  | VisuelInsightCarousel
  | MiniGuideCarousel;

// ==================================
// Inputs
// ==================================

/**
 * Public cible du carousel
 * → utilisé pour générer les hooks et templates proposés
 */
export type Audience =
  | "freelance"
  | "solopreneur"
  | "client"
  | "tech"
  | "non_tech";

/**
 * Ton adopté dans le carousel
 * → utilisé pour générer les hooks et templates proposés
 */
export type Tone =
  | "neutre"
  | "direct"
  | "inspirant"
  | "tranche";

// ==================================
// Store
// ==================================

/**
 * État global de l’application
 */
export type StoreState = {
  // Step 1 – Inputs
  sujet: string;
  audience: Audience | "" | null;
  ton: Tone | "" | null;
  plateforme: Plateforme | "" | null;

  // Step 2 – Hook
  hook: Hook | null;

  // Step 3 – Template
  templateFamily: TemplateType | null;
  templateVariant: string | null;

  // Step 4 – Carousel
  carousel: Carousel | null;

  // Step 5 – Format
  format: Format | "" | null;

  // Meta
  step: number;
};

/**
 * Actions disponibles dans le store
 */
export type StoreActions = {
  setInputs: (data: {
    sujet: string;
    audience: Audience;
    ton: Tone;
    plateforme: Plateforme;
    format: Format;
  }) => void;

  setHook: (hook: StoreState["hook"]) => void;

  setTemplateVariant: (templateVariant: StoreState["templateVariant"]) => void;

  setCarousel: (carousel: StoreState["carousel"]) => void;

  setFormat: (format: StoreState["format"]) => void;

  resetAll: () => void;

  updateCTAText: (newContent: string) => void;
};

/**
 * Type combiné du store
 */
export type CarouselStore = StoreState & StoreActions;
