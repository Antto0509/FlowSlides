'use client';

import {
  Palette,
  Zap,
  Download,
  Layers,
  TrendingUp,
  Layout,
  LucideIcon,
} from 'lucide-react';
import { motion, useInView, cubicBezier } from 'motion/react';
import { useRef } from 'react';
import GradientText from '@/components/ui/react-bits/GradientText';
import SpotlightCard from '@/components/ui/react-bits/SpotlightCard';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
  wide?: boolean;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: 'Design sur mesure',
    description: 'Personnalisez chaque élément : couleurs, typographie, layouts. Votre identité, votre style.',
    spotlightColor: 'rgba(124, 58, 237, 0.2)',
  },
  {
    icon: Zap,
    title: 'Création express',
    description: "De l'idée au carrousel finalisé en 120 secondes. Interface intuitive, résultats professionnels.",
    spotlightColor: 'rgba(236, 72, 153, 0.2)',
    wide: true,
  },
  {
    icon: Download,
    title: 'Exports optimisés',
    description: 'PDF haute définition, PNG sans perte. Formats parfaits pour chaque plateforme sociale.',
    spotlightColor: 'rgba(124, 58, 237, 0.2)',
  },
  {
    icon: Layers,
    title: 'Templates pros',
    description: 'Bibliothèque de modèles conçus par des designers. Personnalisables à 100%.',
    spotlightColor: 'rgba(252, 211, 77, 0.15)',
    wide: true,
  },
  {
    icon: TrendingUp,
    title: 'Performance garantie',
    description: "Designs optimisés pour l'engagement. Augmentez votre reach naturellement.",
    spotlightColor: 'rgba(236, 72, 153, 0.2)',
  },
  {
    icon: Layout,
    title: 'Multi-plateforme',
    description: 'LinkedIn, Instagram, ou les deux. Dimensions et formats adaptés automatiquement.',
    spotlightColor: 'rgba(124, 58, 237, 0.2)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 bg-linear-to-b from-muted/30 to-transparent"
    >
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headingVariants}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-primary/80 mb-3">
            Fonctionnalités
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Tout pour{' '}
            <GradientText colors={['#7C3AED', '#EC4899', '#FCD34D']} animationSpeed={7} showBorder={false}>
              réussir
            </GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des fonctionnalités pensées pour les créateurs de contenu qui veulent se démarquer.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={feature.wide ? 'lg:col-span-1' : ''}
            >
              <SpotlightCard
                spotlightColor={feature.spotlightColor}
                className="h-full !p-7 !bg-card/60 dark:!bg-card/80 !border-border/60 dark:!border-border/40 hover:!border-primary/30 dark:hover:!border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300"
              >
                {/* Icon */}
                <motion.div
                  className="flex items-center justify-center size-13 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 mb-5 shrink-0"
                  whileHover={{ scale: 1.1, rotate: 4, transition: { duration: 0.22 } }}
                >
                  <feature.icon className="size-6 text-primary-foreground" />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}