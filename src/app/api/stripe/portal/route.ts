import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createClient(cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub!.stripe_customer_id!,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/create-carousel`,
  })

  return NextResponse.json({ url: portalSession.url })
}
