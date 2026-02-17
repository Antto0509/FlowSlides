'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CTASection() {
  return (
    <section className="relative px-6 py-16 md:py-20">
      <div className="container mx-auto max-w-5xl">
        <Card className="relative overflow-hidden p-12 md:p-16 bg-gradient-to-br from-primary via-accent to-primary border-0 shadow-2xl">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Prêt à transformer
              <br />
              votre contenu ?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Rejoignez des milliers de créateurs qui boostent leur présence sociale avec des carrousels qui marquent les esprits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/create-carousel">
                <Button 
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 px-10 py-6 text-base font-bold rounded-xl shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Actif en 30 secondes</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}