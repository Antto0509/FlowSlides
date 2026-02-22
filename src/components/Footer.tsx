'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  appName: string;
}

const productLinks = [
  { label: 'Exemples', href: '/examples' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'Connexion', href: '/login' },
];

const legalLinks = [
  { label: 'CGU', href: '/terms' },
  { label: 'Mentions légales', href: '/legal' },
  { label: 'Politique de confidentialité', href: '/privacy' },
];

export function Footer({ appName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 pt-12 pb-8 border-t border-border/50 bg-muted/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto max-w-7xl">
        {/* Brand gauche + liens droite */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-4xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-black gradient-text">{appName}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Créez des carrousels LinkedIn & Instagram en quelques minutes.
            </p>
          </div>

          {/* Liens */}
          <div className="flex gap-10">
            {/* Produit */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-bold tracking-widest uppercase text-primary/80">
                Produit
              </p>
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Légal */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-bold tracking-widest uppercase text-primary/80">
                Légal
              </p>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {appName}. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Fait avec ♥ pour les créateurs de contenu
          </p>
        </div>
      </div>
    </footer>
  );
}