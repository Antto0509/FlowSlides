import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getPlanLimits } from '@/types/pricing';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, audience, tone, goal, slideCount, hookTitle, hookSubtitle, isRegeneration = false } = body;

    // 1. Auth
    const supabase = await createClient(cookies());
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // 2. Vérification du plan (King only)
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single();

    const plan = (subscription?.status === 'active' ? subscription.plan : null) ?? 'free';
    const limits = getPlanLimits(plan);

    if (!limits.aiContent) {
      return NextResponse.json({ error: 'plan_required' }, { status: 403 });
    }

    // 3. Vérification et incrément de la limite de régénérations
    const month = new Date().toISOString().slice(0, 7);
    let regenerationsCount = 0;

    if (isRegeneration) {
      const { data: usage } = await supabase
        .from('usage')
        .select('regenerations_count')
        .eq('user_id', user.id)
        .eq('month', month)
        .single();

      regenerationsCount = usage?.regenerations_count ?? 0;

      if (regenerationsCount >= limits.maxRegenerations) {
        return NextResponse.json({ error: 'regeneration_limit_reached' }, { status: 429 });
      }
    }

    // 4. Génération du contenu des slides
    const prompt = `Tu es un expert en création de contenu pour carrousels LinkedIn/Instagram.

Génère le contenu complet pour un carrousel de ${slideCount} slides basé sur :
- Sujet : ${subject}
- Audience : ${audience || 'professionnels'}
- Ton : ${tone || 'professionnel'}
- Objectif : ${goal || 'informer'}
- Hook choisi : "${hookTitle}" / "${hookSubtitle}"

Règles STRICTES :
- Slide 1 (type "hook") : title = "${hookTitle}" exactement, body = "${hookSubtitle}" exactement, pas de bulletPoints.
- Slides 2 à ${slideCount - 1} (type "content") : titre percutant (max 60 chars), body explicatif (2-3 phrases max), 2 à 4 bulletPoints actionnables et concrets.
- Slide ${slideCount} (type "cta") : appel à l'action engageant en lien avec le sujet, pas de bulletPoints.

Réponds UNIQUEMENT avec un JSON valide :
{
  "slides": [
    { "id": "s1", "type": "hook", "title": "...", "body": "..." },
    { "id": "s2", "type": "content", "title": "...", "body": "...", "bulletPoints": ["...", "..."] },
    { "id": "s${slideCount}", "type": "cta", "title": "...", "body": "..." }
  ]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Incrément du compteur de régénérations après succès
    if (isRegeneration) {
      await supabase
        .from('usage')
        .upsert(
          { user_id: user.id, month, regenerations_count: regenerationsCount + 1 },
          { onConflict: 'user_id,month' }
        );
    }

    return NextResponse.json({ ...result, regenerationsUsed: isRegeneration ? regenerationsCount + 1 : undefined, regenerationsMax: limits.maxRegenerations });
  } catch (error) {
    console.error('Error generating slides:', error);
    return NextResponse.json(
      { error: 'Failed to generate slides' },
      { status: 500 }
    );
  }
}
