'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Share2, Linkedin, Instagram, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Aurora from '@/components/ui/Aurora';
import SlidePreview from '@/components/SlidePreview';

interface HeroSectionProps {
  mounted: boolean;
}

export function HeroSection({ mounted }: HeroSectionProps) {
  const stats = [
    { value: '10k+', label: 'Carrousels créés' },
    { value: '2min', label: 'Temps moyen' },
    { value: '98%', label: 'Satisfaction' }
  ];

  const showcaseItems = [
    { platform: 'LinkedIn', icon: Linkedin, gradient: 'from-primary to-primary/70' },
    { platform: 'Instagram', icon: Instagram, gradient: 'from-accent to-accent/70' },
    { platform: 'Multi', icon: Layers, gradient: 'from-primary/80 to-accent/80' }
  ];

  return (
    <section className="relative px-6 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Aurora Background with overlay for better readability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={["#7cff67","#B19EEF","#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background/50 dark:from-background/70 dark:via-background/80 dark:to-background/85" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div 
          className={`text-center transition-all duration-1000 delay-150 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Badge 
            className="mb-6 px-4 py-2 bg-primary/15 dark:bg-primary/20 text-primary dark:text-primary/90 border-primary/30 dark:border-primary/40 text-sm font-semibold hover:bg-primary/20 dark:hover:bg-primary/25 transition-colors shadow-sm"
          >
            <Zap className="w-4 h-4 mr-2 inline animate-pulse" />
            Nouveau : IA générative intégrée
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            <span className="gradient-text drop-shadow-sm">Créez des</span>
            <br />
            <span className="text-foreground drop-shadow-sm">carrousels</span>
            <br />
            <span className="gradient-text drop-shadow-sm">inoubliables</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 dark:text-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            La plateforme de création de carrousels pour{' '}
            <span className="inline-flex items-center border border-primary/30 dark:border-primary/40 bg-primary/10 dark:bg-primary/15 px-2.5 py-1 rounded-lg text-primary dark:text-primary/95 font-semibold shadow-sm">
              LinkedIn & Instagram
            </span>
            <br className="hidden md:block" />
            Design professionnel, exports parfaits, résultats garantis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/create-carousel">
              <Button 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-br from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Créer gratuitement
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-border hover:bg-primary/5 dark:hover:bg-primary/10 text-foreground hover:text-primary hover:border-primary/40 dark:hover:border-primary/50 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 shadow-sm"
            >
              <Share2 className="mr-2 w-5 h-5" />
              Voir des exemples
            </Button>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`transition-all duration-700 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(i + 3) * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1 drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70 dark:text-foreground/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real carousel examples showcase */}
        <div 
          className={`mt-20 relative transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Des carrousels qui <span className="gradient-text">captivent</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/70 dark:text-foreground/80 max-w-2xl mx-auto">
              Créez des slides professionnels adaptés à chaque plateforme. Voici des exemples de ce que vous pourrez générer en quelques clics.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {showcaseItems.map((item, i) => (
                <div 
                  key={i}
                  className="relative group"
                  style={{ 
                    animationDelay: `${i * 150}ms`,
                    animation: mounted ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                    opacity: mounted ? 1 : 0
                  }}
                >
                  <div className="relative">
                    {/* Platform badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 dark:bg-card/70 backdrop-blur-md border border-border/60 dark:border-border/40 shadow-lg`}>
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">{item.platform}</span>
                      </div>
                    </div>
                    
                    {/* Slide preview */}
                    <SlidePreview
                      slide={{
                        id: `showcase-${i}`,
                        type: i === 0 ? 'hook' : i === 1 ? 'content' : 'cta',
                        title: i === 0 
                          ? '5 erreurs qui tuent votre engagement LinkedIn' 
                          : i === 1 
                          ? 'Erreur #1 : Négliger les visuels'
                          : 'Prêt à booster votre reach ?',
                        body: i === 0 
                          ? `Et comment les éviter en ${new Date().getFullYear()}`
                          : i === 1
                          ? 'Les posts avec images génèrent 2x plus d\'engagement'
                          : 'Créez des carrousels qui performent dès aujourd\'hui',
                        bulletPoints: i === 1 ? [
                          'Utilisez des couleurs contrastées',
                          'Ajoutez des graphiques simples',
                          'Gardez une identité visuelle'
                        ] : undefined
                      }}
                      theme={{
                        id: `theme-${i}`,
                        name: `Showcase Theme ${i + 1}`,
                        bgColor: i === 0 ? '#FFFFFF' : i === 1 ? '#0F172A' : '#7C3AED',
                        textColor: i === 0 ? '#0F172A' : i === 1 ? '#FFFFFF' : '#FFFFFF',
                        accentColor: i === 0 ? '#7C3AED' : i === 1 ? '#EC4899' : '#FCD34D',
                        fontFamily: 'var(--font-space-grotesk), sans-serif'
                      }}
                      format={i === 0 ? '1:1' : i === 1 ? '4:5' : '1:1'}
                      slideIndex={i === 0 ? 0 : i === 1 ? 1 : 9}
                      totalSlides={10}
                      authorName={i === 0 ? '@votrenom' : undefined}
                      isThumbnail={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating elements - more subtle in dark mode */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 dark:from-accent/10 dark:to-primary/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}