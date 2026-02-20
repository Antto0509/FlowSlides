"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/examples/ExampleCard";
import { Navigation } from "@/components/landing/Navigation";
import { NetworkFilter } from "@/types/example";
import { EXAMPLES } from "@/lib/examples";
import { Sparkles, Linkedin, Instagram, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExamplesPage() {
  const [filter, setFilter] = useState<NetworkFilter>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered =
    filter === "all" ? EXAMPLES : EXAMPLES.filter((e) => e.network === filter);

  const filters: {
    value: NetworkFilter;
    label: string;
    icon?: React.ReactNode;
  }[] = [
    { value: "all", label: "Tous les exemples" },
    { value: "linkedin", label: "LinkedIn", icon: <Linkedin className="w-3.5 h-3.5" /> },
    { value: "instagram", label: "Instagram", icon: <Instagram className="w-3.5 h-3.5" /> },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation appName="FlowSlides" mounted={mounted} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-35 pb-16 px-4">
        <div className="hero-orb hero-orb--1 opacity-60" />
        <div className="hero-orb hero-orb--2 opacity-50" />
        <div className="hero-grid-overlay absolute inset-0" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mx-auto"
          >
            <Star className="w-4 h-4" />
            Inspirez-vous des meilleurs
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            Des carousels qui{" "}
            <span className="gradient-text">performent vraiment</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Découvrez des exemples concrets créés avec FlowSlides. Naviguez dans
            chaque carousel, trouvez votre inspiration, et créez le vôtre en quelques clics.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                className="hero-cta-primary gap-2 px-8 h-12 text-base"
              >
                <Link href="/create-carousel">
                  <Sparkles className="w-5 h-5" />
                  Créer mon carousel
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setFilter(f.value)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border relative",
                  filter === f.value
                    ? "text-primary-foreground border-primary"
                    : "bg-secondary/60 text-secondary-foreground border-transparent hover:border-border hover:bg-secondary"
                )}
              >
                {/* Pill background animé */}
                {filter === f.value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5 z-10">
                  {f.icon}
                  {f.label}
                </span>
              </motion.button>
            ))}
          </div>

          <motion.span
            key={filtered.length}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            {filtered.length} exemple{filtered.length > 1 ? "s" : ""}
          </motion.span>
        </div>
      </motion.section>

      {/* ── Grid ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          layout
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((example, index) => (
              <ExampleCard key={example.id} example={example} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center py-24 text-muted-foreground"
            >
              <p className="text-lg">Aucun exemple pour ce filtre.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="hero-orb hero-orb--2 opacity-30" />
        <div className="relative max-w-3xl mx-auto text-center px-4 py-20 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl font-bold tracking-tight"
          >
            Prêt à créer votre{" "}
            <span className="gradient-text">prochain hit</span> ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-muted-foreground"
          >
            Décrivez votre sujet, choisissez votre ton, et FlowSlides génère un
            carousel prêt à publier en moins d&apos;une minute.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                className="hero-cta-primary gap-2 px-10 h-12 text-base"
              >
                <Link href="/create-carousel">
                  <Sparkles className="w-5 h-5" />
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}