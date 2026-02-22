"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlanCard } from "@/components/pricing/PlanCard";
import { PLANS, FAQS } from "@/types/pricing";
import { cubicBezier, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: cubicBezier(0.22, 1, 0.36, 1) },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [mounted, setMounted] = useState(false);

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  const reassuranceRef = useRef(null);
  const reassuranceInView = useInView(reassuranceRef, { once: true, margin: "-60px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation appName="FlowSlides" mounted={mounted} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-35 pb-16 px-4">
        <motion.div
          className="hero-orb hero-orb--1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div
          className="hero-orb hero-orb--2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
        />
        <div className="hero-grid-overlay absolute inset-0" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Tarifs simples, sans surprise
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-5xl sm:text-6xl font-bold tracking-tight"
          >
            Choisissez votre{" "}
            <span className="gradient-text">plan</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-muted-foreground text-xl max-w-xl mx-auto"
          >
            Créez des carrousels viraux avec l&apos;IA. Commencez gratuitement,
            scalez quand vous êtes prêt.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="inline-flex items-center gap-1 bg-secondary/60 border border-border rounded-full p-1.5"
          >
            <Button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                !annual
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Mensuel
            </Button>
            <Button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                annual
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Annuel
              <motion.span
                layout
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-semibold transition-colors",
                  annual
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                -20 %
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Plans grid ── */}
      <section className="relative z-10 px-4 pt-15 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              annual={annual}
              animationDelay={i * 100}
            />
          ))}
        </div>
      </section>

      {/* ── Reassurance ── */}
      <section ref={reassuranceRef} className="px-4 pb-20 max-w-2xl mx-auto text-center">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={reassuranceInView ? "visible" : "hidden"}
          custom={0.1}
          className="text-muted-foreground text-sm"
        >
          Tous les plans incluent le générateur IA, les formats LinkedIn &amp; Instagram,
          les exports haute résolution et les formats 4:5 et 1:1.
        </motion.p>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="px-4 pb-24 max-w-2xl mx-auto space-y-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          custom={0}
          className="text-3xl font-bold tracking-tight text-center"
        >
          Questions fréquentes
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {FAQS.map((faq) => (
            <motion.div
              key={faq.q}
              variants={staggerItem}
              className="p-6 rounded-2xl bg-card border border-border/60 space-y-2"
            >
              <p className="font-semibold">{faq.q}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Bottom CTA ── */}
      <section ref={ctaRef} className="px-4 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          custom={0}
          className="max-w-2xl mx-auto text-center rounded-3xl border border-primary/20 bg-card p-12 space-y-6 relative overflow-hidden"
        >
          <motion.div
            className="hero-orb absolute -top-20 -right-20 w-64 h-64 opacity-30"
            style={{ background: "var(--hero-orb-primary)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ctaInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="relative z-10 space-y-4">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              custom={0.1}
              className="text-3xl font-bold tracking-tight"
            >
              Prêt à créer votre premier{" "}
              <span className="gradient-text">carrousel viral ?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              custom={0.2}
              className="text-muted-foreground"
            >
              Rejoignez des milliers de créateurs qui utilisent FlowSlides chaque semaine.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              custom={0.3}
              className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
            >
              <Link href="/create-carousel">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="hero-cta-primary h-12 px-8 font-semibold border-0 gap-2"
                  >
                    Commencer gratuitement
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/examples">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="hero-cta-secondary h-12 px-8 font-semibold"
                  >
                    Voir des exemples
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer appName="FlowSlides" />
    </main>
  );
}