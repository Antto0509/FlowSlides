import { Flame, LucideIcon,  Lightbulb, Smile, Target, TrendingUp, Users, GraduationCap, Sparkles, Briefcase } from "lucide-react";

export type Tone = "professional" | "inspiring" | "educational" | "humorous" | "provocative";
export type SocialNetwork = "linkedin" | "instagram";
export type SlideFormat = "4:5" | "1:1";

export interface CarouselFormData {
  subject: string;
  audience: string;
  tone: Tone;
  goal: string;
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
  tier: "free" | "pro" | "king";
}

export interface CarouselData {
  formData: CarouselFormData;
  selectedHook: Hook | null;
  slides: SlideContent[];
  theme: CarouselTheme;
  authorName: string;
  authorAvatar: string | null;
}

export const TONES: { value: Tone; label: string; icon: LucideIcon }[] = [
  { value: "professional", label: "Professionnel", icon: Briefcase },
  { value: "inspiring", label: "Inspirant", icon: Sparkles },
  { value: "educational", label: "Éducatif", icon: GraduationCap },
  { value: "humorous", label: "Humoristique", icon: Smile },
  { value: "provocative", label: "Provocateur", icon: Flame },
];

export const GOALS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "inform", label: "Informer", icon: Lightbulb },
  { value: "engage", label: "Engager", icon: Target },
  { value: "convert", label: "Convertir", icon: TrendingUp },
  { value: "inspire", label: "Inspirer", icon: Users },
];

export const DEFAULT_THEMES: CarouselTheme[] = [
  // ── Free (5) ──────────────────────────────────────────────────────────────
  { id: "minimal",   name: "Minimaliste",       bgColor: "#FFFFFF", textColor: "#1A1A2E", accentColor: "#7C3AED", fontFamily: "Space Grotesk", tier: "free" },
  { id: "bold",      name: "Bold",              bgColor: "#1A1A2E", textColor: "#FFFFFF", accentColor: "#F43F5E", fontFamily: "Space Grotesk", tier: "free" },
  { id: "corporate", name: "Corporate",         bgColor: "#F8FAFC", textColor: "#0F172A", accentColor: "#3B82F6", fontFamily: "Inter",         tier: "free" },
  { id: "creative",  name: "Créatif",           bgColor: "#FDF4FF", textColor: "#701A75", accentColor: "#D946EF", fontFamily: "Space Grotesk", tier: "free" },
  { id: "warm",      name: "Chaleureux",        bgColor: "#FFFBEB", textColor: "#78350F", accentColor: "#F59E0B", fontFamily: "Inter",         tier: "free" },
  // ── Pro (6) ───────────────────────────────────────────────────────────────
  { id: "ocean",     name: "Océan",             bgColor: "#0C4A6E", textColor: "#F0F9FF", accentColor: "#38BDF8", fontFamily: "Space Grotesk", tier: "pro"  },
  { id: "sunset",    name: "Coucher de soleil", bgColor: "#FFF7ED", textColor: "#7C2D12", accentColor: "#EA580C", fontFamily: "Inter",         tier: "pro"  },
  { id: "forest",    name: "Forêt",             bgColor: "#052E16", textColor: "#DCFCE7", accentColor: "#4ADE80", fontFamily: "Space Grotesk", tier: "pro"  },
  { id: "rose",      name: "Rose",              bgColor: "#FFF1F2", textColor: "#881337", accentColor: "#FB7185", fontFamily: "Inter",         tier: "pro"  },
  { id: "graphite",  name: "Graphite",          bgColor: "#18181B", textColor: "#F4F4F5", accentColor: "#22D3EE", fontFamily: "Space Grotesk", tier: "pro"  },
  { id: "sand",      name: "Sable",             bgColor: "#FAFAF7", textColor: "#44403C", accentColor: "#A16207", fontFamily: "Inter",         tier: "pro"  },
  // ── King (3) ──────────────────────────────────────────────────────────────
  { id: "midnight",  name: "Minuit doré",       bgColor: "#0C0A09", textColor: "#FEF9C3", accentColor: "#EAB308", fontFamily: "Space Grotesk", tier: "king" },
  { id: "neon",      name: "Neon",              bgColor: "#09090B", textColor: "#FAFAFA", accentColor: "#A855F7", fontFamily: "Space Grotesk", tier: "king" },
  { id: "aurora",    name: "Aurora",            bgColor: "#0F172A", textColor: "#E2E8F0", accentColor: "#818CF8", fontFamily: "Inter",         tier: "king" },
];
