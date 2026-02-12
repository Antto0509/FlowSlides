/**
 * Génère un UID unique
 * @returns Un UID unique
 */
export function uid() {
  return crypto.randomUUID();
}

/**
 * Retourne la date et l’heure actuelles au format ISO
 * @returns La date et l’heure actuelles au format ISO
 */
export function nowIso() {
  return new Date().toISOString();
}
