"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SlideContent,
  CarouselTheme,
  SlideFormat,
  DEFAULT_THEMES,
} from "@/types/carousel";
import SlidePreview from "./SlidePreview";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Download,
  Palette,
} from "lucide-react";

interface SlideEditorProps {
  slides: SlideContent[];
  theme: CarouselTheme;
  format: SlideFormat;
  authorName: string;
  onSlidesChange: (slides: SlideContent[]) => void;
  onThemeChange: (theme: CarouselTheme) => void;
  onBack: () => void;
}

export default function SlideEditor({
  slides,
  theme,
  format,
  authorName,
  onSlidesChange,
  onThemeChange,
  onBack,
}: SlideEditorProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showThemes, setShowThemes] = useState(false);

  const updateSlide = (
    index: number,
    field: "title" | "body",
    value: string
  ) => {
    const updated = [...slides];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onSlidesChange(updated);
  };

  const updateBullet = (slideIndex: number, bulletIndex: number, value: string) => {
    const updated = [...slides];
    const current = updated[slideIndex];

    const bullets = [...(current.bulletPoints ?? [])];
    bullets[bulletIndex] = value;

    updated[slideIndex] = {
      ...current,
      bulletPoints: bullets,
    };

    onSlidesChange(updated);
  };

  const safeSlide =
    slides.length > 0 ? slides[activeSlide] : null;

  if (!safeSlide) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Aucun slide disponible.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Éditez vos{" "}
              <span className="gradient-text">slides</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Cliquez sur le texte pour le modifier
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowThemes((prev) => !prev)}
            className="gap-2"
          >
            <Palette className="w-4 h-4" />
            Thèmes
          </Button>

          <Button
            className="gap-2 gradient-primary border-0"
            type="button"
          >
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Theme selector */}
      {showThemes && (
        <div className="flex gap-3 p-4 rounded-xl bg-card border animate-in fade-in slide-in-from-top-2 duration-200">
          {DEFAULT_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t)}
              className={cn(
                "w-12 h-12 rounded-lg border-2 transition-all duration-200 relative overflow-hidden",
                theme.id === t.id
                  ? "border-primary scale-110 shadow-lg"
                  : "border-transparent hover:border-primary/30"
              )}
              title={t.name}
              type="button"
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: t.bgColor }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: t.accentColor }}
              />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-3 max-h-150 overflow-y-auto p-2 *:shrink-0 *:border *:border-muted rounded-xl">
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

        {/* Main preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full flex justify-center">
            <SlidePreview
              slide={safeSlide}
              theme={theme}
              format={format}
              slideIndex={activeSlide}
              totalSlides={slides.length}
              authorName={authorName}
              onEditTitle={(val) =>
                updateSlide(activeSlide, "title", val)
              }
              onEditBody={(val) =>
                updateSlide(activeSlide, "body", val)
              }
              onEditBulletPoint={(bulletIndex, val) =>
                updateBullet(activeSlide, bulletIndex, val)
              }
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setActiveSlide((prev) =>
                  Math.max(0, prev - 1)
                )
              }
              disabled={activeSlide === 0}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <span className="text-sm font-medium text-muted-foreground">
              {activeSlide + 1} / {slides.length}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setActiveSlide((prev) =>
                  Math.min(slides.length - 1, prev + 1)
                )
              }
              disabled={
                activeSlide === slides.length - 1
              }
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
