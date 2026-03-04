import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exemples de carrousels",
  description:
    "Découvrez des exemples de carrousels LinkedIn et Instagram créés avec FlowSlides. Inspirez-vous et créez le vôtre en quelques clics grâce à l'IA.",
  alternates: { canonical: "/examples" },
  openGraph: {
    title: "Exemples de carrousels LinkedIn & Instagram — FlowSlides",
    description:
      "Parcourez des carrousels performants générés par IA pour trouver votre inspiration.",
    url: "/examples",
  },
};

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
