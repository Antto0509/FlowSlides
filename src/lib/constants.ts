import { Audience, HookType, Tone } from "@/types/editor"

export const APP_NAME = "FlowSlides"
export const APP_DESC = "Create stunning presentations with ease."
export const SITE_URL = "https://flowslides.reelium.fr"
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const AUDIENCE_OPTIONS: { value: Audience, label: string }[] = [
    { value: "freelance", label: "Freelance" },
    { value: "solopreneur", label: "Solopreneur" },
    { value: "client", label: "Client" },
    { value: "tech", label: "Tech" },
    { value: "non_tech", label: "Non-tech" },
]

export const TONE_OPTIONS: { value: Tone, label: string }[] = [
    { value: "neutre", label: "Neutre" },
    { value: "direct", label: "Direct" },
    { value: "inspirant", label: "Inspirant" },
    { value: "tranche", label: "Tranche de vie" },
]

export const HOOK_TYPES: HookType[] = [
  "promesse",
  "liste",
  "avant_apres",
  "guide",
  "punchline",
];
