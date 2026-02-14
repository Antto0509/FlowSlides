"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  CarouselFormData,
  Tone,
  SocialNetwork,
  SlideFormat,
  TONES,
} from "@/types/carousel";
import {
  Zap,
  Linkedin,
  Instagram,
  Square,
  RectangleVertical,
} from "lucide-react";

interface CarouselFormProps {
  onSubmit: (data: CarouselFormData) => void;
  isLoading?: boolean;
}

export default function CarouselForm({
  onSubmit,
  isLoading = false,
}: CarouselFormProps) {
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [networks, setNetworks] = useState<SocialNetwork[]>(["linkedin"]);
  const [format, setFormat] = useState<SlideFormat>("4:5");
  const [slideCount, setSlideCount] = useState([8]);

  const toggleNetwork = (network: SocialNetwork) => {
    setNetworks((prev) =>
      prev.includes(network)
        ? prev.length > 1
          ? prev.filter((n) => n !== network)
          : prev
        : [...prev, network]
    );
  };

  const handleSubmit = () => {
    if (!subject.trim()) return;

    onSubmit({
      subject: subject.trim(),
      audience: audience.trim(),
      tone,
      networks,
      format,
      slideCount: slideCount[0],
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Créez votre <span className="gradient-text">carrousel</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Générez des carrousels percutants en quelques clics grâce à l&apos;IA
        </p>
      </div>

      <Card className="border-border/50 shadow-xl shadow-primary/5">
        <CardContent className="p-8 space-y-7">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-base font-semibold">
              Sujet du carrousel
            </Label>
            <Textarea
              id="subject"
              placeholder="Ex: 5 erreurs fatales en copywriting..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-25 text-base resize-none bg-background"
            />
          </div>

          {/* Audience */}
          <div className="space-y-2">
            <Label htmlFor="audience" className="text-base font-semibold">
              Audience cible
            </Label>
            <Input
              id="audience"
              placeholder="Ex: entrepreneurs, marketeurs, freelances..."
              className="bg-background"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          {/* Tone */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Ton</Label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    tone === t.value
                      ? "gradient-primary text-primary-foreground border-transparent shadow-md shadow-primary/20"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                  )}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Networks */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Réseau social
            </Label>
            <div className="flex gap-3">
              {[
                {
                  value: "linkedin" as SocialNetwork,
                  label: "LinkedIn",
                  icon: Linkedin,
                },
                {
                  value: "instagram" as SocialNetwork,
                  label: "Instagram",
                  icon: Instagram,
                },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => toggleNetwork(value)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 font-medium",
                    networks.includes(value)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Format</Label>
            <div className="flex gap-3">
              {[
                {
                  value: "4:5" as SlideFormat,
                  label: "4:5",
                  sublabel: "Recommandé",
                  icon: RectangleVertical,
                },
                {
                  value: "1:1" as SlideFormat,
                  label: "1:1",
                  sublabel: "Carré",
                  icon: Square,
                },
              ].map(({ value, label, sublabel, icon: Icon }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setFormat(value)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                    format === value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      format === value
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <div className="text-left">
                    <p
                      className={cn(
                        "font-semibold",
                        format === value
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sublabel}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Slide count */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold">
                Nombre de slides
              </Label>
              <span className="text-2xl font-bold gradient-text">
                {slideCount[0]}
              </span>
            </div>

            <Slider
              value={slideCount}
              onValueChange={setSlideCount}
              min={5}
              max={15}
              step={1}
              className="py-2"
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!subject.trim() || isLoading}
            className="w-full h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity border-0 shadow-lg shadow-primary/25"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Génération en cours...
              </div>
            ) : (
              <>
                Générer les hooks <Zap className="w-5 h-5 ml-1" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
