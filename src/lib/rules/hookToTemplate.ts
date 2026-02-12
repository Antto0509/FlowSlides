import type { HookType, TemplateType } from "@/types/editor";

/**
 * Mapping entre les types de hooks et les templates correspondants  
 * → utilisé pour suggérer un template adapté au type de hook détecté
 */
export const hookToTemplate: Record<HookType, TemplateType> = {
  promesse: "hook_valeur",
  liste: "liste",
  avant_apres: "avant_apres",
  punchline: "visuel_insight",
  guide: "mini_guide",
};
