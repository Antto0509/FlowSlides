"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SlidePreview from "@/components/SlidePreview";
import { Button } from "@/components/ui/button";
import { DEFAULT_THEMES } from "@/types/carousel";
import { ArrowLeft, Home } from "lucide-react";

const errorSlides = [
  {
    id: "1",
    type: "hook" as const,
    title: "404",
    body: "Oops! Cette page n'existe pas... 🤷‍♂️",
  },
  {
    id: "2",
    type: "content" as const,
    title: "Perdu(e) ?",
    body: "Pas de panique, on vous ramène à la maison",
    bulletPoints: [
      "La page que vous cherchez n'existe pas",
      "Elle a peut-être été déplacée",
      "Ou vous avez un lien cassé",
    ],
  },
  {
    id: "3",
    type: "cta" as const,
    title: "Retour à l'accueil",
    body: "Créez des carrousels qui cartonnent sur LinkedIn & Instagram",
  },
];

const theme = DEFAULT_THEMES[0];

export default function NotFound() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const changeSlide = (newIndex: number) => {
      if (newIndex === currentSlide) return;
      
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(newIndex);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    };

    // Animation du carrousel
    const slideInterval = setInterval(() => {
      changeSlide((currentSlide + 1) % errorSlides.length);
    }, 4000); // Change de slide toutes les 4 secondes

    // Countdown pour la redirection
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(countdownInterval);
    };
  }, [router, currentSlide]);

  const changeSlide = (newIndex: number) => {
    if (newIndex === currentSlide) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          {/* Left side - Carousel preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 -translate-x-8"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <SlidePreview
                  slide={errorSlides[currentSlide]}
                  theme={theme}
                  format="4:5"
                  slideIndex={currentSlide}
                  totalSlides={errorSlides.length}
                  authorName="FlowSlides"
                />
              </div>
              
              {/* Slide indicators */}
              <div className="flex gap-2 justify-center mt-4">
                {errorSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Aller à la slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Erreur 404
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Page introuvable
              </h1>
              <p className="text-lg text-muted-foreground">
                On dirait que cette page a été swipée un peu trop loin...
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Redirection automatique dans{" "}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
                  {countdown}
                </span>{" "}
                secondes
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/">
                    <Home className="w-4 h-4" />
                    Retour à l&apos;accueil
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Page précédente
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Pendant que vous êtes là...
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Link
                  href="/templates"
                  className="text-sm text-primary hover:underline"
                >
                  Voir les templates
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/pricing"
                  className="text-sm text-primary hover:underline"
                >
                  Tarifs
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/support"
                  className="text-sm text-primary hover:underline"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}