"use client";

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
      <div className="flex-1 flex flex-col justify-center gap-3 py-4">
        {isThumbnail ? (
          <>
            <h3 className="font-bold leading-tight text-[10px]">
              {slide.title}
            </h3>
            {slide.body && (
              <p className="opacity-70 leading-snug text-[8px] line-clamp-3">
                {slide.body}
              </p>
            )}
          </>
        ) : (
          <>
            <h3
              contentEditable={!!onEditTitle}
              suppressContentEditableWarning
              onBlur={(e) =>
                onEditTitle?.(
                  handleSanitizedText(
                    e.currentTarget.textContent || ""
                  )
                )
              }
              className={cn(
                "font-bold leading-tight outline-none",
                slide.type === "hook"
                  ? "text-2xl"
                  : "text-xl",
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
                  onEditBody?.(
                    handleSanitizedText(
                      e.currentTarget.textContent || ""
                    )
                  )
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

            {(slide.bulletPoints ?? []).length > 0 && (
              <ul className="space-y-2 mt-2">
                {(slide.bulletPoints ?? []).map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
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
                        "outline-none",
                        onEditBulletPoint &&
                          "hover:ring-1 hover:ring-primary/30 rounded px-1 -mx-1 focus:ring-2 focus:ring-primary/50"
                      )}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
