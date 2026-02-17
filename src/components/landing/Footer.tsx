'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  appName: string;
}

export function Footer({ appName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 py-12 border-t border-border/50 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-4xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">{appName}</span>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              À propos
            </Link>
            <Link href="/features" className="hover:text-foreground transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Tarifs
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} {appName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}