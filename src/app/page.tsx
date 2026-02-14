"use client";

import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import CarouselForm from "@/components/CarouselForm";
import HookSelection from "@/components/HookSelection";
import SlideEditor from "@/components/SlideEditor";
import {
  CarouselFormData,
  Hook,
  SlideContent,
  CarouselTheme,
  DEFAULT_THEMES,
} from "@/types/carousel";

// Mock hooks for now (will be replaced by AI)
const generateMockHooks = (formData: CarouselFormData): Hook[] => [
  {
    id: "1",
    title: `Pourquoi 90% des ${formData.audience || "gens"} échouent en ${formData.subject}?`,
    subtitle: "La réponse va vous surprendre...",
    style: "question",
  },
  {
    id: "2",
    title: `${formData.subject}: les chiffres que personne ne vous montre`,
    subtitle: "Données exclusives et analyse complète",
    style: "statistic",
  },
  {
    id: "3",
    title: `Arrêtez tout. Voici la vérité sur ${formData.subject}.`,
    subtitle: "Ce que les experts ne vous diront jamais",
    style: "bold",
  },
];

const generateMockSlides = (
  hook: Hook,
  formData: CarouselFormData
): SlideContent[] => {
  const count = formData.slideCount;

  const slides: SlideContent[] = [
    {
      id: "s1",
      type: "hook",
      title: hook.title,
      body: hook.subtitle,
    },
  ];

  for (let i = 1; i < count - 1; i++) {
    slides.push({
      id: `s${i + 1}`,
      type: "content",
      title: `Point clé #${i}`,
      body: `Contenu détaillé pour le point ${i} sur ${formData.subject}. Adaptez ce texte à votre message.`,
      bulletPoints: [
        `Conseil ${i}.1`,
        `Conseil ${i}.2`,
        `Conseil ${i}.3`,
      ],
    });
  }

  slides.push({
    id: `s${count}`,
    type: "cta",
    title: "Vous avez aimé ce contenu ?",
    body: "Suivez-moi pour plus de conseils et partagez ce carrousel !",
  });

  return slides;
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CarouselFormData | null>(null);
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [theme, setTheme] = useState<CarouselTheme>(DEFAULT_THEMES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (data: CarouselFormData) => {
    setFormData(data);
    setIsLoading(true);

    // Simulate AI generation
    setTimeout(() => {
      setHooks(generateMockHooks(data));
      setIsLoading(false);
      setStep(1);
    }, 1500);
  };

  const handleHookSelect = (hook: Hook) => {
    if (!formData) return;

    setIsLoading(true);

    setTimeout(() => {
      setSlides(generateMockSlides(hook, formData));
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <StepIndicator currentStep={step} />

        {step === 0 && (
          <CarouselForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        )}

        {step === 1 && (
          <HookSelection
            hooks={hooks}
            onSelect={handleHookSelect}
            onBack={() => setStep(0)}
            isLoading={isLoading}
          />
        )}

        {step === 2 && formData && (
          <SlideEditor
            slides={slides}
            theme={theme}
            format={formData.format}
            authorName="@antto"
            onSlidesChange={setSlides}
            onThemeChange={setTheme}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
}
