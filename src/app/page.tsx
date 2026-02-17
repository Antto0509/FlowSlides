"use client";

import {
  Navigation,
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
  Footer,
  AnimatedBackground
} from '@/components/landing';
import { Metadata } from 'next';

const appName = process.env.APP_NAME || 'FlowSlides';

export const metadata: Metadata = {
  title: `${appName} - Créez des carrousels engageants en un clin d'œil`,
  description: `${appName} est votre assistant de création de carrousels alimenté par l'IA. Générez des carrousels percutants pour LinkedIn et Instagram en quelques clics, adaptés à votre sujet et à votre audience.`
};

export default function CarouselLanding() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background overflow-x-hidden">
      <AnimatedBackground />
      <Navigation appName={appName} mounted={true} />
      <HeroSection mounted={true} />
      <FeaturesSection />
      <TestimonialsSection appName={appName} />
      <CTASection />
      <Footer appName={appName} />
    </main>
  );
}