import OpenAI from "openai";
import { openaiKey } from "@/lib/env";
import { PROMPT_CAROUSEL } from "@/lib/ai/prompts";

const openai = new OpenAI({
  apiKey: openaiKey
});

/** * Génère un carousel en fonction du hook et du type de template spécifiés
 * @param hook 
 * @param templateType
 * @returns
 */
export async function generateCarousel(hook: string, templateType: string) {
    try {
        // 1. appel OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: PROMPT_CAROUSEL },
                {
                    role: "user",
                    content: JSON.stringify({ hook, templateType })
                }
            ],
            response_format: { type: "json_object" }
        });

        // 2. parsing IA
        return JSON.parse(response.choices[0].message.content || "{}");
    } catch (error) {
        console.error("Error generating carousel:", error);
        throw error;
    }
}