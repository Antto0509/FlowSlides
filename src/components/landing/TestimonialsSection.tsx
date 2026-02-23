'use client';

import { Sparkles } from 'lucide-react';
import { motion, useInView, cubicBezier } from 'motion/react';
import { useRef } from 'react';
import GradientText from '@/components/ui/react-bits/GradientText';
import GlareHover from '@/components/ui/react-bits/GlareHover';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  glareColor: `#${string}`;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "J'ai doublé mon engagement LinkedIn en utilisant ces carrousels. L'interface est incroyablement intuitive et les résultats sont au rendez-vous dès la première semaine.",
    author: 'Marie Dubois',
    role: 'Content Creator',
    company: 'Freelance',
    glareColor: '#7C3AED',
    avatar: 'MD',
  },
  {
    quote: "Fini les heures sur Canva. Je crée des carrousels pro en quelques minutes. Game changer total pour mon workflow et ma présence sur les réseaux.",
    author: 'Thomas Laurent',
    role: 'Social Media Manager',
    company: 'Agence Bloom',
    glareColor: '#EC4899',
    avatar: 'TL',
  },
  {
    quote: "Les templates sont magnifiques et la personnalisation est sans limites. Exactement ce que je cherchais pour scaler ma stratégie de contenu.",
    author: 'Sophie Martin',
    role: 'Marketing Lead',
    company: 'TechStart',
    glareColor: '#FCD34D',
    avatar: 'SM',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cubicBezier(0.42, 0, 0.58, 1) } },
};

interface TestimonialsSectionProps {
  appName: string;
}

export function TestimonialsSection({ appName }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          className="text-center mb-12"
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={headingVariants}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-primary/80 mb-3">
            Témoignages
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Ils créent déjà avec{' '}
            <GradientText colors={['#7C3AED', '#EC4899', '#FCD34D']} animationSpeed={7} showBorder={false}>
              {appName}
            </GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Des créateurs de contenu qui ont transformé leur présence en ligne.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={sectionRef}
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            >
              <GlareHover
                width="100%"
                height="auto"
                glareColor={t.glareColor}
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="!bg-card/60 dark:!bg-card/80 !border-border/60 dark:!border-border/40 hover:!border-primary/30 dark:hover:!border-primary/40 hover:!shadow-lg hover:!shadow-primary/10 !transition-all !duration-300 !rounded-xl !flex !flex-col !items-start !p-6"
              >
                {/* Étoiles */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Sparkles key={j} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>

                {/* Citation */}
                <p className="text-foreground leading-relaxed italic mb-6 text-base md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Auteur */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-black shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{t.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}