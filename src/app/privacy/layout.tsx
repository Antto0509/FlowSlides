import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité de FlowSlides. Comment Reelium collecte et protège vos données personnelles conformément au RGPD et aux recommandations de la CNIL.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Politique de Confidentialité — FlowSlides",
    url: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
