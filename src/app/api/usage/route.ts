import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getPlanLimits } from '@/types/pricing';

export async function GET() {
  const supabase = await createClient(cookies());
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .single();

  const plan = (subscription?.status === 'active' ? subscription.plan : null) ?? 'free';
  const limits = getPlanLimits(plan);

  const month = new Date().toISOString().slice(0, 7);
  const { data: usage } = await supabase
    .from('usage')
    .select('carousels_count')
    .eq('user_id', user.id)
    .eq('month', month)
    .single();

  return NextResponse.json({
    plan,
    used: usage?.carousels_count ?? 0,
    limit: limits.carouselsPerMonth === Infinity ? -1 : limits.carouselsPerMonth,
  });
}
