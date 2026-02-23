import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Mappe un Price ID vers un nom de plan lisible
function getPlanFromPriceId(priceId: string): string {
  const map: Record<string, string> = {
    [process.env.STRIPE_PRICE_PRO_MONTHLY!]:  'pro_monthly',
    [process.env.STRIPE_PRICE_PRO_ANNUAL!]:   'pro_annual',
    [process.env.STRIPE_PRICE_KING_MONTHLY!]: 'king_monthly',
    [process.env.STRIPE_PRICE_KING_ANNUAL!]:  'king_annual',
  }
  return map[priceId] ?? 'unknown'
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[Webhook] Signature invalide:', err)
    return NextResponse.json({ error: 'Webhook invalide' }, { status: 400 })
  }

  console.log('[Webhook] Événement reçu:', event.type)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (!session.metadata?.userId) {
      console.error('[Webhook] userId manquant dans metadata !')
      return NextResponse.json({ error: 'userId manquant' }, { status: 400 })
    }

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const priceId = subscription.items.data[0].price.id
    const plan = getPlanFromPriceId(priceId)

    console.log('[Webhook] Price ID:', priceId, '→ Plan:', plan)

    const { error } = await supabase.from('subscriptions').upsert({
      user_id: session.metadata.userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscription.id,
      plan,
      status: subscription.status,
      current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
    }, { onConflict: 'user_id' })

    if (error) {
      console.error('[Webhook] Erreur Supabase upsert:', error)
      return NextResponse.json({ error: 'Erreur BDD' }, { status: 500 })
    }

    console.log('[Webhook] Subscription enregistrée — plan:', plan)
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const priceId = subscription.items.data[0].price.id
    const plan = getPlanFromPriceId(priceId)

    console.log(`[Webhook] ${event.type} — Price ID:`, priceId, '→ Plan:', plan)

    const { error } = await supabase.from('subscriptions')
      .update({
        status: subscription.status,
        plan: subscription.status === 'active' ? plan : 'free',
        current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) {
      console.error('[Webhook] Erreur Supabase update:', error)
      return NextResponse.json({ error: 'Erreur BDD' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}