import type { HookType } from "@/types/editor";

/**
 * Fournit une explication détaillée du hook, en se basant sur son type et son score  
 * @param text Le texte du hook à expliquer
 * @param type Le type de hook (promesse, liste, avant/après, punchline, guide)
 * @param score Le score du hook (1 à 5) calculé par la fonction scoreHook
 * @returns Un objet contenant une raison générale basée sur le type et un feedback spécifique basé sur le score
 */
export function explainHook(text: string, type: HookType, score: number) {
  const explanations: Record<HookType, string> = {
    promesse: "Met en avant un bénéfice clair et désirable",
    liste: "Annonce une liste d'éléments concrets et attractifs",
    avant_apres: "Crée une tension en montrant un contraste fort",
    guide: "Promet une méthode claire et facile à suivre",
    punchline: "Formule percutante qui suscite la curiosité"
  };

  const base = explanations[type] || "Structure persuasive efficace";

  let feedback = "";

  if (score >= 4) {
    feedback = "Hook très solide, clair et direct";
  } else if (score > 2) {
    feedback = "Bon hook mais peut être plus spécifique";
  } else {
    feedback = "Manque de précision ou de tension";
  }

  return {
    reason: base,
    feedback
  };
}
