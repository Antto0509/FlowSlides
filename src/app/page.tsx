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

export default function CarouselLanding() {
  // Gestion dynamique de mounted
  const mounted = true;

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background overflow-x-hidden">
      <AnimatedBackground />
      <Navigation appName={appName} mounted={mounted} />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection appName={appName} />
      <CTASection />
      <Footer appName={appName} />
    </main>
  );
}