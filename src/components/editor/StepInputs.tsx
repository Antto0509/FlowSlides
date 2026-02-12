"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCarouselStore } from "@/store/carousel.store";
import { Audience, Format, Plateforme, type Tone } from "@/types/editor";
import { AUDIENCE_OPTIONS, TONE_OPTIONS } from "@/lib/constants";
import { useState } from "react";

export default function StepInputs() {
  const setInputs = useCarouselStore((s) => s.setInputs);

  const [sujet, setSujet] = useState<string>("");
  const [audience, setAudience] = useState<Audience | "">("");
  const [ton, setTon] = useState<Tone | "">("");
  const [plateforme, setPlateforme] = useState<Plateforme | "">("both");
  const [format, setFormat] = useState<Format | "">("4:5");

  const sujetLength = sujet.trim().length;

  const min = 15;
  const max = 120;

  const progress = Math.min((sujetLength / max) * 100, 100);

  const getBarColor = () => {
    if (sujetLength === 0) return "bg-muted";
    if (sujetLength < min) return "bg-red-500";
    if (sujetLength <= max) return "bg-green-500";
    return "bg-orange-500";
  };

  const getFeedbackText = () => {
    if (sujetLength === 0) return "Décris précisément ton angle.";
    if (sujetLength < min) return "Sois plus précis.";
    if (sujetLength <= max) return "Sujet clair 👍";
    return "Simplifie ton angle.";
  };

  const isValid =
    sujetLength >= min &&
    sujetLength <= max &&
    audience !== "" &&
    ton !== "" &&
    plateforme !== "" &&
    format !== "";

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold">Définis le contexte</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Plus ton sujet est précis, plus les hooks seront puissants.
        </p>
      </div>

      {/* Sujet */}
      <div className="space-y-2">
        <Label htmlFor="sujet">Sujet</Label>

        <Input
          id="sujet"
          placeholder="Sujet précis (ex: trouver des clients en freelance sans prospection)"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
        />


        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getBarColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{getFeedbackText()}</span>
          <span>{sujetLength} caractères</span>
        </div>
      </div>

      {/* Audience */}
      <div className="space-y-2">
        <Label>Audience</Label>

        <Select
          value={audience}
          onValueChange={(value) => setAudience(value as Audience)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Audience (ex: freelance, client, tech)" />
          </SelectTrigger>
          <SelectContent>
            {AUDIENCE_OPTIONS.map((aud) => (
              <SelectItem key={aud.value} value={aud.value}>
                {aud.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {/* Ton */}
      <div className="space-y-2">
        <Label>Ton</Label>

        <Select value={ton} onValueChange={(value) => setTon(value as Tone)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ton (ex: neutre, direct, inspirant, tranché)" />
          </SelectTrigger>
          <SelectContent>
          {TONE_OPTIONS.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>

      {/* Séparateur */}
      <div className="border-t" />

      {/* Options avancées */}
      <div className="flex gap-4">
        <div className="space-y-2 w-full">
          <Label>Plateforme</Label>
          <Select
            value={plateforme}
            onValueChange={(value) => setPlateforme(value as Plateforme)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Plateforme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="both">Les deux</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <Label>Format</Label>
          <Select
            value={format}
            onValueChange={(value) => setFormat(value as Format)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4:5">4:5 (Portrait) (Recommandé)</SelectItem>
              <SelectItem value="1:1">1:1 (Carré)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <Button
        disabled={!isValid}
        className="w-full"
        onClick={() =>
          setInputs({
            sujet: sujet.trim(),
            audience: audience as Audience,
            ton: ton as Tone,
            plateforme: plateforme as Plateforme,
            format: format as Format,
          })
        }
      >
        Générer mes hooks
      </Button>
    </div>
  );
}
