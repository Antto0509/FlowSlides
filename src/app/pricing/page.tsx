import { PricingClient } from "@/components/pricing/PricingClient";
import { PLANS, FAQS } from "@/types/pricing";
import { createClient } from "@/lib/supabase/server";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";

export default async function PricingPage() {
  const supabase = await createClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  let subscription = null;
  if (user) {
    const { data } = await supabase
      .from("subscriptions")
      .select("plan, status, stripe_customer_id")
      .eq("user_id", user.id)
      .single();
    subscription = data;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation appName="FlowSlides" mounted={true} />
      <PricingClient
        plans={PLANS}
        faqs={FAQS}
        subscription={subscription}
      />
      <Footer appName="FlowSlides" />
    </main>
  );
}