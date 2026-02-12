// ===================================
// Types de contenu pour les slides
// ===================================

type ImageAsset = {
  id: string;        // id en base ou storage
  url: string;       // url publique
  alt?: string;
};

/**
 * Contenu de base d’une slide, partagé par tous les types de slides
 */
type BaseContent = {
  title: string;
  paragraph?: string;
  image?: ImageAsset;
};

/**
 * Contenu de base d’une slide avec numéro, utilisé pour les slides de type "Promesse", "Valeur", "Item de liste", etc.  
 * Le numéro permet d’indiquer la progression dans le carousel et de structurer l’information de manière claire et hiérarchisée
 */
type NumberedContent = BaseContent

// ===================================
// Générique
// ===================================

/**
 * Slide "Hook" :  
 * - Titre : accroche forte
 * - Paragraphe : Lu en second, il développe l’accroche et donne envie de swiper pour découvrir la suite
 * - Slogan : Lu en dernier, il doit être court et percutant, pour rester en tête
 * - Image : visuel illustrant l’accroche
 */
export type HookSlide = {
  role: "hook";
  data: BaseContent & { slogan?: string };
};

/**
 * Slide "CTA" :  
 * - Titre : incitation à l’action
 * - Paragraphe : description de l’action à faire
 * - Slogan : phrase courte et percutante pour renforcer le CTA
 * - CallToAction : texte du bouton d’action
 * - Image : visuel illustrant le CTA
 */
export type CTASlide = {
  role: "cta";
  data: BaseContent & { slogan?: string; callToAction: string };
};

// ==================================
// Template "Hook → Promesse → Valeur"
// ==================================

/**
 * Slide "Promesse" :  
 * - Numéro de la slide : pour indiquer la progression dans le carousel
 * - Titre : promesse forte (résultat ou bénéfice à attendre)
 * - Paragraphe : description de la promesse, elle doit être claire et crédible
 * - Image : visuel illustrant la promesse
 */
export type PromesseSlide = {
  role: "promesse";
  data: NumberedContent;
};

/**
 * Slide "Valeur" :  
 * - Numéro de la slide : pour indiquer la progression dans le carousel
 * - Titre : point de valeur (conseil, astuce, étape, etc.)
 * - Paragraphe : description du point de valeur, elle doit être claire et concrète
 * - Image : visuel illustrant le point de valeur
 */
export type ValeurSlide = {
  role: "valeur";
  data: NumberedContent;
};

/**
 * Slide "Conclusion" :  
 * - Numéro de la slide : pour indiquer la progression dans le carousel
 * - Titre : synthèse ou punchline forte pour marquer les esprits
 * - Paragraphe : description de la conclusion, elle doit être percutante et mémorable
 * - Image : visuel illustrant la conclusion
 */
export type ConclusionSlide = {
  role: "conclusion";
  data: NumberedContent;
};

// ===================================
// Template "Liste / Erreurs / Étapes"
// ===================================

/**
 * Slide "Item de liste" :  
 * - Numéro de la slide : pour indiquer la progression dans le carousel
 * - Titre : point de la liste (conseil, astuce, étape, erreur, etc.)
 * - Paragraphe : description du point de la liste, elle doit être claire et concrète
 * - Image : visuel illustrant le point de la liste
 */
export type ListeItemSlide = {
  role: "item";
  data: NumberedContent;
};

/**
 * Slide "Récap / Warning" :  
 * - Titre : synthèse ou avertissement important
 * - Paragraphe : description du récap ou warning, elle doit être percutante et mémorable
 * - Image : visuel illustrant le récap ou warning
 */
export type RecapSlide = {
  role: "recap";
  data: BaseContent;
};

// ===================================
// Template "Problème → Avant / Après"
// ===================================

/**
 * Slide "Avant" :  
 * - Titre : situation douloureuse
 * - Paragraphe : description de la douleur
 * - Image : visuel illustrant la douleur
 */
export type AvantSlide = {
  role: "avant";
  data: BaseContent;
};

/**
 * Slide "Prise de conscience" :  
 * - Titre : moment de révélation ou de prise de conscience
 * - Paragraphe : description de la prise de conscience, elle doit être percutante et marquante
 * - Image : visuel illustrant la prise de conscience
 */
export type PriseConscienceSlide = {
  role: "prise_conscience";
  data: BaseContent;
};

/**
 * Slide "Changement" :  
 * - Titre : changement ou transformation
 * - Paragraphe : description du changement, elle doit être inspirante et motivante
 * - Image : visuel illustrant le changement
 */
export type ChangementSlide = {
  role: "changement";
  data: BaseContent;
};

/**
 * Slide "Après" :  
 * - Titre : situation améliorée ou résultat obtenu
 * - Paragraphe : description de la situation après le changement, elle doit être positive et valorisante
 * - Image : visuel illustrant la situation après le changement
 */
export type ApresSlide = {
  role: "apres";
  data: BaseContent;
};

// ===================================
// Template "Visuel + Insight"
// ===================================

/**
 * Slide "Hook visuel" :  
 * - Image : visuel dominant qui capte l’attention
 * - title : court et percutant, overlay du title sur le visuel pour renforcer l’impact de l’accroche
 */
export type HookVisuelSlide = {
  role: "hook_visuel";
  data: Pick<BaseContent, "title" | "image">;
};

/**
 * Slide "Insight" :  
 * - Titre : insight ou révélation forte
 * - Paragraphe : description de l’insight, elle doit être claire et marquante
 * - Image : visuel illustrant l’insight (optionnel, peut être un graphique, une icône, etc.)
 */
export type InsightSlide = {
  role: "insight";
  data: BaseContent;
};

// ===================================
// Template "Mini-guide"
// ===================================

/**
 * Slide "Framework" :  
 * - Titre : nom du framework ou de la checklist
 * - Paragraphe : description du framework, elle doit être claire et concise
 * - Image : visuel illustrant le framework (optionnel, peut être un schéma, une icône, etc.)
 */
export type FrameworkSlide = {
  role: "framework";
  data: BaseContent;
};

/**
 * Slide "Step" :  
 * - Numéro de la slide : pour indiquer la progression dans le carousel
 * - Titre : étape claire et actionnable
 * - Paragraphe : description de l’étape, elle doit être précise et facile à suivre
 * - Image : visuel illustrant l’étape (optionnel, peut être un schéma, une icône, etc.)
 */
export type StepSlide = {
  role: "step";
  data: NumberedContent;
};

/**
 * Slide "Conclusion" pour le mini-guide :  
 * - Titre : synthèse ou punchline forte pour marquer les esprits
 * - Paragraphe : description de la conclusion, elle doit être percutante et mémorable
 * - Image : visuel illustrant la conclusion (optionnel, peut être un schéma, une icône, etc.)
 */
export type ConclusionMiniGuideSlide = {
  role: "conclusion_mini_guide";
  data: BaseContent;
};