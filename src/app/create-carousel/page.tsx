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
import { Metadata } from "next";

const appName = process.env.APP_NAME || 'FlowSlides';

export const metadata: Metadata = {
  title: `${appName} - Créez des carrousels engageants en un clin d'œil`,
  description: `${appName} est votre assistant de création de carrousels alimenté par l'IA. Générez des carrousels percutants pour LinkedIn et Instagram en quelques clics, adaptés à votre sujet et à votre audience.`
};

// Mock hooks for fallback
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

// Generate hooks using AI
const generateHooks = async (formData: CarouselFormData): Promise<Hook[]> => {
  try {
    const response = await fetch('/api/hooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: formData.subject,
        audience: formData.audience,
        tone: formData.tone,
        goal: formData.goal,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate hooks');
    }

    const data = await response.json();
    return data.hooks;
  } catch (error) {
    console.error('Error generating hooks with AI:', error);
    // Fallback to mock hooks if API fails
    return generateMockHooks(formData);
  }
};

export default function CreateCarousel() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CarouselFormData | null>(null);
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [theme, setTheme] = useState<CarouselTheme>(DEFAULT_THEMES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: CarouselFormData) => {
    setFormData(data);
    setIsLoading(true);

    try {
      const generatedHooks = await generateHooks(data);
      setHooks(generatedHooks);
      setStep(1);
    } catch (error) {
      console.error('Error in form submission:', error);
      // En cas d'erreur, on utilise quand même les hooks mock
      setHooks(generateMockHooks(data));
      setStep(1);
    } finally {
      setIsLoading(false);
    }
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