"use client";

import { Button } from "@/components/ui/button";
import { SlideContent } from "@/types/carousel";
import { Eye, EyeOff, ImageOff, ImagePlus, ListPlus } from "lucide-react";

interface SlideActionsProps {
  slide: SlideContent;
  showImagePlaceholder: boolean;
  onToggleImagePlaceholder: () => void;
  onToggleBullets: () => void;
  onAddBullet: () => void;
  onChangeImage: () => void;
  onRemoveImage: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
}

export function SlideActions({
  slide,
  showImagePlaceholder,
  onToggleImagePlaceholder,
  onToggleBullets,
  onAddBullet,
  onChangeImage,
  onRemoveImage,
  onImageUpload,
  imageInputRef,
}: SlideActionsProps) {
  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {slide.type !== "hook" && (slide.bulletPoints ?? []).length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleBullets}
            className="gap-2"
          >
            {slide.bulletPointsHidden
              ? <><Eye className="w-4 h-4" /> Afficher les bullets ({(slide.bulletPoints ?? []).length})</>
              : <><EyeOff className="w-4 h-4" /> Masquer les bullets</>
            }
          </Button>
        )}
        {slide.type !== "hook" && !slide.bulletPointsHidden && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddBullet}
            className="gap-2"
          >
            <ListPlus className="w-4 h-4" />
            Ajouter un bullet
          </Button>
        )}
        {slide.imageUrl ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onChangeImage}
              className="gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              Changer l'image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveImage}
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
            onClick={onToggleImagePlaceholder}
            className="gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            {showImagePlaceholder ? "Annuler" : "Ajouter une image"}
          </Button>
        )}
      </div>
    </>
  );
}
