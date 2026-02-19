'use client';

import Link from 'next/link';
import { ArrowRight, Share2, Linkedin, Instagram, Layers, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Aurora from '@/components/ui/react-bits/Aurora';
import GradientText from '@/components/ui/react-bits/GradientText';
import CountUp from '@/components/ui/react-bits/CountUp';
import SlidePreview from '@/components/SlidePreview';

// Animation variants — toutes les valeurs de timing sont centralisées ici
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

const stagger = {
  container: {
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  },
  cards: {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  },
};

export function HeroSection() {
  const stats = [
    { value: 10,  unit: 'k+', label: 'Carrousels créés' },
    { value: 2,   unit: 'min', label: 'Temps moyen' },
    { value: 98,  unit: '%',  label: 'Satisfaction' },
  ];

  const showcaseItems = [
    { platform: 'LinkedIn',  icon: Linkedin,  index: 0 },
    { platform: 'Instagram', icon: Instagram, index: 1 },
    { platform: 'Multi',     icon: Layers,    index: 2 },
  ];

  return (
    <section className="relative px-6 pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
      {/* ── Aurora + overlays ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={['#7C3AED', '#EC4899', '#FCD34D']}
          blend={0.45}
          amplitude={1.1}
          speed={0.8}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/35 to-background/60 dark:from-background/60 dark:via-background/75 dark:to-background/90" />
        <div className="absolute inset-0 hero-grid-overlay" />
      </div>

      {/* ── Floating orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* ── Text block ── */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={stagger.container}
        >
          {/* Badge */}
          <motion.div variants={variants.fadeUp} className="inline-flex mb-8">
            <Badge className="hero-badge px-4 py-2 text-sm font-semibold gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Nouveau : IA générative intégrée
              <Sparkles className="w-3.5 h-3.5 animate-pulse [animation-delay:500ms]" />
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={variants.fadeUp}
            className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tight"
          >
            <span className="block mb-1">
              <GradientText
                colors={['#7C3AED', '#EC4899', '#FCD34D', '#7C3AED']}
                animationSpeed={8}
                showBorder={false}
                className="drop-shadow-sm"
              >
                Créez des
              </GradientText>
            </span>
            <span className="block text-primary-foreground dark:text-foreground drop-shadow-sm mb-1">
              carrousels
            </span>
            <span className="block">
              <GradientText
                colors={['#FCD34D', '#EC4899', '#7C3AED', '#FCD34D']}
                animationSpeed={8}
                showBorder={false}
                className="drop-shadow-sm"
              >
                inoubliables
              </GradientText>
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={variants.fadeUp}
            className="text-lg md:text-xl text-foreground/75 dark:text-foreground/85 mb-10 max-w-xl mx-auto leading-relaxed font-medium"
          >
            La plateforme de création de carrousels pour{' '}
            <GradientText
              colors={['#7C3AED', '#EC4899', '#FCD34D']}
              animationSpeed={6}
              showBorder={true}
            >
              LinkedIn & Instagram
            </GradientText>
            {' '}design professionnel, exports parfaits
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={variants.fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/create-carousel">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="hero-cta-primary group px-8 py-6 text-base font-bold rounded-2xl">
                  Créer gratuitement
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/examples">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="hero-cta-secondary px-8 py-6 text-base font-semibold rounded-2xl">
                  <Share2 className="mr-2 w-5 h-5" />
                  Voir des exemples
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger.container}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={variants.fadeUp} className="hero-stat-pill">
                <span className="hero-stat-value">
                  <GradientText colors={['#7C3AED', '#EC4899', '#FCD34D']} animationSpeed={5}>
                    <CountUp from={0} to={stat.value} separator="," direction="up" duration={1} className="" />
                    {stat.unit}
                  </GradientText>
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Showcase ── */}
        <motion.div
          className="mt-24"
          initial="hidden"
          animate="visible"
          variants={variants.fadeUp}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-14">
            <p className="hero-eyebrow">Exemples générés par la plateforme</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Des carrousels qui{' '}
              <GradientText colors={['#7C3AED', '#EC4899', '#FCD34D']} animationSpeed={7} showBorder={false}>
                captivent
              </GradientText>
            </h2>
            <p className="text-base md:text-lg text-foreground/65 dark:text-foreground/75 max-w-xl mx-auto">
              Créez des slides professionnels adaptés à chaque plateforme en quelques clics.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hero-cards-glow" />

            <motion.div
              className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={stagger.cards}
            >
              {showcaseItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={variants.fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                  className="hero-showcase-card"
                >
                  {/* Platform badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <div className="hero-platform-badge flex items-center gap-1.5 px-3 py-1.5 rounded-full">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-bold text-foreground">{item.platform}</span>
                    </div>
                  </div>

                  <SlidePreview
                    slide={{
                      id: `showcase-${i}`,
                      type: i === 0 ? 'hook' : i === 1 ? 'content' : 'cta',
                      title:
                        i === 0 ? '5 erreurs qui tuent votre engagement LinkedIn'
                        : i === 1 ? 'Erreur #1 : Négliger les visuels'
                        : 'Prêt à booster votre reach ?',
                      body:
                        i === 0 ? `Et comment les éviter en ${new Date().getFullYear()}`
                        : i === 1 ? "Les posts avec images génèrent 2x plus d'engagement"
                        : "Créez des carrousels qui performent dès aujourd'hui",
                      bulletPoints:
                        i === 1
                          ? ['Utilisez des couleurs contrastées', 'Ajoutez des graphiques simples', 'Gardez une identité visuelle']
                          : undefined,
                    }}
                    theme={{
                      id: `theme-${i}`,
                      name: `Showcase Theme ${i + 1}`,
                      bgColor:     i === 0 ? '#FFFFFF' : i === 1 ? '#0F172A' : '#7C3AED',
                      textColor:   i === 0 ? '#0F172A' : '#FFFFFF',
                      accentColor: i === 0 ? '#7C3AED' : i === 1 ? '#EC4899' : '#FCD34D',
                      fontFamily: 'var(--font-space-grotesk), sans-serif',
                    }}
                    format={i === 1 ? '4:5' : '1:1'}
                    slideIndex={i === 0 ? 0 : i === 1 ? 1 : 9}
                    totalSlides={10}
                    authorName={i === 0 ? '@votrenom' : undefined}
                    isThumbnail={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}