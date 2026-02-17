'use client';

import { 
  Palette, 
  Zap, 
  Download, 
  Layers,
  TrendingUp,
  Layout,
  LucideIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: 'Design sur mesure',
    description: 'Personnalisez chaque élément : couleurs, typographie, layouts. Votre identité, votre style.',
    color: 'from-primary to-accent'
  },
  {
    icon: Zap,
    title: 'Création express',
    description: 'De l\'idée au carrousel finalisé en 120 secondes. Interface intuitive, résultats professionnels.',
    color: 'from-accent to-primary'
  },
  {
    icon: Download,
    title: 'Exports optimisés',
    description: 'PDF haute définition, PNG sans perte, formats parfaits pour chaque plateforme sociale.',
    color: 'from-primary/80 to-accent/80'
  },
  {
    icon: Layers,
    title: 'Templates pros',
    description: 'Bibliothèque de modèles conçus par des designers. Personnalisables à 100%.',
    color: 'from-accent/90 to-primary/90'
  },
  {
    icon: TrendingUp,
    title: 'Performance garantie',
    description: 'Designs optimisés pour l\'engagement. Augmentez votre reach naturellement.',
    color: 'from-primary to-accent/70'
  },
  {
    icon: Layout,
    title: 'Multi-plateforme',
    description: 'LinkedIn, Instagram, ou les deux. Dimensions et formats adaptés automatiquement.',
    color: 'from-accent to-primary/80'
  }
];

export function FeaturesSection() {
  return (
    <section className="relative px-6 py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Tout pour <span className="gradient-text">réussir</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des fonctionnalités pensées pour les créateurs de contenu qui veulent se démarquer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card 
              key={i}
              className="group relative p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}