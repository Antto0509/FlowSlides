import type { HookType } from "@/types/editor";

/**
 * Vérifie si un texte contient au moins un chiffre
 * @param text Le texte à analyser
 * @returns Vrai si le texte contient un chiffre, faux sinon
 */
function containsNumber(text: string) {
  return /\d/.test(text);
}

/**
 * Compte le nombre de mots dans un texte
 * @param text Le texte à analyser
 * @returns Le nombre de mots dans le texte
 */
function wordCount(text: string) {
  return text.trim().split(/\s+/).length;
}

/**
 * Analyse un hook en appliquant des règles spécifiques à son type, ainsi que des règles universelles de copywriting  
 * @param text Le texte du hook à analyser
 * @param type Le type de hook (promesse, liste, avant/après, punchline, guide)
 * @returns Un objet contenant les résultats de chaque règle appliquée, avec une indication de réussite ou d’échec pour chacune
 */
export function analyzeHook(text: string, type: HookType) {
  const words = wordCount(text);
  const hasNumber = containsNumber(text);

  const checks = [];

  // Règles universelles
  checks.push({
    label: "Court et impactant (≤14 mots)",
    passed: words <= 14
  });

  checks.push({
    label: "Contient un élément spécifique (ex: chiffre)",
    passed: hasNumber
  });

  // Règles selon type
  switch (type) {
    case "promesse":
      checks.push({
        label: "Met en avant un bénéfice clair",
        passed: /gagne|augmente|obtiens|double|réussis|améliore/i.test(text)
      });
      break;

    case "liste":
      checks.push({
        label: "Structure type liste détectée",
        passed: hasNumber
      });
      break;

    case "avant_apres":
      checks.push({
        label: "Opposition avant / après perceptible",
        passed: /avant|après|de\s.+\sà\s.+/i.test(text)
      });
      break;

    case "punchline":
      checks.push({
        label: "Formulation forte ou tranchée",
        passed: words <= 10
      });
      break;

    case "guide":
      checks.push({
        label: "Positionnement pédagogique clair",
        passed: /comment|guide|méthode|stratégie/i.test(text)
      });
      break;
  }

  return { checks };
}
