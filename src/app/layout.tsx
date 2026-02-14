import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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

export const metadata: Metadata = {
  title: "FlowSlides - Créez des carrousels engageants en un clin d'œil",
  description:
    "FlowSlides est votre assistant de création de carrousels alimenté par l'IA. Générez des carrousels percutants pour LinkedIn et Instagram en quelques clics, adaptés à votre sujet et à votre audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
