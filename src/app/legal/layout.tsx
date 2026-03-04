import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales de FlowSlides — Éditeur : Reelium (EI), SIREN 991 971 953, 134 rue Saint-Maurice, 80080 Amiens.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "Mentions Légales — FlowSlides",
    url: "/legal",
  },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
