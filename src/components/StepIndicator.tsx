import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description: string;
}

const STEPS: Step[] = [
  { label: "Paramètres", description: "Configurez votre carrousel" },
  { label: "Hook", description: "Choisissez votre accroche" },
  { label: "Contenu", description: "Éditez vos slides" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.label} className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isCompleted &&
                    "gradient-primary text-primary-foreground",
                  isCurrent &&
                    "gradient-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-secondary text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>

              <div className="hidden sm:block">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2 rounded-full transition-all duration-300",
                  isCompleted
                    ? "gradient-primary"
                    : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
