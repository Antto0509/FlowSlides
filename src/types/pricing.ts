import { createElement } from "react";
import { Crown, Sparkles, Zap } from "lucide-react";

export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: React.ReactNode;
  badge?: string;
  features: PlanFeature[];
  cta: string;
  ctaVariant: "gradient" | "outline" | "secondary";
  highlighted: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Pour découvrir FlowSlides et tester la puissance de l'IA.",
    monthlyPrice: 0,
    annualPrice: 0,
    icon: createElement(Zap, { className: "w-5 h-5" }),
    features: [
      { text: "5 carrousels par mois", included: true },
      { text: "5 thèmes visuels", included: true },
      { text: "Export JPG / PNG / PDF", included: true },
      { text: "LinkedIn & Instagram", included: true },
      { text: "Hook IA", included: true },
      { text: "Watermark sur les exports", included: false },
      { text: "Hook IA avancée", included: false },
      { text: "Thèmes supplémentaires", included: false },
      { text: "Carrousels illimités", included: false },
      { text: "Thème personnalisé (branding)", included: false },
    ],
    cta: "Commencer gratuitement",
    ctaVariant: "outline",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les créateurs qui publient régulièrement et veulent aller plus loin.",
    monthlyPrice: 10,
    annualPrice: 10 * 0.8,
    icon: createElement(Sparkles, { className: "w-5 h-5" }),
    badge: "Le plus populaire",
    features: [
      { text: "15 carrousels par mois", included: true },
      { text: "10 thèmes visuels", included: true },
      { text: "Export JPG / PNG / PDF", included: true },
      { text: "LinkedIn & Instagram", included: true },
      { text: "Hook IA avancée", included: true, highlight: true },
      { text: "Export sans watermark", included: true, highlight: true },
      { text: "Carrousels illimités", included: false },
      { text: "Thème personnalisé (branding)", included: false },
      { text: "Contenus IA", included: false },
      { text: "Tous les thèmes", included: false },
    ],
    cta: "Passer à Pro",
    ctaVariant: "gradient",
    highlighted: true,
  },
  {
    id: "king",
    name: "King",
    description: "Pour les pros du contenu qui veulent le meilleur sans compromis.",
    monthlyPrice: 20,
    annualPrice: 20 * 0.8,
    icon: createElement(Crown, { className: "w-5 h-5" }),
    features: [
      { text: "Carrousels illimités", included: true, highlight: true },
      { text: "Tous les thèmes visuels", included: true },
      { text: "Thème personnalisé (branding)", included: true, highlight: true },
      { text: "Export JPG / PNG / PDF", included: true },
      { text: "LinkedIn & Instagram", included: true },
      { text: "Hook IA avancée", included: true },
      { text: "Contenus IA", included: true, highlight: true },
      { text: "Export sans watermark", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Accès anticipé aux nouvelles fonctionnalités", included: true },
    ],
    cta: "Devenir King",
    ctaVariant: "secondary",
    highlighted: false,
  },
];

export const FAQS = [
  {
    q: "Puis-je changer de plan à tout moment ?",
    a: "Oui, vous pouvez passer à un plan supérieur ou inférieur à n'importe quel moment. Le changement prend effet immédiatement et le prorata est appliqué automatiquement.",
  },
  {
    q: "Que se passe-t-il si je dépasse ma limite mensuelle ?",
    a: "Sur les plans Free et Pro, vous ne pourrez plus créer de nouveaux carrousels jusqu'au prochain mois. Vous pouvez upgrader à tout moment pour continuer à créer.",
  },
  {
    q: "Les carrousels générés m'appartiennent-ils ?",
    a: "Absolument. Tous les contenus générés via FlowSlides vous appartiennent entièrement. Vous êtes libre de les publier, modifier ou distribuer comme bon vous semble.",
  },
  {
    q: "Comment fonctionne la facturation annuelle ?",
    a: "En choisissant la facturation annuelle, vous payez en une seule fois pour 12 mois et bénéficiez de 20 % de réduction par rapport au tarif mensuel.",
  },
  {
    q: "C'est quoi exactement le \"Contenu IA\" du plan King ?",
    a: "Le Contenu IA génère pour vous l'intégralité du texte de chaque slide — titres, corps de texte, bullet points — optimisé pour votre audience et votre ton. Une fonctionnalité avancée par rapport aux simples hooks.",
  },
];