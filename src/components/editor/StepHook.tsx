"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useCarouselStore } from "@/store/carousel.store";
import { useState } from "react";
import { Hook } from "@/types/editor";

function getScoreStyle(score: number) {
  switch (score) {
    case 5:
      return {
        border: "border-emerald-500",
        badge: "bg-emerald-500 text-white",
        glow: "shadow-lg shadow-emerald-500/20",
      };
    case 4:
      return {
        border: "border-primary",
        badge: "bg-primary text-white",
        glow: "",
      };
    case 3:
      return {
        border: "border-muted",
        badge: "bg-muted text-foreground",
        glow: "",
      };
    case 2:
      return {
        border: "border-orange-400",
        badge: "bg-orange-400 text-white",
        glow: "",
      };
    default:
      return {
        border: "border-red-400",
        badge: "bg-red-400 text-white",
        glow: "",
      };
  }
}

export default function StepHook() {
  const { sujet, audience, ton, hook, setHook } = useCarouselStore();
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [loading, setLoading] = useState(false);

  const generateHooks = async () => {
    if (!sujet || !audience || !ton) {
      toast.error("Les inputs sont incomplets.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sujet, audience, ton }),
      });

      if (!res.ok) throw new Error("Erreur API");

      const data = await res.json();

      if (!data.hooks || !Array.isArray(data.hooks))
        throw new Error("Réponse invalide");

      setHooks(data.hooks);

      toast.success("Hooks générés avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de générer les hooks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold">Hook principal</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Le premier est recommandé. Choisis intelligemment.
          </p>
        </div>

        {!hooks.length && (
          <Button
            onClick={generateHooks}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Génération..." : "Générer mes hooks"}
          </Button>
        )}

        {hooks.map((h, index) => {
          const style = getScoreStyle(h.score);

          return (
            <Card
              key={h.id}
              onClick={() => {
                setHook(h);
                toast.success("Hook sélectionné !");
              }}
              className={`p-4 space-y-3 cursor-pointer transition-all border 
              hover:scale-[1.01] 
              ${style.border} 
              ${style.glow}
              ${hook?.id === h.id ? "ring-2 ring-primary" : ""}`}
            >
              <div className="flex justify-between items-start gap-3">
                <p className="font-medium">{h.text}</p>

                <div className="flex flex-col items-end gap-2">
                  {index === 0 && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                      Recommandé
                    </span>
                  )}

                  <span
                    className={`text-xs px-2 py-1 rounded ${style.badge}`}
                  >
                    {h.score}/5
                  </span>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs underline cursor-pointer text-muted-foreground">
                    Voir l’analyse
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm text-xs space-y-2">
                  <p>
                    <strong>Pourquoi :</strong>{" "}
                    {h.explanation.reason}
                  </p>
                  <p>
                    <strong>Amélioration :</strong>{" "}
                    {h.explanation.feedback}
                  </p>

                  <div className="pt-2 space-y-1">
                    {h.analysis.checks.map((check, i) => (
                      <div key={i}>
                        {check.passed ? "✅" : "❌"} {check.label}
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </Card>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
