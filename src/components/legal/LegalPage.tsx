"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LegalSection {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Remplace les emails et URLs dans un texte par des liens cliquables */
export function renderWithEmails(text: string) {
  const pattern = /(\S+@\S+\.\S+|https?:\/\/[^\s]+)/g;
  return text.split(pattern).map((part, i) => {
    if (/\S+@\S+\.\S+/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-primary hover:underline">
          {part}
        </a>
      );
    }
    if (/^https?:\/\/flow-slides\.reelium\.fr/.test(part)) {
      return (
        <Link key={i} href={part.replace(/^https?:\/\//, "")} className="text-primary hover:underline">
          {part.replace(/^https?:\/\//, "")}
        </Link>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Barre de navigation sticky en haut */
export function LegalTopBar({ updatedAt }: { updatedAt: string }) {
  return (
    <div className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-20 bg-background/80">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        <span className="text-xs text-muted-foreground">
          Dernière mise à jour : {updatedAt}
        </span>
      </div>
    </div>
  );
}

/** Hero animé avec badge, titre et sous-titre */
export function LegalHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  titleAccent,
  subtitle,
}: {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  titleAccent: string;
  subtitle: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb--1 opacity-40" />
        <div className="hero-orb hero-orb--2 opacity-30" />
        <div className="hero-grid-overlay absolute inset-0" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 hero-badge px-4 py-2 rounded-full text-sm font-semibold mb-6"
        >
          <BadgeIcon className="w-4 h-4" />
          {badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight mb-4"
        >
          {title}{" "}
          <span className="gradient-text">{titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

/** Sidebar avec sommaire des sections */
export function LegalSidebar({ sections }: { sections: LegalSection[] }) {
  return (
    <aside className="hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="sticky top-24 space-y-1"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-3">
          Sommaire
        </p>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-150"
          >
            <section.icon className="w-3.5 h-3.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors" />
            <span className="truncate">{section.title}</span>
          </a>
        ))}
      </motion.div>
    </aside>
  );
}

/** Card d'introduction animée */
export function LegalIntroCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="p-6 rounded-2xl bg-primary/5 border border-primary/15"
    >
      <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
    </motion.div>
  );
}

/** Une section de contenu légal avec titre, icône et paragraphes/bullets */
export function LegalSection({
  section,
  index,
}: {
  section: LegalSection;
  index: number;
}) {
  return (
    <motion.section
      id={section.id}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-4xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.55 0.2 285 / 12%)" }}
        >
          <section.icon className="w-4 h-4" style={{ color: "oklch(0.55 0.2 285)" }} />
        </div>
        <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
      </div>

      <div className="pl-12 space-y-4">
        {section.content.split("\n\n").map((paragraph, i) => {
          const lines = paragraph.split("\n");
          const isBulletBlock = lines.every((l) => l.startsWith("— "));

          if (isBulletBlock) {
            return (
              <ul key={i} className="space-y-2">
                {lines.map((line, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-[0.9375rem] text-muted-foreground leading-relaxed"
                  >
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "oklch(0.55 0.2 285)" }}
                    />
                    <span>{renderWithEmails(line.replace("— ", ""))}</span>
                  </li>
                ))}
              </ul>
            );
          }

          // Paragraphe avec potentiels \n simples → on insère des <br />
          return (
            <p key={i} className="text-muted-foreground leading-relaxed text-[0.9375rem]">
              {lines.map((line, j) => (
                <span key={j}>
                  {renderWithEmails(line)}
                  {j < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          );
        })}
      </div>

      <div className="mt-8 h-px bg-border/50" />
    </motion.section>
  );
}

/** Card de contact en bas de page */
export function LegalContactCard({
  title,
  description,
  email,
  cta,
}: {
  title: string;
  description: string;
  email: string;
  cta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border/60 bg-card p-8 text-center space-y-3"
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl"
        style={{
          background: "linear-gradient(135deg, oklch(0.55 0.2 285), oklch(0.6 0.18 310))",
          color: "white",
        }}
      >
        {cta}
      </a>
    </motion.div>
  );
}

/** Layout principal : sidebar + main */
export function LegalLayout({
  sections,
  children,
}: {
  sections: LegalSection[];
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <LegalSidebar sections={sections} />
        <main className="space-y-12">{children}</main>
      </div>
    </div>
  );
}