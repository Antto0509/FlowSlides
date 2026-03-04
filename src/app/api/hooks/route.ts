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
    const { subject, audience, tone, goal } = body;

    // 1. Auth
    const supabase = await createClient(cookies());
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // 2. Plan de l'utilisateur
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single();

    const plan = (subscription?.status === 'active' ? subscription.plan : null) ?? 'free';
    const limits = getPlanLimits(plan);

    // 3. Vérification de la limite mensuelle
    const month = new Date().toISOString().slice(0, 7); // "2026-02"
    let currentCount = 0;

    if (limits.carouselsPerMonth !== Infinity) {
      const { data: usage } = await supabase
        .from('usage')
        .select('carousels_count')
        .eq('user_id', user.id)
        .eq('month', month)
        .single();

      currentCount = usage?.carousels_count ?? 0;

      if (currentCount >= limits.carouselsPerMonth) {
        return NextResponse.json({ error: 'limit_reached' }, { status: 403 });
      }
    }

    // 4a. Hooks template pour les utilisateurs Free (sans IA)
    if (!limits.advancedHooks) {
      if (limits.carouselsPerMonth !== Infinity) {
        await supabase
          .from('usage')
          .upsert(
            { user_id: user.id, month, carousels_count: currentCount + 1 },
            { onConflict: 'user_id,month' }
          );
      }

      const sub = audience ? `les ${audience}` : 'les gens';
      const templateHooks = [
        { id: '1', title: `Pourquoi 90% des ${sub} échouent en ${subject} ?`, subtitle: 'La réponse va vous surprendre...', style: 'question' },
        { id: '2', title: `${subject} : les chiffres que personne ne vous montre`, subtitle: 'Données exclusives et analyse complète', style: 'statistic' },
        { id: '3', title: `Arrêtez tout. Voici la vérité sur ${subject}.`, subtitle: 'Ce que les experts ne vous diront jamais', style: 'bold' },
        { id: '4', title: `Comment j'ai transformé mon approche de ${subject}`, subtitle: "Mon histoire et les leçons que j'en ai tirées", style: 'story' },
        { id: '5', title: `${subject} : tout ce qu'on vous dit est faux`, subtitle: 'Préparez-vous à remettre en question vos certitudes', style: 'controversial' },
      ];

      // Correction orthographique légère par l'IA (sans régénération créative)
      try {
        const correctionPrompt = `Corrige uniquement les fautes d'orthographe, de grammaire et de typographie française dans ces hooks. Ne change pas le sens, le style, ni la structure. Conserve les mots-clés du sujet tels quels (ex: "${subject}"). Réponds UNIQUEMENT avec le JSON corrigé, même format.

${JSON.stringify({ hooks: templateHooks })}`;

        const correctionMsg = await anthropic.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          messages: [{ role: 'user', content: correctionPrompt }],
        });

        const correctionContent = correctionMsg.content[0];
        if (correctionContent.type === 'text') {
          const jsonMatch = correctionContent.text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const corrected = JSON.parse(jsonMatch[0]);
            return NextResponse.json({ hooks: corrected.hooks, aiGenerated: false });
          }
        }
      } catch {
        // En cas d'erreur, on retourne les templates bruts
      }

      return NextResponse.json({ hooks: templateHooks, aiGenerated: false });
    }

    // 4b. Génération des hooks IA (Pro+)
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleString('fr-FR', { month: 'long' });

    const prompt = `Tu es un expert en copywriting pour les réseaux sociaux, spécialisé dans la création de hooks accrocheurs pour des carrousels LinkedIn/Instagram.

CONTEXTE TEMPOREL IMPORTANT :
- Nous sommes actuellement en ${currentMonth} ${currentYear}
- Utilise cette date dans tes hooks si nécessaire (exemple : "en ${currentYear}" au lieu de dates obsolètes)
- Évite les références à des années passées

Génère 5 hooks différents basés sur ces informations :
- Sujet : ${subject}
- Audience : ${audience || 'professionnels'}
- Ton : ${tone || 'professionnel'}
- Objectif : ${goal || 'informer'}

Pour chaque hook, fournis :
1. Un titre percutant (maximum 80 caractères)
2. Un sous-titre complémentaire (maximum 100 caractères)
3. Un style parmi : "question", "statistic", "bold", "story", "controversial"

Assure-toi que les 5 hooks utilisent des styles différents (un de chaque).

Réponds UNIQUEMENT avec un JSON valide suivant ce format exact :
{
  "hooks": [
    {
      "id": "1",
      "title": "...",
      "subtitle": "...",
      "style": "question"
    },
    {
      "id": "2",
      "title": "...",
      "subtitle": "...",
      "style": "statistic"
    },
    {
      "id": "3",
      "title": "...",
      "subtitle": "...",
      "style": "bold"
    },
    {
      "id": "4",
      "title": "...",
      "subtitle": "...",
      "style": "story"
    },
    {
      "id": "5",
      "title": "...",
      "subtitle": "...",
      "style": "controversial"
    }
  ]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
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

    // 5. Incrément du compteur d'usage
    if (limits.carouselsPerMonth !== Infinity) {
      await supabase
        .from('usage')
        .upsert(
          { user_id: user.id, month, carousels_count: currentCount + 1 },
          { onConflict: 'user_id,month' }
        );
    }

    return NextResponse.json({ ...result, aiGenerated: true });
  } catch (error) {
    console.error('Error generating hooks:', error);
    return NextResponse.json(
      { error: 'Failed to generate hooks' },
      { status: 500 }
    );
  }
}
