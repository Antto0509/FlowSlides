/**
 * Types et registre des templates disponibles dans l’application
 * → chaque template a un ID, un nom et des styles de preview
 */
export type TemplateVariant = {
  id: string;
  name: string;
  preview: {
    bg: string;
    title: string;
    accent: string;
  };
};

/**
 * Registre des templates disponibles dans l’application
 * → organisé par famille de template (correspondant au type de hook)
 * → chaque template a un ID, un nom et des styles de preview
 */
export const templatesRegistry = {
  // =============================
  // PROMESSE → hook_valeur
  // =============================
  hook_valeur: [
    {
      id: "valeur_clean",
      name: "Clean Pro",
      preview: {
        bg: "bg-white",
        title: "font-bold text-2xl",
        accent: "text-primary",
      },
    },
    {
      id: "valeur_dark",
      name: "Dark Impact",
      preview: {
        bg: "bg-black",
        title: "font-extrabold text-3xl",
        accent: "text-emerald-400",
      },
    },
    {
      id: "valeur_gradient",
      name: "Modern Gradient",
      preview: {
        bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
        title: "font-bold text-3xl",
        accent: "text-white",
      },
    },
  ],

  // =============================
  // LISTE
  // =============================
  liste: [
    {
      id: "liste_minimal",
      name: "Minimal",
      preview: {
        bg: "bg-gray-50",
        title: "font-semibold text-xl",
        accent: "text-primary",
      },
    },
    {
      id: "liste_bold",
      name: "Bold Creator",
      preview: {
        bg: "bg-primary",
        title: "font-black text-3xl",
        accent: "text-white",
      },
    },
    {
      id: "liste_card",
      name: "Card Layout",
      preview: {
        bg: "bg-white",
        title: "font-bold text-2xl",
        accent: "text-indigo-600",
      },
    },
  ],

  // =============================
  // AVANT / APRÈS
  // =============================
  avant_apres: [
    {
      id: "avant_split",
      name: "Split Contrast",
      preview: {
        bg: "bg-gradient-to-r from-red-500 to-green-500",
        title: "font-bold text-2xl",
        accent: "text-white",
      },
    },
    {
      id: "avant_clean",
      name: "Soft Minimal",
      preview: {
        bg: "bg-gray-100",
        title: "font-semibold text-2xl",
        accent: "text-gray-800",
      },
    },
    {
      id: "avant_dark",
      name: "Dark Evolution",
      preview: {
        bg: "bg-zinc-900",
        title: "font-bold text-3xl",
        accent: "text-lime-400",
      },
    },
  ],

  // =============================
  // PUNCHLINE → visuel_insight
  // =============================
  visuel_insight: [
    {
      id: "insight_centered",
      name: "Centered Power",
      preview: {
        bg: "bg-white",
        title: "font-black text-4xl",
        accent: "text-black",
      },
    },
    {
      id: "insight_highlight",
      name: "Highlight Accent",
      preview: {
        bg: "bg-yellow-100",
        title: "font-extrabold text-3xl",
        accent: "text-yellow-700",
      },
    },
    {
      id: "insight_dark_glow",
      name: "Dark Glow",
      preview: {
        bg: "bg-black",
        title: "font-extrabold text-4xl",
        accent: "text-cyan-400",
      },
    },
  ],

  // =============================
  // GUIDE → mini_guide
  // =============================
  mini_guide: [
    {
      id: "guide_steps",
      name: "Structured Steps",
      preview: {
        bg: "bg-white",
        title: "font-bold text-2xl",
        accent: "text-primary",
      },
    },
    {
      id: "guide_modern",
      name: "Modern Blocks",
      preview: {
        bg: "bg-gray-900",
        title: "font-semibold text-2xl",
        accent: "text-emerald-400",
      },
    },
    {
      id: "guide_soft",
      name: "Soft Learning",
      preview: {
        bg: "bg-blue-50",
        title: "font-semibold text-2xl",
        accent: "text-blue-600",
      },
    },
  ],
} as const;
