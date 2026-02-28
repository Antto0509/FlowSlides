import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AccountClient } from './AccountClient';

export default async function AccountPage() {
  const supabase = await createClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status, stripe_customer_id, current_period_end')
    .eq('user_id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation appName="FlowSlides" mounted={true} />
      <AccountClient
        user={{
          email: user.email!,
          created_at: user.created_at,
          first_name: user.user_metadata?.first_name ?? '',
          last_name: user.user_metadata?.last_name ?? '',
          email_confirmed_at: user.email_confirmed_at ?? null,
          last_sign_in_at: user.last_sign_in_at ?? null,
          provider: (user.app_metadata?.provider as string) ?? 'email',
        }}
        subscription={subscription}
      />
      <Footer appName="FlowSlides" />
    </main>
  );
}
