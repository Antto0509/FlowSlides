"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCarouselStore } from "@/store/carousel.store";
import { templatesRegistry } from "@/lib/templates/templates.registry";

export default function StepTemplate() {
  const hook = useCarouselStore((s) => s.hook);
  const templateFamily = useCarouselStore((s) => s.templateFamily);
  const templateVariant = useCarouselStore((s) => s.templateVariant);
  const setTemplateVariant = useCarouselStore(
    (s) => s.setTemplateVariant
  );

  if (!hook || !templateFamily) return null;

  const variants = templatesRegistry[templateFamily as keyof typeof templatesRegistry] ?? [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold">
          Choisis le style visuel
        </h2>
        <p className="text-sm text-muted-foreground">
          Structure fixée. Design libre.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {variants.map((variant) => (
          <Card
            key={variant.id}
            onClick={() => setTemplateVariant(variant.id)}
            className={`cursor-pointer p-6 space-y-4 border transition 
              hover:scale-[1.02]
              ${
                templateVariant === variant.id
                  ? "ring-2 ring-primary"
                  : "border-muted"
              }`}
          >
            <div
              className={`rounded-md p-4 ${variant.preview.bg}`}
            >
              <p
                className={`${variant.preview.title} ${variant.preview.accent}`}
              >
                {hook.text}
              </p>

              <p className="text-sm mt-2 opacity-70">
                Slide suivante…
              </p>
            </div>

            <p className="text-sm font-medium">
              {variant.name}
            </p>
          </Card>
        ))}
      </div>

      <Button
        disabled={!templateVariant}
        className="w-full"
      >
        Continuer
      </Button>
    </div>
  );
}
