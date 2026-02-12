"use client";

import { useCarouselStore } from "@/store/carousel.store";

import StepInputs from "@/components/editor/StepInputs";
import StepHook from "@/components/editor/StepHook";
import StepTemplate from "@/components/editor/StepTemplate";
import StepCarousel from "@/components/editor/StepCarousel";
import StepExport from "@/components/editor/StepExport";

export default function EditorPage() {
  const step = useCarouselStore((s) => s.step);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl p-5">
        {step === 1 && <StepInputs />}
        {step === 2 && <StepHook />}
        {step === 3 && <StepTemplate />}
        {step === 4 && <StepCarousel />}
        {step === 5 && <StepExport />}
      </div>
    </div>
  );
}
