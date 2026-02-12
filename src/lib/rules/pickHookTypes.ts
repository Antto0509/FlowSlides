import { HOOK_TYPES } from "../constants";
import type { HookType } from "@/types/editor";

/**
 * Sélectionne aléatoirement 3 types de hooks distincts parmi les HOOK_TYPES disponibles
 * @returns Un tableau de 3 types de hooks.
 */
export function pickHookTypes(): [HookType, HookType, HookType] {
  const shuffled = [...HOOK_TYPES].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}
