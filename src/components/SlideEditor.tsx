"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SlideContent,
  CarouselTheme,
  SlideFormat,
  SocialNetwork,
  DEFAULT_THEMES,
} from "@/types/carousel";
import SlidePreview from "./SlidePreview";
import { ArrowLeft, ArrowRight, ChevronLeft, Eye, EyeOff, ImageOff, ImagePlus, ListPlus, Lock, Palette } from "lucide-react";
import { ScrollableThumbnails } from "./ScrollableThumbnails";
import { ExportButtons, ExportFormat } from "./ExportButtons";
import { exportAsPDF, exportAsPNG } from "@/hooks/useExport";
import { toast } from "sonner";
import { canAccessTheme } from "@/types/pricing";

interface SlideEditorProps {
  slides: SlideContent[];
  theme: CarouselTheme;
  slideFormat: SlideFormat;
  authorName: string;
  networks: SocialNetwork[];
  planThemeAccess?: "free" | "pro" | "king";
  onSlidesChange: (slides: SlideContent[]) => void;
  onThemeChange: (theme: CarouselTheme) => void;
  onBack: () => void;
}

export default function SlideEditor({
  slides,
  theme,
  slideFormat,
  authorName,
  networks,
  planThemeAccess = "free",
  onSlidesChange,
  onThemeChange,
  onBack,
}: SlideEditorProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showThemes, setShowThemes] = useState(false);
  const [isExporting, setIsExporting] = useState<ExportFormat | false>(false);
  const [showImagePlaceholder, setShowImagePlaceholder] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Réinitialise le placeholder quand on change de slide
  useEffect(() => {
    setShowImagePlaceholder(false);
  }, [activeSlide]);

  // — Édition des slides —

  const updateSlide = (index: number, field: "title" | "body", value: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    onSlidesChange(updated);
  };

  const updateBullet = (slideIndex: number, bulletIndex: number, value: string) => {
    const updated = [...slides];
    const current = updated[slideIndex];
    const bullets = [...(current.bulletPoints ?? [])];
    bullets[bulletIndex] = value;
    updated[slideIndex] = { ...current, bulletPoints: bullets };
    onSlidesChange(updated);
  };

  const toggleBulletsVisibility = (index: number) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], bulletPointsHidden: !updated[index].bulletPointsHidden };
    onSlidesChange(updated);
  };

  const removeBulletAt = (slideIndex: number, bulletIndex: number) => {
    const updated = [...slides];
    const current = updated[slideIndex];
    const bullets = (current.bulletPoints ?? []).filter((_, i) => i !== bulletIndex);
    updated[slideIndex] = { ...current, bulletPoints: bullets };
    onSlidesChange(updated);
  };

  const MAX_BULLETS = 5;

  const addBullet = (index: number) => {
    const current = slides[index];
    if ((current.bulletPoints ?? []).length >= MAX_BULLETS) {
      toast.error(`Maximum ${MAX_BULLETS} bullets par slide`);
      return;
    }
    const updated = [...slides];
    const bullets = [...(current.bulletPoints ?? []), "Nouveau point"];
    updated[index] = { ...current, bulletPoints: bullets, bulletPointsHidden: false };
    onSlidesChange(updated);
  };

  const setSlideImage = (index: number, imageUrl: string | undefined) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], imageUrl };
    onSlidesChange(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSlideImage(activeSlide, reader.result as string);
      setShowImagePlaceholder(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // — Export —

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(format);
    try {
      if (format === "pdf") {
        await exportAsPDF(slides, theme, slideFormat, authorName);
      } else {
        await exportAsPNG(slides, theme, slideFormat, authorName);
      }
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Une erreur est survenue lors de l'export. Veuillez réessayer.");
    } finally {
      setIsExporting(false);
    }
  };

  // — Garde-fou —

  const safeSlide = slides.length > 0 ? slides[activeSlide] : null;
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
              Éditez vos <span className="gradient-text">slides</span>
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

          <ExportButtons
            networks={networks}
            isExporting={isExporting}
            onExport={handleExport}
          />
        </div>
      </div>

      {/* Theme selector */}
      {showThemes && (
        <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-card border animate-in fade-in slide-in-from-top-2 duration-200">
          {DEFAULT_THEMES.map((t) => {
            const isLocked = !canAccessTheme(planThemeAccess, t.tier);
            const planLabel = t.tier === "king" ? "King" : "Pro";
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (isLocked) {
                    toast.error(`Thème réservé au plan ${planLabel}`, {
                      action: { label: "Voir les plans", onClick: () => window.location.href = "/pricing" },
                    });
                    return;
                  }
                  onThemeChange(t);
                }}
                className={cn(
                  "w-12 h-12 rounded-lg border-2 transition-all duration-200 relative overflow-hidden",
                  theme.id === t.id
                    ? "border-primary scale-110 shadow-lg"
                    : "border-transparent hover:border-primary/30",
                  isLocked && "opacity-50 cursor-not-allowed"
                )}
                title={isLocked ? `Plan ${planLabel} requis` : t.name}
                type="button"
              >
                <div className="absolute inset-0" style={{ backgroundColor: t.bgColor }} />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: t.accentColor }}
                />
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        {/* Thumbnails */}
        <div className="hidden lg:block">
          <ScrollableThumbnails
            slides={slides}
            theme={theme}
            format={slideFormat}
            authorName={authorName}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
          />
        </div>

        {/* Main preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full flex justify-center" ref={slideContainerRef}>
            <SlidePreview
              slide={safeSlide}
              theme={theme}
              format={slideFormat}
              slideIndex={activeSlide}
              totalSlides={slides.length}
              authorName={authorName}
              onEditTitle={(val) => updateSlide(activeSlide, "title", val)}
              onEditBody={(val) => updateSlide(activeSlide, "body", val)}
              onEditBulletPoint={(bulletIndex, val) =>
                updateBullet(activeSlide, bulletIndex, val)
              }
              onRemoveBulletPoint={(bulletIndex) =>
                removeBulletAt(activeSlide, bulletIndex)
              }
              onAddImage={showImagePlaceholder ? () => imageInputRef.current?.click() : undefined}
            />
          </div>

          {/* Slide actions */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {safeSlide.type !== "hook" && (safeSlide.bulletPoints ?? []).length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleBulletsVisibility(activeSlide)}
                className="gap-2"
              >
                {safeSlide.bulletPointsHidden
                  ? <><Eye className="w-4 h-4" /> Afficher les bullets ({(safeSlide.bulletPoints ?? []).length})</>
                  : <><EyeOff className="w-4 h-4" /> Masquer les bullets</>
                }
              </Button>
            )}
            {safeSlide.type !== "hook" && !safeSlide.bulletPointsHidden && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBullet(activeSlide)}
                className="gap-2"
              >
                <ListPlus className="w-4 h-4" />
                Ajouter un bullet
              </Button>
            )}
            {safeSlide.imageUrl ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                  className="gap-2"
                >
                  <ImagePlus className="w-4 h-4" />
                  Changer l'image
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSlideImage(activeSlide, undefined)}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <ImageOff className="w-4 h-4" />
                  Retirer l'image
                </Button>
              </>
            ) : (
              <Button
                variant={showImagePlaceholder ? "default" : "outline"}
                size="sm"
                onClick={() => setShowImagePlaceholder((prev) => !prev)}
                className="gap-2"
              >
                <ImagePlus className="w-4 h-4" />
                {showImagePlaceholder ? "Annuler" : "Ajouter une image"}
              </Button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
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
                setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))
              }
              disabled={activeSlide === slides.length - 1}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}