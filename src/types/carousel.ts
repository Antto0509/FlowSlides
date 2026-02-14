export type Tone = "professional" | "inspiring" | "educational" | "humorous" | "provocative";
export type SocialNetwork = "linkedin" | "instagram";
export type SlideFormat = "4:5" | "1:1";

export interface CarouselFormData {
  subject: string;
  audience: string;
  tone: Tone;
  networks: SocialNetwork[];
  format: SlideFormat;
  slideCount: number;
}

export interface Hook {
  id: string;
  title: string;
  subtitle: string;
  style: string; // e.g. "question", "statistic", "bold statement"
}

export interface SlideContent {
  id: string;
  type: "hook" | "content" | "cta";
  title: string;
  body: string;
  bulletPoints?: string[];
}

export interface CarouselTheme {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
}

export interface CarouselData {
  formData: CarouselFormData;
  selectedHook: Hook | null;
  slides: SlideContent[];
  theme: CarouselTheme;
  authorName: string;
  authorAvatar: string | null;
}

export const TONES: { value: Tone; label: string; emoji: string }[] = [
  { value: "professional", label: "Professionnel", emoji: "💼" },
  { value: "inspiring", label: "Inspirant", emoji: "✨" },
  { value: "educational", label: "Éducatif", emoji: "📚" },
  { value: "humorous", label: "Humoristique", emoji: "😄" },
  { value: "provocative", label: "Provocateur", emoji: "🔥" },
];

export const DEFAULT_THEMES: CarouselTheme[] = [
  { id: "minimal", name: "Minimaliste", bgColor: "#FFFFFF", textColor: "#1A1A2E", accentColor: "#7C3AED", fontFamily: "Space Grotesk" },
  { id: "bold", name: "Bold", bgColor: "#1A1A2E", textColor: "#FFFFFF", accentColor: "#F43F5E", fontFamily: "Space Grotesk" },
  { id: "corporate", name: "Corporate", bgColor: "#F8FAFC", textColor: "#0F172A", accentColor: "#3B82F6", fontFamily: "Inter" },
  { id: "creative", name: "Créatif", bgColor: "#FDF4FF", textColor: "#701A75", accentColor: "#D946EF", fontFamily: "Space Grotesk" },
  { id: "warm", name: "Chaleureux", bgColor: "#FFFBEB", textColor: "#78350F", accentColor: "#F59E0B", fontFamily: "Inter" },
  { id: "ocean", name: "Océan", bgColor: "#0C4A6E", textColor: "#F0F9FF", accentColor: "#38BDF8", fontFamily: "Space Grotesk" },
];
