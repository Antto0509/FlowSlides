'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/ui/mode-toggle';

interface NavigationProps {
  appName?: string;
  mounted: boolean;
}

export function Navigation({ appName = 'CarouselGen', mounted }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative z-50">
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[60%] max-w-7xl transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <div 
          className={`
            backdrop-blur-xl bg-background/70 border border-border/40
            rounded-2xl shadow-lg
            transition-all duration-500
            ${scrolled ? 'shadow-xl bg-background/80 border-border/60' : 'shadow-md'}
          `}
        >
          <div className="px-6 py-3.5">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-4xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-4xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <span className="text-xl font-bold gradient-text">{appName}</span>
              </Link>
              
              <div className="flex items-center gap-6">
                <Link 
                  href="/pricing" 
                  className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Tarifs
                </Link>
                <Link 
                  href="/examples" 
                  className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Exemples
                </Link>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300"
                >
                  Connexion
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}