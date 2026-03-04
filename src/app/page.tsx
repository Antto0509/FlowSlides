import type { Metadata } from "next";
import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
  AnimatedBackground
} from '@/components/landing';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import type { ReviewRow } from '@/components/landing/TestimonialsSection';

export const metadata: Metadata = {
  title: { absolute: "FlowSlides — Créez des carrousels LinkedIn & Instagram avec l'IA" },
  description:
    "FlowSlides génère en moins de 2 minutes des carrousels percutants pour LinkedIn et Instagram. Hook IA, thèmes professionnels, export PNG/PDF. Essayez gratuitement.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "FlowSlides — Créateur de carrousels IA pour LinkedIn & Instagram",
    description:
      "Générez des carrousels professionnels pour vos réseaux sociaux grâce à l'IA. Gratuit pour commencer.",
    url: "/",
  },
};

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'FlowSlides';

async function getApprovedReviews(): Promise<ReviewRow[]> {
  try {
    const supabase = await createClient(cookies());
    const { data } = await supabase
      .from('reviews')
      .select('id, content, author_name, author_role, author_company')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(6);
    return (data as ReviewRow[]) ?? [];
  } catch {
    return [];
  }
}

export default async function CarouselLanding() {
  const reviews = await getApprovedReviews();

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background overflow-x-hidden">
      <AnimatedBackground />
      <Navigation appName={appName} mounted={true} />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection appName={appName} reviews={reviews} />
      <CTASection />
      <Footer appName={appName} />
    </main>
  );
}