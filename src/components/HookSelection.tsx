"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hook } from "@/types/carousel";
import {
  ArrowLeft,
  Sparkles,
  MessageCircleQuestion,
  BarChart3,
  Flame,
  Zap,
  BookOpen,
} from "lucide-react";

interface HookSelectionProps {
  hooks: Hook[];
  onSelect: (hook: Hook) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const STYLE_ICONS: Record<string, React.ReactNode> = {
  question: <MessageCircleQuestion className="w-5 h-5" />,
  statistic: <BarChart3 className="w-5 h-5" />,
  bold: <Flame className="w-5 h-5" />,
  story: <BookOpen className="w-5 h-5" />,
  controversial: <Zap className="w-5 h-5" />,
};

const STYLE_COLORS: Record<string, string> = {
  question: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  statistic: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
  bold: "from-rose-500/10 to-orange-500/10 border-rose-500/20",
  story: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  controversial: "from-yellow-500/10 to-amber-500/10 border-yellow-500/20",
};

export default function HookSelection({
  hooks,
  onSelect,
  onBack,
  isLoading = false,
}: HookSelectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (hook: Hook) => {
    if (selectedId) return; // évite double click spam
    setSelectedId(hook.id);

    // micro delay UX
    setTimeout(() => {
      onSelect(hook);
    }, 250);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Choisissez votre{" "}
            <span className="gradient-text">hook</span>
          </h2>
          <p className="text-muted-foreground mt-1">
            Sélectionnez l&apos;accroche qui captivera votre audience
          </p>
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-24 mb-3" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {hooks.map((hook, index) => {
            const colorClass =
              STYLE_COLORS[hook.style] ?? STYLE_COLORS.bold;

            const icon =
              STYLE_ICONS[hook.style] ?? (
                <Sparkles className="w-5 h-5" />
              );

            const styleLabel =
              hook.style === "question"
                ? "Question"
                : hook.style === "statistic"
                ? "Statistique choc"
                : hook.style === "bold"
                ? "Affirmation audacieuse"
                : hook.style === "story"
                ? "Histoire captivante"
                : hook.style === "controversial"
                ? "Controversé"
                : "Autre";

            return (
              <Card
                key={hook.id}
                onClick={() => handleSelect(hook)}
                className={cn(
                  "cursor-pointer transition-all duration-300 border-2 hover:shadow-lg hover:-translate-y-0.5",
                  `bg-linear-to-r ${colorClass}`,
                  selectedId === hook.id &&
                    "ring-2 ring-primary scale-[1.02]",
                  "animate-in fade-in slide-in-from-bottom-2"
                )}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {icon}
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {styleLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-1">
                    {hook.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {hook.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
