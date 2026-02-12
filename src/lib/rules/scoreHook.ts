import { HookScore } from "@/types/editor";

/**
 * Mots puissants qui augmentent le score d’un hook
 */
const POWER_WORDS = ["sans", "comment", "pourquoi", "3", "5", "7"];

/**
 * Score un hook sur 5 en fonction de sa longueur, de la présence de mots puissants et de chiffres
 * @param text Le texte du hook à scorer
 * @returns Le score du hook (1 à 5)
 */
export function scoreHook(text: string): HookScore {
  let score = 1;

  const words = text.split(" ");
  if (words.length <= 12) score += 2;

  if (POWER_WORDS.some(w => text.toLowerCase().includes(w))) {
    score += 1;
  }

  if (/[0-9]/.test(text)) score += 1;

  if (score > 5) score = 5;
  return score as HookScore;
}
