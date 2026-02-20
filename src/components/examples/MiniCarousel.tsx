"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlidePreview from "@/components/SlidePreview";
import { ExampleCarousel } from "@/types/example";
import { cn } from "@/lib/utils";

interface MiniCarouselProps {
  example: ExampleCarousel;
}

export function MiniCarousel({ example }: MiniCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prev = () => {
    if (activeIndex === 0) return;
    setDirection(-1);
    setActiveIndex((i) => i - 1);
  };

  const next = () => {
    if (activeIndex === example.slides.length - 1) return;
    setDirection(1);
    setActiveIndex((i) => i + 1);
  };

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.97,
    }),
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full h-full">
      {/* Zone slide — occupe tout l'espace dispo de la preview area (280px) */}
      <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
        {/* Boîte clippée aux dimensions exactes du slide réduit */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            width: 160,
            height: example.format === "4:5" ? Math.round(291 * (5 / 4) * 0.55) : Math.round(291 * 0.55),
          }}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              {/* SlidePreview rendu à 291px puis réduit à 160px via scale(0.55) — meilleure lisibilité */}
              <div
                style={{
                  width: 291,
                  transformOrigin: "top left",
                  transform: "scale(0.55)",
                  pointerEvents: "none",
                }}
              >
                <SlidePreview
                  slide={example.slides[activeIndex]}
                  theme={example.theme}
                  format={example.format}
                  slideIndex={activeIndex}
                  totalSlides={example.slides.length}
                  authorName="FlowSlides"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={prev}
          disabled={activeIndex === 0}
          whileTap={{ scale: 0.88 }}
          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-1.5 items-center">
          {example.slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === activeIndex ? 16 : 6,
                backgroundColor:
                  i === activeIndex
                    ? "oklch(0.55 0.2 285)"
                    : "oklch(0.54 0.03 280 / 30%)",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-1.5 rounded-full cursor-pointer"
              style={{ minWidth: 6 }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          disabled={activeIndex === example.slides.length - 1}
          whileTap={{ scale: 0.88 }}
          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}