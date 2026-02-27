# FlowSlides — CLAUDE.md

## Project Overview

FlowSlides is a Next.js SaaS application that generates AI-powered social media carousels. Users fill in a form, Claude generates hooks and slide content, and they can edit then export to PNG or PDF.

**Three-step user workflow:**
1. Fill carousel form (subject, audience, tone, platform)
2. Select an AI-generated hook (opening line)
3. Edit slides in WYSIWYG editor → export

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (new-york style) |
| Auth | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) |
| Payments | Stripe (checkout, portal, webhooks) |
| AI | Anthropic SDK (`@anthropic-ai/sdk`) |
| Export | html2canvas + jsPDF + jszip |
| Animations | Motion, Lenis, OGL (WebGL) |
| Notifications | Sonner (toast) |
| Validation | Zod |

---

## Dev Commands

```bash
npm run dev     # Start dev server at :3000
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

No test framework is configured.

---

## Project Structure

```
src/
├── app/                       # Next.js App Router
│   ├── api/
│   │   ├── auth/callback/     # OAuth callback (Supabase)
│   │   ├── hooks/             # Claude API: generate carousel content
│   │   └── stripe/
│   │       ├── checkout/      # Create Stripe checkout session
│   │       ├── portal/        # Stripe customer portal
│   │       └── webhook/       # Stripe webhook handler
│   ├── create-carousel/       # Main app page
│   ├── pricing/               # Pricing page
│   ├── login/                 # Auth page
│   ├── examples/              # Example carousels showcase
│   └── layout.tsx             # Root layout + providers
│
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── landing/               # Landing page sections
│   ├── pricing/               # PlanCard, PricingClient
│   ├── CarouselForm.tsx       # Step 1: content generation form
│   ├── HookSelection.tsx      # Step 2: hook selection UI
│   ├── SlideEditor.tsx        # Step 3: slide editing
│   ├── SlidePreview.tsx       # WYSIWYG preview
│   ├── ExportButtons.tsx      # PNG/PDF export
│   ├── ScrollableThumbnails.tsx
│   ├── Navigation.tsx
│   └── Footer.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Browser-side Supabase client
│   │   ├── server.ts          # Server-side Supabase client
│   │   └── middleware.ts      # Auth middleware
│   ├── stripe.ts              # Stripe client
│   └── utils.ts               # cn() utility (clsx + tailwind-merge)
│
├── hooks/
│   └── useExport.ts           # Export logic hook
│
└── types/
    ├── carousel.ts            # Core types (see below)
    ├── example.ts
    └── pricing.ts
```

---

## Core Types (`src/types/carousel.ts`)

```ts
type Tone = "professional" | "inspiring" | "educational" | "humorous" | "provocative"
type SocialNetwork = "linkedin" | "instagram"
type SlideFormat = "4:5" | "1:1"

interface CarouselFormData { subject, audience, tone, goal, networks, format, slideCount }
interface Hook { id, title, subtitle, style }
interface SlideContent { id, type, title, body, bulletPoints }
interface CarouselTheme { /* color + font config */ }
interface CarouselData { formData, hooks, selectedHook, slides, theme }
```

Six predefined themes: `minimal`, `bold`, `corporate`, `creative`, `warm`, `ocean`.

---

## Path Aliases

`@/*` maps to `./src/*` — always use this for imports within `src/`.

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_APP_NAME        # used in layout/metadata
ANTHROPIC_API_KEY           # or equivalent for Anthropic SDK
```

---

## Key Conventions

- **shadcn/ui**: Add components via `npx shadcn@latest add <component>`. Do not hand-write shadcn components.
- **Styling**: Use Tailwind utility classes. Use `cn()` from `@/lib/utils` to merge conditional classes.
- **Server vs Client**: Supabase has separate clients for server (`lib/supabase/server.ts`) and browser (`lib/supabase/client.ts`). Use the correct one.
- **Toasts**: Use Sonner (`import { toast } from "sonner"`) for user-facing notifications.
- **Icons**: Use `lucide-react`.
- **No tests**: There is no test framework — do not create test files.

---

## Architecture Notes

- The AI generation endpoint is at `app/api/hooks/` and calls the Anthropic SDK server-side.
- Export is handled client-side via `html2canvas` (render to image) and `jsPDF` (package to PDF).
- Auth is handled via Supabase SSR with a middleware at `lib/supabase/middleware.ts`.
- Stripe webhooks are at `/api/stripe/webhook` — ensure raw body parsing if modifying.
