import { NextResponse } from "next/server";
import { scoreHook } from "@/lib/rules/scoreHook";
import { resolveTemplateFromHook } from "@/lib/rules/resolveTemplateFromHook";
import { generateHooks } from "@/lib/ai/generateHooks";
import { pickHookTypes } from "@/lib/rules/pickHookTypes";
import { explainHook } from "@/lib/rules/explainHook";
import { analyzeHook } from "@/lib/rules/analyzeHook";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hookTypes = pickHookTypes();

    const responseAi = await generateHooks(body.sujet, body.audience, body.ton, hookTypes);

    const hooks = responseAi.hooks.map((h, index) => {
        const expectedType = hookTypes[index]
        const score = scoreHook(h.text);

        return {
          id: crypto.randomUUID(),
          text: h.text,
          type: expectedType,
          templateType: resolveTemplateFromHook(expectedType),
          score,
          explanation: explainHook(h.text, expectedType, score),
          analysis: analyzeHook(h.text, expectedType)
        };
    }).sort((a, b) => b.score - a.score); // Tri par score décroissant

    return NextResponse.json({ 
        hooks, 
        canRegenerate: false // Fonctionnalité payante à implémenter plus tard, nécessite de stocker les inputs et les hooks générés pour chaque utilisateur
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request or AI response" },
      { status: 400 }
    );
  }
}
