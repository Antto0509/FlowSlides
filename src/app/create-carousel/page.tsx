"use client";

import { useState, useEffect } from "react";
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
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { getPlanLimits } from "@/types/pricing";


const generateMockSlides = (
  hook: Hook,
  formData: CarouselFormData,
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

class LimitReachedError extends Error {
  constructor() { super('limit_reached'); }
}

class UnauthorizedError extends Error {
  constructor() { super('unauthorized'); }
}

// Generate hooks using AI
const generateHooks = async (formData: CarouselFormData): Promise<{ hooks: Hook[]; aiGenerated: boolean }> => {
  const response = await fetch('/api/hooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: formData.subject,
      audience: formData.audience,
      tone: formData.tone,
      goal: formData.goal,
    }),
  });

  if (response.status === 401) throw new UnauthorizedError();
  if (response.status === 403) throw new LimitReachedError();
  if (!response.ok) throw new Error('Failed to generate hooks');

  const data = await response.json();
  return { hooks: data.hooks, aiGenerated: data.aiGenerated as boolean };
};

interface UsageInfo {
  plan: string;
  used: number;
  limit: number;
}

export default function CreateCarousel() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CarouselFormData | null>(null);
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [selectedHook, setSelectedHook] = useState<Hook | null>(null);
  const [hooksAiGenerated, setHooksAiGenerated] = useState(true);
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [slidesAiGenerated, setSlidesAiGenerated] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerationsUsed, setRegenerationsUsed] = useState(0);
  const [theme, setTheme] = useState<CarouselTheme>(DEFAULT_THEMES[0]);
  const [authorName, setAuthorName] = useState("FlowSlides");
  const [isLoading, setIsLoading] = useState(false);
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null);

  useEffect(() => {
    fetch('/api/usage')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => data && setUsageInfo(data))
      .catch(() => null);
  }, []);

  const handleFormSubmit = async (data: CarouselFormData) => {
    setFormData(data);
    setIsLoading(true);

    try {
      const { hooks: generatedHooks, aiGenerated } = await generateHooks(data);
      setHooks(generatedHooks);
      setHooksAiGenerated(aiGenerated);
      setUsageInfo((prev) => prev ? { ...prev, used: prev.used + 1 } : prev);
      setStep(1);
    } catch (error) {
      if (error instanceof LimitReachedError) {
        toast.error("Limite mensuelle atteinte", {
          description: "Passez à un plan supérieur pour continuer à créer des carrousels.",
          action: { label: "Voir les plans", onClick: () => window.location.href = "/pricing" },
        });
      } else if (error instanceof UnauthorizedError) {
        toast.error("Connectez-vous pour générer des carrousels.", {
          action: { label: "Se connecter", onClick: () => window.location.href = "/login" },
        });
      } else {
        toast.error("Erreur lors de la génération des hooks. Veuillez réessayer.");
        console.error('Error in form submission:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateAiSlides = async (hook: Hook, fd: CarouselFormData, isRegeneration = false) => {
    const res = await fetch('/api/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: fd.subject,
        audience: fd.audience,
        tone: fd.tone,
        goal: fd.goal,
        slideCount: fd.slideCount,
        hookTitle: hook.title,
        hookSubtitle: hook.subtitle,
        isRegeneration,
      }),
    });
    if (res.status === 429) throw Object.assign(new Error('regeneration_limit_reached'), { status: 429 });
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    if (data.regenerationsUsed !== undefined) setRegenerationsUsed(data.regenerationsUsed);
    return data.slides;
  };

  const handleHookSelect = async (hook: Hook) => {
    if (!formData) return;

    setSelectedHook(hook);
    setIsLoading(true);
    setSlidesAiGenerated(false);

    const limits = getPlanLimits(usageInfo?.plan);

    if (limits.aiContent) {
      try {
        const aiSlides = await generateAiSlides(hook, formData);
        setSlides(aiSlides);
        setSlidesAiGenerated(true);
      } catch {
        setSlides(generateMockSlides(hook, formData));
        toast.error("La génération IA des contenus a échoué. Contenu placeholder utilisé.");
      }
    } else {
      await new Promise((r) => setTimeout(r, 800));
      setSlides(generateMockSlides(hook, formData));
    }

    setIsLoading(false);
    setStep(2);
  };

  const handleRegenerateSlides = async () => {
    if (!selectedHook || !formData) return;

    setIsRegenerating(true);
    try {
      const aiSlides = await generateAiSlides(selectedHook, formData, true);
      setSlides(aiSlides);
      setSlidesAiGenerated(true);
      toast.success("Contenu IA régénéré !");
    } catch (err) {
      if ((err as { status?: number }).status === 429) {
        toast.error("Limite de régénérations atteinte", {
          description: "Vous avez utilisé vos 30 régénérations ce mois-ci.",
        });
      } else {
        toast.error("Erreur lors de la régénération. Veuillez réessayer.");
      }
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation appName="FlowSlides" mounted={true} />
      
      <div className="container max-w-7xl mx-auto px-4 py-10 pt-30">
        <StepIndicator currentStep={step} />

        {step === 0 && (
          <CarouselForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            usageInfo={usageInfo ?? undefined}
          />
        )}

        {step === 1 && (
          <HookSelection
            hooks={hooks}
            onSelect={handleHookSelect}
            onBack={() => setStep(0)}
            isLoading={isLoading}
            aiGenerated={hooksAiGenerated}
          />
        )}

        {step === 2 && formData && (
          <SlideEditor
            slides={slides}
            theme={theme}
            slideFormat={formData.format}
            authorName={authorName}
            networks={formData.networks}
            planThemeAccess={getPlanLimits(usageInfo?.plan).themeAccess}
            aiContentEnabled={getPlanLimits(usageInfo?.plan).aiContent}
            regenerationsUsed={regenerationsUsed}
            maxRegenerations={getPlanLimits(usageInfo?.plan).maxRegenerations}
            isRegenerating={isRegenerating}
            onSlidesChange={setSlides}
            onThemeChange={setTheme}
            onAuthorNameChange={setAuthorName}
            onBack={() => setStep(1)}
            onRegenerateSlides={handleRegenerateSlides}
          />
        )}
      </div>

      <Footer appName="FlowSlides" />
    </div>
  );
}