import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
  AnimatedBackground
} from '@/components/landing';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const appName = process.env.APP_NAME || 'FlowSlides';

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