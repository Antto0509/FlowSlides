'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/ui/mode-toggle';

interface NavigationProps {
  appName?: string;
  mounted: boolean;
}

const navLinks = [
  { label: 'Exemples', href: '/examples' },
  { label: 'Tarifs', href: '/pricing' },
];

export function Navigation({ appName = 'CarouselGen', mounted }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le menu au resize vers desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="relative z-50">
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[70%] max-w-2xl transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        {/* Pill */}
        <div
          className={`
            backdrop-blur-xl bg-background/70 border border-border/40 rounded-2xl
            transition-all duration-500
            ${scrolled ? 'shadow-xl bg-background/80 border-border/60' : 'shadow-md'}
          `}
        >
          <div className="px-4 sm:px-6 py-3.5">
            <div className="flex items-center justify-between">

              {/* Brand */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <span className="text-lg font-black gradient-text">{appName}</span>
              </Link>

              {/* Desktop links */}
              <div className="hidden sm:flex items-center gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300"
                  asChild
                >
                  <Link href="/login">Connexion</Link>
                </Button>
                <ModeToggle />
              </div>

              {/* Mobile right side */}
              <div className="flex sm:hidden items-center gap-2">
                <ModeToggle />
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                  aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden sm:hidden"
              >
                <div className="px-4 pb-4 pt-1 flex flex-col gap-1 border-t border-border/30">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.22 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.06, duration: 0.22 }}
                    className="pt-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300"
                      asChild
                    >
                      <Link href="/login" onClick={() => setMenuOpen(false)}>
                        Connexion
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}