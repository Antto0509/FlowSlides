import { SlideContent, CarouselTheme, SlideFormat } from "@/types/carousel";

export type NetworkFilter = "all" | "linkedin" | "instagram";

export interface ExampleCarousel {
  id: string;
  title: string;
  description: string;
  network: "linkedin" | "instagram";
  format: SlideFormat;
  theme: CarouselTheme;
  slides: SlideContent[];
  tags: string[];
}


export const EXAMPLES: ExampleCarousel[] = [
  {
    id: "1",
    title: "5 erreurs qui tuent votre personal branding",
    description: "Un carousel provocateur sur les erreurs courantes en personal branding — parfait pour LinkedIn.",
    network: "linkedin",
    format: "4:5",
    theme: {
      id: "bold",
      name: "Bold",
      bgColor: "#1A1A2E",
      textColor: "#FFFFFF",
      accentColor: "#F43F5E",
      fontFamily: "Space Grotesk",
      tier: "free",
    },
    tags: ["Personal branding", "Provocateur"],
    slides: [
      { id: "s1-1", type: "hook", title: "5 erreurs qui tuent votre personal branding (et vous ne le savez même pas)", body: "J'en ai fait 4 sur 5 avant de comprendre." },
      { id: "s1-2", type: "content", title: "#1 — Poster sans régularité", body: "L'algorithme récompense la constance, pas la perfection.", bulletPoints: [] },
      { id: "s1-3", type: "content", title: "#2 — Parler à tout le monde", body: "Un message qui cible tout le monde ne touche personne.", bulletPoints: [] },
      { id: "s1-4", type: "content", title: "#3 — Copier les autres créateurs", body: "Votre audience vous suit pour VOUS. L'authenticité bat toujours l'imitation.", bulletPoints: [] },
      { id: "s1-5", type: "cta", title: "Sauvegardez ce post pour ne plus les faire ✅", body: "Créé avec FlowSlides." },
    ],
  },
  {
    id: "2",
    title: "Comment j'ai 2x mon salaire en 6 mois",
    description: "Une histoire personnelle inspirante sur la négociation salariale, format LinkedIn portrait.",
    network: "linkedin",
    format: "4:5",
    theme: {
      id: "corporate",
      name: "Corporate",
      bgColor: "#F8FAFC",
      textColor: "#0F172A",
      accentColor: "#3B82F6",
      fontFamily: "Inter",
      tier: "free",
    },
    tags: ["Carrière", "Inspirant"],
    slides: [
      { id: "s2-1", type: "hook", title: "Il y a 6 mois, je gagnais 35K€. Aujourd'hui : 70K€. Voici exactement comment.", body: "Pas de chance. Pas de réseau. Juste une méthode." },
      { id: "s2-2", type: "content", title: "Étape 1 — Cartographier le marché", body: "J'ai analysé 200+ offres d'emploi pour comprendre ce que le marché payait.", bulletPoints: ["Levels.fyi pour les tech", "Glassdoor pour les autres secteurs", "Interviews info avec des pairs"] },
      { id: "s2-3", type: "content", title: "Étape 2 — Construire ma BATNA", body: "Sans alternative, vous n'avez aucun pouvoir de négociation.", bulletPoints: [] },
      { id: "s2-4", type: "content", title: "Étape 3 — La conversation décisive", body: "\"Je suis enthousiaste à l'idée de rejoindre l'équipe. J'ai reçu une offre à 65K€ — pouvez-vous vous aligner ?\"", bulletPoints: [] },
      { id: "s2-5", type: "cta", title: "Créé avec FlowSlides 🚀", body: "Générez votre prochain carousel en moins d'une minute." },
    ],
  },
  {
    id: "3",
    title: "Le guide ultime du morning routine",
    description: "Un carousel éducatif et esthétique pour Instagram, format carré avec thème chaleureux.",
    network: "instagram",
    format: "1:1",
    theme: {
      id: "warm",
      name: "Chaleureux",
      bgColor: "#FFFBEB",
      textColor: "#78350F",
      accentColor: "#F59E0B",
      fontFamily: "Inter",
      tier: "free",
    },
    tags: ["Lifestyle", "Éducatif"],
    slides: [
      { id: "s3-1", type: "hook", title: "La morning routine qui a changé ma vie (et elle prend 20 min)", body: "Testée par 10 000 personnes. Approuvée par la science." },
      { id: "s3-2", type: "content", title: "6h00 — L'éveil en douceur", body: "Pas de téléphone pendant les 30 premières minutes.", bulletPoints: ["Ouvrir les volets", "Boire un grand verre d'eau", "5 respirations profondes"] },
      { id: "s3-3", type: "content", title: "6h10 — Le mouvement", body: "10 minutes suffisent. La régularité prime sur l'intensité.", bulletPoints: [] },
      { id: "s3-4", type: "content", title: "6h20 — L'intention du jour", body: "Écrivez 3 choses : gratitude, priorité #1, affirmation.", bulletPoints: [] },
      { id: "s3-5", type: "cta", title: "Créé avec FlowSlides 🌅", body: "Générez vos propres carousels en quelques clics." },
    ],
  },
  {
    id: "4",
    title: "3 recettes healthy en moins de 15 min",
    description: "Des recettes rapides présentées dans un format carré coloré, idéal pour Instagram.",
    network: "instagram",
    format: "1:1",
    theme: {
      id: "creative",
      name: "Créatif",
      bgColor: "#FDF4FF",
      textColor: "#701A75",
      accentColor: "#D946EF",
      fontFamily: "Space Grotesk",
      tier: "free",
    },
    tags: ["Food", "Lifestyle"],
    slides: [
      { id: "s4-1", type: "hook", title: "3 repas healthy que vous pouvez préparer en 15 minutes chrono ⏱️", body: "Pour ceux qui n'ont pas le temps mais veulent bien manger." },
      { id: "s4-2", type: "content", title: "🥗 Recette #1 — Buddha bowl express", body: "Quinoa pré-cuit + légumes rôtis + avocat + sauce tahini.", bulletPoints: ["Protéines : 22g", "Calories : 480 kcal", "Coût : ~3,50€"] },
      { id: "s4-3", type: "content", title: "🍳 Recette #2 — Œufs brouillés au saumon", body: "3 œufs + saumon fumé + cream cheese + ciboulette sur pain complet.", bulletPoints: ["Protéines : 34g", "Calories : 420 kcal"] },
      { id: "s4-4", type: "content", title: "🍜 Recette #3 — Soupe miso express", body: "Pâte miso + tofu soyeux + algues wakamé. Umami en 3 minutes.", bulletPoints: ["Protéines : 12g", "Calories : 180 kcal"] },
      { id: "s4-5", type: "cta", title: "Créé avec FlowSlides 📌", body: "Créez vos propres carousels food en quelques clics." },
    ],
  },
  {
    id: "5",
    title: "Pourquoi l'IA ne remplacera pas les développeurs",
    description: "Un carousel argumentatif pour LinkedIn avec une approche éducative et nuancée.",
    network: "linkedin",
    format: "4:5",
    theme: {
      id: "ocean",
      name: "Océan",
      bgColor: "#0C4A6E",
      textColor: "#F0F9FF",
      accentColor: "#38BDF8",
      fontFamily: "Space Grotesk",
      tier: "free",
    },
    tags: ["Tech", "IA", "Éducatif"],
    slides: [
      { id: "s5-1", type: "hook", title: "L'IA ne remplacera pas les développeurs. Mais voici ce qui va vraiment changer.", body: "Une analyse sans alarmisme ni naïveté." },
      { id: "s5-2", type: "content", title: "Ce que l'IA fait bien aujourd'hui", body: "Autocomplétion, génération de boilerplate, debugging simple.", bulletPoints: [] },
      { id: "s5-3", type: "content", title: "Ce que l'IA ne sait pas faire", body: "Comprendre le contexte métier, concevoir une architecture.", bulletPoints: ["Pensée systémique", "Empathie utilisateur", "Négociation technique"] },
      { id: "s5-4", type: "content", title: "Le vrai risque : l'inégalité", body: "Les devs qui maîtrisent l'IA seront 10x plus productifs.", bulletPoints: [] },
      { id: "s5-5", type: "cta", title: "Créé avec FlowSlides 💬", body: "Partagez votre vision en commentaire." },
    ],
  },
  {
    id: "6",
    title: "Voyage au Japon : 10 jours pour 800€",
    description: "Un guide de voyage budgétaire présenté en format Instagram carré avec un thème minimaliste.",
    network: "instagram",
    format: "1:1",
    theme: {
      id: "minimal",
      name: "Minimaliste",
      bgColor: "#FFFFFF",
      textColor: "#1A1A2E",
      accentColor: "#7C3AED",
      fontFamily: "Space Grotesk",
      tier: "free",
    },
    tags: ["Voyage", "Budget"],
    slides: [
      { id: "s6-1", type: "hook", title: "10 jours au Japon pour 800€ tout compris. Voici comment j'ai fait. 🗾", body: "Sans couper sur l'expérience." },
      { id: "s6-2", type: "content", title: "✈️ Vol — 280€ aller-retour", body: "Réservé 4 mois à l'avance. Escale à Helsinki, +3h mais -180€.", bulletPoints: [] },
      { id: "s6-3", type: "content", title: "🏨 Logement — 180€ pour 10 nuits", body: "Hostels capsules à Tokyo, Ryokan à Kyoto. Expérience authentique.", bulletPoints: [] },
      { id: "s6-4", type: "content", title: "🍜 Nourriture — 120€ sur 10 jours", body: "Convenience stores, ramen à 8€. La streetfood japonaise est incroyable.", bulletPoints: ["Eviter les restaurants touristiques", "Japan Rail Pass vaut le coup"] },
      { id: "s6-5", type: "cta", title: "Créé avec FlowSlides 🔖", body: "Générez votre prochain carousel voyage en quelques clics." },
    ],
  },
];