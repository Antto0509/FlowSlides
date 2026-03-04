import type { Metadata } from "next";
import { PricingClient } from "@/components/pricing/PricingClient";
import { PLANS, FAQS } from "@/types/pricing";
import { createClient } from "@/lib/supabase/server";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Choisissez votre plan FlowSlides : Free (0€), Pro (10€/mois) ou King (20€/mois). Carrousels IA illimités, export sans watermark, thèmes professionnels.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Tarifs FlowSlides — Free, Pro et King",
    description:
      "Plans à partir de 0€. Créez des carrousels LinkedIn et Instagram avec l'IA. Changez de plan à tout moment.",
    url: "/pricing",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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