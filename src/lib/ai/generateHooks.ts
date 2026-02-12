import OpenAI from "openai";
import { openaiKey } from "@/lib/env";
import { hookRequestSchema, hookIAResponseSchema } from "@/lib/validators/hook.schema";
import { PROMPT_HOOK } from "@/lib/ai/prompts";
import { Audience, Tone } from "@/types/editor";
import { pickHookTypes } from "../rules/pickHookTypes";

const openai = new OpenAI({
  apiKey: openaiKey
});

/**
 * Génère des hooks en fonction du sujet, de l’audience et du ton spécifiés
 * @param sujet 
 * @param audience 
 * @param ton 
 * @returns 
 */
export async function generateHooks(sujet: string, audience: Audience, ton: Tone, hookTypes = pickHookTypes()) {
    try {
        // 1. validation input
        hookRequestSchema.parse({ sujet, audience, ton });

        // 2. appel OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: PROMPT_HOOK },
                {
                    role: "user",
                    content: JSON.stringify({ sujet, audience, ton, hookTypes })
                }
            ],
            response_format: { type: "json_object" }
        });

        // 3. parsing IA
        return hookIAResponseSchema.parse(JSON.parse(response.choices[0].message.content || "{}"));

    } catch (error) {
        console.error("Error generating hooks:", error);
        throw error;
    }
}
