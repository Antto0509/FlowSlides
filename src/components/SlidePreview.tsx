"use client";

import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SlideContent,
  CarouselTheme,
  SlideFormat,
} from "@/types/carousel";

interface SlidePreviewProps {
  slide: SlideContent;
  theme: CarouselTheme;
  format: SlideFormat;
  slideIndex: number;
  totalSlides: number;
  authorName?: string;
  isActive?: boolean;
  isThumbnail?: boolean;
  onClick?: () => void;
  onEditTitle?: (value: string) => void;
  onEditBody?: (value: string) => void;
  onEditBulletPoint?: (index: number, value: string) => void;
  onRemoveBulletPoint?: (index: number) => void;
  onAddImage?: () => void;
}

export default function SlidePreview({
  slide,
  theme,
  format,
  slideIndex,
  totalSlides,
  authorName,
  isActive,
  isThumbnail,
  onClick,
  onEditTitle,
  onEditBody,
  onEditBulletPoint,
  onRemoveBulletPoint,
  onAddImage,
}: SlidePreviewProps) {
  const aspectClass =
    format === "4:5"
      ? "aspect-[4/5]"
      : "aspect-square";

  const scale = isThumbnail
    ? "w-full"
    : "w-full max-w-[400px]";

  const handleSanitizedText = (
    value: string
  ) => {
    // ✅ sécurité minimale : supprime balises HTML
    return value.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        scale,
        aspectClass,
        "rounded-xl overflow-hidden relative flex flex-col justify-between p-6 transition-all duration-200",
        isThumbnail &&
          "cursor-pointer hover:ring-2 hover:ring-primary/50",
        isActive &&
          isThumbnail &&
          "ring-2 ring-primary shadow-lg shadow-primary/20",
        !isThumbnail && "shadow-2xl"
      )}
      style={{
        backgroundColor: theme.bgColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: theme.accentColor,
            color: theme.bgColor,
          }}
        >
          {slideIndex + 1}
        </div>

        {(slide.type === "hook" ||
          slide.type === "cta") &&
          authorName && (
            <span className="text-xs font-medium opacity-60">
              {authorName}
            </span>
          )}
      </div>

      {/* Content */}
      <div className={cn(
        "flex-1 flex flex-col gap-3 py-4",
        isThumbnail ? "justify-start" : "justify-center"
      )}>
        {isThumbnail ? (
          // — Thumbnail —
          slide.type === "hook" && slide.imageUrl ? (
            // Hook en mode image : uniquement l'image
            <img src={slide.imageUrl} alt="" className="w-full h-full rounded object-cover" />
          ) : (
            <>
              <h3 className="font-bold leading-tight text-[10px]">{slide.title}</h3>
              {slide.body && (
                <p className="opacity-70 leading-snug text-[8px] line-clamp-3">{slide.body}</p>
              )}
              {slide.imageUrl && slide.type !== "hook" && (
                <img src={slide.imageUrl} alt="" className="w-full rounded object-cover max-h-7.5" />
              )}
            </>
          )
        ) : slide.type === "hook" && slide.imageUrl ? (
          // — Full view · Hook en mode image : uniquement l'image plein cadre —
          <div className="flex-1 min-h-0 rounded-lg overflow-hidden">
            <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          // — Full view · Mode texte (hook sans image) ou content/CTA —
          <>
            <h3
              contentEditable={!!onEditTitle}
              suppressContentEditableWarning
              onBlur={(e) =>
                onEditTitle?.(handleSanitizedText(e.currentTarget.textContent || ""))
              }
              className={cn(
                "font-bold leading-tight outline-none",
                slide.type === "hook" ? "text-2xl" : "text-xl",
                onEditTitle &&
                  "hover:ring-1 hover:ring-primary/30 rounded px-1 -mx-1 focus:ring-2 focus:ring-primary/50"
              )}
            >
              {slide.title}
            </h3>

            {slide.body && (
              <p
                contentEditable={!!onEditBody}
                suppressContentEditableWarning
                onBlur={(e) =>
                  onEditBody?.(handleSanitizedText(e.currentTarget.textContent || ""))
                }
                className={cn(
                  "text-sm opacity-80 leading-relaxed outline-none",
                  onEditBody &&
                    "hover:ring-1 hover:ring-primary/30 rounded px-1 -mx-1 focus:ring-2 focus:ring-primary/50"
                )}
              >
                {slide.body}
              </p>
            )}

            {/* Bullets : uniquement pour les slides content/CTA */}
            {slide.type !== "hook" &&
              (slide.bulletPoints ?? []).length > 0 &&
              !slide.bulletPointsHidden && (
                <ul className="space-y-2 mt-2">
                  {(slide.bulletPoints ?? []).map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm group">
                      <span
                        className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: theme.accentColor }}
                      />
                      <span
                        contentEditable={!!onEditBulletPoint}
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          onEditBulletPoint?.(
                            i,
                            handleSanitizedText(e.currentTarget.textContent || "")
                          )
                        }
                        className={cn(
                          "outline-none flex-1",
                          onEditBulletPoint &&
                            "hover:ring-1 hover:ring-primary/30 rounded px-1 -mx-1 focus:ring-2 focus:ring-primary/50"
                        )}
                      >
                        {point}
                      </span>
                      {onRemoveBulletPoint && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); onRemoveBulletPoint(i); }}
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}

            {/* Image (content/CTA uniquement) ou placeholder (tous types) */}
            {slide.imageUrl ? (
              <div className="h-40 w-full shrink-0 rounded-lg overflow-hidden">
                <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ) : onAddImage ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAddImage(); }}
                className="h-40 w-full shrink-0 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-opacity hover:opacity-80"
                style={{ borderColor: `${theme.accentColor}60` }}
              >
                <ImagePlus className="w-5 h-5 opacity-50" style={{ color: theme.accentColor }} />
                <span className="text-xs font-medium opacity-50">Ajouter une image</span>
                <span className="text-[10px] opacity-40">
                  {format === "4:5" ? "(800x1000px)" : "(800x800px)"}
                </span>
              </button>
            ) : null}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="text-[10px] opacity-40 font-medium">
          {slideIndex + 1}/{totalSlides}
        </div>

        {slide.type !== "cta" && (
          <div
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              backgroundColor:
                theme.accentColor,
              color: theme.bgColor,
            }}
          >
            Swipe →
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          backgroundColor: theme.accentColor,
        }}
      />
    </div>
  );
}
