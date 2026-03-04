"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CarouselTheme, DEFAULT_THEMES } from "@/types/carousel";
import { canAccessTheme } from "@/types/pricing";
import { toast } from "sonner";
import { ChevronDown, Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ThemeSelectorProps {
  theme: CarouselTheme;
  planThemeAccess: "free" | "pro" | "king";
  authorName: string;
  onThemeChange: (theme: CarouselTheme) => void;
  onAuthorNameChange: (name: string) => void;
}

const DEFAULT_CUSTOM_THEME: CarouselTheme = {
  id: "custom",
  name: "Personnalisé",
  bgColor: "#FFFFFF",
  textColor: "#1A1A2E",
  accentColor: "#7C3AED",
  fontFamily: "Space Grotesk",
  tier: "king",
};

export function ThemeSelector({ theme, planThemeAccess, authorName, onThemeChange, onAuthorNameChange }: ThemeSelectorProps) {
  const [showCustomPanel, setShowCustomPanel] = useState(false);
  const [customTheme, setCustomTheme] = useState<CarouselTheme>(DEFAULT_CUSTOM_THEME);

  useEffect(() => {
    const saved = localStorage.getItem("flowslides:custom-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CarouselTheme;
        setCustomTheme(parsed);
        if (theme.id === "custom") onThemeChange(parsed);
      } catch {}
    }
  }, []);

  const handleCustomThemeChange = (field: keyof CarouselTheme, value: string) => {
    const updated = { ...customTheme, [field]: value };
    setCustomTheme(updated);
    localStorage.setItem("flowslides:custom-theme", JSON.stringify(updated));
    onThemeChange(updated);
  };

  const selectCustomTheme = () => {
    if (theme.id !== "custom") onThemeChange(customTheme);
    setShowCustomPanel((prev) => !prev);
  };

  return (
    <TooltipProvider>
      <div className="p-4 rounded-xl bg-card border animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
        {/* Swatches */}
        <div className="flex flex-wrap gap-3">
          {DEFAULT_THEMES.map((t) => {
            const isLocked = !canAccessTheme(planThemeAccess, t.tier);
            const planLabel = t.tier === "king" ? "King" : "Pro";
            return (
              <Tooltip key={t.id}>
                <TooltipTrigger asChild>
                  <Button
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
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isLocked ? `Plan ${planLabel} requis` : t.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Nom d'auteur (Pro uniquement) */}
        {planThemeAccess === "pro" && (
          <div className="border-t border-border/50 pt-3 space-y-1">
            <Label className="text-xs text-muted-foreground font-normal" htmlFor="author-name-pro">
              Nom d&apos;auteur
            </Label>
            <Input
              id="author-name-pro"
              value={authorName}
              onChange={(e) => onAuthorNameChange(e.target.value)}
              placeholder="Votre nom"
              className="h-8 text-xs"
            />
          </div>
        )}

        {/* Branding personnalisé */}
        <div className="border-t border-border/50 pt-3">
          {planThemeAccess === "king" ? (
            <div className="space-y-3">
              <Button
                type="button"
                onClick={selectCustomTheme}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-transparent text-sm text-foreground font-medium transition-all duration-200 w-full",
                  theme.id === "custom"
                    ? "bg-primary/5"
                    : "hover:border-primary/30"
                )}
              >
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0"
                  style={{ backgroundColor: customTheme.bgColor }}
                >
                  <Crown className="w-4 h-4" style={{ color: customTheme.accentColor }} />
                </div>
                <span>Branding personnalisé</span>
                <ChevronDown
                  className={cn("w-4 h-4 ml-auto transition-transform duration-200", showCustomPanel && "rotate-180")}
                />
              </Button>

              {showCustomPanel && (
                <div className="grid grid-cols-2 gap-3 px-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {(["bgColor", "textColor", "accentColor"] as const).map((field) => {
                    const labels = { bgColor: "Fond", textColor: "Texte", accentColor: "Accent" };
                    return (
                      <div key={field} className="space-y-1">
                        <Label className="text-xs text-muted-foreground font-normal">{labels[field]}</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customTheme[field]}
                            onChange={(e) => handleCustomThemeChange(field, e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border border-border"
                          />
                          <span className="text-xs font-mono opacity-60">{customTheme[field]}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-normal" htmlFor="font-select">Police</Label>
                    <Select
                      value={customTheme.fontFamily}
                      onValueChange={(value) => handleCustomThemeChange("fontFamily", value)}
                    >
                      <SelectTrigger id="font-select" className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                        <SelectItem value="Inter">Inter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground font-normal" htmlFor="author-name-king">
                      Nom d&apos;auteur
                    </Label>
                    <Input
                      id="author-name-king"
                      value={authorName}
                      onChange={(e) => onAuthorNameChange(e.target.value)}
                      placeholder="Votre nom"
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              type="button"
              onClick={() =>
                toast.error("Thème personnalisé réservé au plan King", {
                  action: { label: "Voir les plans", onClick: () => (window.location.href = "/pricing") },
                })
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm opacity-60 cursor-not-allowed w-full"
            >
              <div className="w-8 h-8 rounded-lg border border-dashed flex items-center justify-center shrink-0">
                <Lock className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">Branding personnalisé</span>
              <Crown className="w-3.5 h-3.5 text-yellow-500" />
              <Badge variant="secondary" className="ml-auto text-[10px]">King</Badge>
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
