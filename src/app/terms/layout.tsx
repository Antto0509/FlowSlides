import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description:
    "Conditions Générales d'Utilisation de FlowSlides — règles d'accès et d'utilisation de la plateforme de création de carrousels IA.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Conditions Générales d'Utilisation — FlowSlides",
    url: "/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
