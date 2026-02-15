"use client";

import { useRef, useState, useEffect } from "react";
import SlidePreview from "./SlidePreview";
import {
  SlideContent,
  CarouselTheme,
  SlideFormat
} from "@/types/carousel";

interface ScrollableThumbnailsProps {
  slides: SlideContent[];
  theme: CarouselTheme;
  format: SlideFormat;
  authorName: string;
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

export function ScrollableThumbnails({
  slides,
  theme,
  format,
  authorName,
  activeSlide,
  setActiveSlide,
}: ScrollableThumbnailsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    // Afficher le fade du haut si on a scrollé vers le bas
    setShowTopFade(scrollTop > 10);

    // Afficher le fade du bas s'il reste du contenu en dessous
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 10);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Vérifier l'état initial
    handleScroll();

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [slides]);

  return (
    <div className="relative">
      {/* Fade gradient en haut */}
      <div
        className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 rounded-t-xl ${
          showTopFade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Container scrollable */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-3 max-h-[600px] overflow-y-auto p-4 *:shrink-0 *:border *:border-muted rounded-xl"
      >
        {slides.map((slide, index) => (
          <SlidePreview
            key={slide.id}
            slide={slide}
            theme={theme}
            format={format}
            slideIndex={index}
            totalSlides={slides.length}
            authorName={authorName}
            isActive={index === activeSlide}
            isThumbnail
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>

      {/* Fade gradient en bas */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 rounded-b-xl ${
          showBottomFade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}