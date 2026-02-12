import { create } from "zustand";
import type { CarouselStore } from "@/types/editor";

/**
 * Store global de l’application  
 * → gère l’état de tous les steps du flow
 */
export const useCarouselStore = create<CarouselStore>((set) => ({
  // ===== STATE =====
  sujet: "",
  audience: "",
  ton: "",
  plateforme: "linkedin",

  hook: null,

  // 🔥 séparation claire
  templateFamily: null,     // dérivé du hook
  templateVariant: null,    // choisi par l’utilisateur

  carousel: null,

  format: "1:1",
  step: 1,

  // ===== ACTIONS =====

  setInputs: ({ sujet, audience, ton, plateforme, format }) =>
    set(() => ({
      sujet,
      audience,
      ton,
      plateforme,
      format,
      step: 2,
    })),

  setHook: (hook) =>
    set(() => ({
      hook,
      templateFamily: hook?.templateType || null,
      templateVariant: null, // reset si nouveau hook
      carousel: null,
      step: 3,
    })),

  setTemplateVariant: (variantId) =>
    set(() => ({
      templateVariant: variantId,
      carousel: null,
      step: 4,
    })),

  setCarousel: (carousel) =>
    set(() => ({
      carousel,
      step: 5,
    })),

  setFormat: (format) =>
    set(() => ({ format })),

  resetAll: () =>
    set(() => ({
      sujet: "",
      audience: "",
      ton: "",
      plateforme: "linkedin",
      hook: null,
      templateFamily: null,
      templateVariant: null,
      carousel: null,
      format: "1:1",
      step: 1,
    })),

    updateCTAText(newContent) {
      set(() => {
        if (!this.carousel) return {};
        return {
          carousel: {
            ...this.carousel,
            cta: {
              ...this.carousel.cta,
              content: newContent,
            },
            isCTAModified: true,
          },
        };
      });
    }

}));
