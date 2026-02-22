'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { motion, useInView, cubicBezier } from 'motion/react';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import StarBorder from '@/components/ui/react-bits/StarBorder';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-6 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          <Card className="relative overflow-hidden p-12 md:p-16 bg-gradient-to-br from-primary via-accent to-primary border-0 shadow-2xl shadow-primary/30">
            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Glow orbs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              className="relative z-10 text-center text-primary-foreground"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
            >
              {/* Heading */}
              <motion.h2
                variants={childVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight"
              >
                Prêt à transformer
                <br />
                votre contenu ?
              </motion.h2>

              {/* Subline */}
              <motion.p
                variants={childVariants}
                className="text-lg mb-10 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed"
              >
                Rejoignez des milliers de créateurs qui boostent leur présence sociale avec des carrousels qui marquent les esprits.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={childVariants}
                className="flex justify-center mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/create-carousel">
                    <StarBorder
                      as="div"
                      color="magenta"
                      speed="4s"
                      thickness={4}
                      className="cursor-pointer [&>div]:bg-none [&>div]:bg-background [&>div]:text-foreground [&>div]:border-background/20 [&>div]:rounded-2xl [&>div]:px-8 [&>div]:py-4 [&>div]:text-base [&>div]:font-bold"
                    >
                      <span className="flex items-center gap-2">
                        Commencer maintenant
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </StarBorder>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Reassurance */}
              <motion.div
                variants={childVariants}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Sans carte bancaire</span>
                </div>
                <div className="w-px h-4 bg-primary-foreground/30 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Actif en 30 secondes</span>
                </div>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}