import { z } from "zod";
import { AUDIENCE_OPTIONS, TONE_OPTIONS } from "../constants";

/**
 * Schéma de validation pour la génération de hooks
 */
export const hookRequestSchema = z.object({
  sujet: z.string().min(3),
  audience: z.enum(AUDIENCE_OPTIONS.map(option => option.value)),
  ton: z.enum(TONE_OPTIONS.map(option => option.value)),
});

/**
 * Schéma de validation pour la réponse de l’IA lors de la génération de hooks
 */
export const hookIAResponseSchema = z.object({
  hooks: z
    .array(
      z.object({
        text: z.string().min(5).max(120)
      })
    )
    .length(3)
});