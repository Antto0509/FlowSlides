import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

// h1, h2, h3, h4, h5, h6
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
});

// le reste du texte
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "FlowSlides";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  applicationName: appName,
  title: {
    default: `${appName} — Créez des carrousels LinkedIn & Instagram avec l'IA`,
    template: `%s | ${appName}`,
  },
  description:
    "FlowSlides génère des carrousels percutants pour LinkedIn et Instagram grâce à l'IA. Décrivez votre sujet, choisissez votre ton, exportez en PNG ou PDF en moins de 2 minutes.",
  keywords: [
    "carrousel LinkedIn",
    "carrousel Instagram",
    "créateur de carrousel IA",
    "générateur de contenu social media",
    "outil carrousel professionnel",
    "FlowSlides",
  ],
  authors: [{ name: "Reelium", url: appUrl }],
  creator: "Antoine Coutreel",
  publisher: "Reelium",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: appUrl,
    siteName: appName,
    title: `${appName} — Créateur de carrousels IA pour LinkedIn & Instagram`,
    description:
      "Générez des carrousels professionnels pour LinkedIn et Instagram grâce à l'IA en moins de 2 minutes.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FlowSlides — Créateur de carrousels IA pour LinkedIn et Instagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} — Carrousels LinkedIn & Instagram générés par l'IA`,
    description:
      "Générez des carrousels professionnels pour LinkedIn et Instagram grâce à l'IA en moins de 2 minutes.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Reelium",
  url: appUrl,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "French",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "134 rue Saint-Maurice",
    addressLocality: "Amiens",
    postalCode: "80080",
    addressCountry: "FR",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: appName,
  url: appUrl,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  inLanguage: "fr",
  description:
    "FlowSlides génère des carrousels LinkedIn et Instagram grâce à l'IA en quelques clics.",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Pro", price: "10", priceCurrency: "EUR" },
    { "@type": "Offer", name: "King", price: "20", priceCurrency: "EUR" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
