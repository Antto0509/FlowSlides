import { hookToTemplate } from "./hookToTemplate";
import type { HookType, TemplateType } from "@/types/editor";

/**
 * Résout le template le plus adapté à partir du type de hook détecté  
 * → utilisé pour suggérer un template lors de la création d’un carousel à partir d’un hook
 * @param hookType Type de hook détecté
 * @return `TemplateType` Type de template suggéré pour ce type de hook
 */
export function resolveTemplateFromHook(
  hookType: HookType
): TemplateType {
  return hookToTemplate[hookType];
}
