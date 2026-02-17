'use client';

import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "J'ai doublé mon engagement LinkedIn en utilisant ces carrousels. L'interface est incroyablement intuitive.",
    author: "Marie Dubois",
    role: "Content Creator"
  },
  {
    quote: "Fini les heures sur Canva. Je crée des carrousels pro en quelques minutes. Game changer total.",
    author: "Thomas Laurent",
    role: "Social Media Manager"
  },
  {
    quote: "Les templates sont magnifiques et la personnalisation est sans limites. Exactement ce que je cherchais.",
    author: "Sophie Martin",
    role: "Marketing Lead"
  }
];

interface TestimonialsSectionProps {
  appName: string;
}

export function TestimonialsSection({ appName }: TestimonialsSectionProps) {
  return (
    <section className="relative px-6 py-16 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Ils créent déjà avec <span className="gradient-text">{appName}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card 
              key={i}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500"
            >
              <div className="flex items-start gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Sparkles key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground mb-5 leading-relaxed italic text-sm">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-bold text-foreground text-sm">{testimonial.author}</div>
                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}