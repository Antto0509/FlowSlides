"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  SlideContent,
  CarouselTheme,
  SlideFormat,
  SocialNetwork,
} from "@/types/carousel";
import SlidePreview from "./SlidePreview";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollableThumbnails } from "./ScrollableThumbnails";
import { ExportFormat } from "./ExportButtons";
import { exportAsPDF, exportAsPNG } from "@/hooks/useExport";
import { toast } from "sonner";
import { EditorHeader } from "./editor/EditorHeader";
import { ThemeSelector } from "./editor/ThemeSelector";
import { SlideActions } from "./editor/SlideActions";
import { ReviewModal } from "./ReviewModal";

interface SlideEditorProps {
  slides: SlideContent[];
  theme: CarouselTheme;
  slideFormat: SlideFormat;
  authorName: string;
  networks: SocialNetwork[];
  planThemeAccess?: "free" | "pro" | "king";
  aiContentEnabled?: boolean;
  regenerationsUsed?: number;
  maxRegenerations?: number;
  isRegenerating?: boolean;
  onSlidesChange: (slides: SlideContent[]) => void;
  onThemeChange: (theme: CarouselTheme) => void;
  onAuthorNameChange: (name: string) => void;
  onBack: () => void;
  onRegenerateSlides?: () => void;
}

export default function SlideEditor({
  slides,
  theme,
  slideFormat,
  authorName,
  networks,
  planThemeAccess = "free",
  aiContentEnabled = false,
  regenerationsUsed = 0,
  maxRegenerations = 0,
  isRegenerating = false,
  onSlidesChange,
  onThemeChange,
  onAuthorNameChange,
  onBack,
  onRegenerateSlides,
}: SlideEditorProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showThemes, setShowThemes] = useState(false);
  const [isExporting, setIsExporting] = useState<ExportFormat | false>(false);
  const [reviewOpen, setReviewOpen] = useState(false);
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
      toast.success("Export réussi !", {
        action: { label: "Laisser un avis", onClick: () => setReviewOpen(true) },
      });
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
      <ReviewModal open={reviewOpen} onOpenChange={setReviewOpen} />
      <EditorHeader
        onBack={onBack}
        showThemes={showThemes}
        onToggleThemes={() => setShowThemes((prev) => !prev)}
        networks={networks}
        isExporting={isExporting}
        onExport={handleExport}
        aiContentEnabled={aiContentEnabled}
        regenerationsUsed={regenerationsUsed}
        maxRegenerations={maxRegenerations}
        isRegenerating={isRegenerating}
        onRegenerateSlides={onRegenerateSlides}
      />

      {showThemes && (
        <ThemeSelector
          theme={theme}
          planThemeAccess={planThemeAccess}
          authorName={authorName}
          onThemeChange={onThemeChange}
          onAuthorNameChange={onAuthorNameChange}
        />
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

          <SlideActions
            slide={safeSlide}
            showImagePlaceholder={showImagePlaceholder}
            onToggleImagePlaceholder={() => setShowImagePlaceholder((prev) => !prev)}
            onToggleBullets={() => toggleBulletsVisibility(activeSlide)}
            onAddBullet={() => addBullet(activeSlide)}
            onChangeImage={() => imageInputRef.current?.click()}
            onRemoveImage={() => setSlideImage(activeSlide, undefined)}
            onImageUpload={handleImageUpload}
            imageInputRef={imageInputRef}
          />

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
