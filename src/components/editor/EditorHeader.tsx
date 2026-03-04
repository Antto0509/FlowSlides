"use client";

import { Button } from "@/components/ui/button";
import { SocialNetwork } from "@/types/carousel";
import { ExportButtons, ExportFormat } from "@/components/ExportButtons";
import { ChevronLeft, Palette } from "lucide-react";

interface EditorHeaderProps {
  onBack: () => void;
  showThemes: boolean;
  onToggleThemes: () => void;
  networks: SocialNetwork[];
  isExporting: ExportFormat | false;
  onExport: (format: ExportFormat) => void;
}

export function EditorHeader({
  onBack,
  showThemes,
  onToggleThemes,
  networks,
  isExporting,
  onExport,
}: EditorHeaderProps) {
  return (
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
          onClick={onToggleThemes}
          className="gap-2"
        >
          <Palette className="w-4 h-4" />
          Thèmes
        </Button>

        <ExportButtons
          networks={networks}
          isExporting={isExporting}
          onExport={onExport}
        />
      </div>
    </div>
  );
}
