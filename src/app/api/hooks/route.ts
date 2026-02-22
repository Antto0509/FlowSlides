import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, audience, tone, goal } = body;

    // Get current date
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
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse the JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating hooks:', error);
    return NextResponse.json(
      { error: 'Failed to generate hooks' },
      { status: 500 }
    );
  }
}