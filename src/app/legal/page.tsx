"use client";

import { Building2, Globe, Mail, Phone, Server, Shield } from "lucide-react";
import {
  LegalSection,
  LegalTopBar,
  LegalHero,
  LegalIntroCard,
  LegalLayout,
  LegalContactCard,
  LegalSection as LegalSectionBlock,
} from "@/components/legal/LegalPage";

const sections: LegalSection[] = [
  {
    id: "editeur",
    icon: Building2,
    title: "1. Éditeur du site",
    content: `Le site flow-slides.reelium.fr est édité par :

Reelium
Entrepreneur individuel (EI)
SIREN : 991 971 953
Siège social : 134 rue Saint-Maurice, 80080 Amiens, France
Email : contact@reelium.fr

Directeur de la publication : Antoine Coutreel`,
  },
  {
    id: "hebergement",
    icon: Server,
    title: "2. Hébergement",
    content: `Le site est hébergé par :

Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723
États-Unis
Site web : https://vercel.com

Les données peuvent être stockées sur des serveurs situés en Europe ou aux États-Unis, dans le respect du RGPD et des clauses contractuelles types de la Commission européenne.`,
  },
  {
    id: "propriete",
    icon: Shield,
    title: "3. Propriété intellectuelle",
    content: `L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de Reelium ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Reelium.

Toute exploitation non autorisée du site ou de l'un quelconque de ces éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.`,
  },
  {
    id: "donnees",
    icon: Globe,
    title: "4. Données personnelles",
    content: `Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.

Pour exercer ces droits, vous pouvez contacter Reelium à l'adresse suivante : contact@reelium.fr

Vous pouvez également introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — https://www.cnil.fr — si vous estimez que vos droits ne sont pas respectés.

Pour en savoir plus sur la gestion de vos données personnelles, consultez notre Politique de Confidentialité.`,
  },
  {
    id: "cookies",
    icon: Globe,
    title: "5. Cookies",
    content: `Le site flow-slides.reelium.fr est susceptible d'utiliser des cookies afin d'améliorer l'expérience utilisateur et de réaliser des statistiques d'audience.

— Cookies fonctionnels : nécessaires au bon fonctionnement du site (session, préférences).
— Cookies analytiques : permettant de mesurer l'audience du site (Vercel Analytics).
— Cookies tiers : liés aux services intégrés (authentification, paiement).

Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est envoyé. Certaines fonctionnalités du site pourraient ne plus être accessibles dans ce cas.`,
  },
  {
    id: "responsabilite",
    icon: Shield,
    title: "6. Limitation de responsabilité",
    content: `Reelium s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Reelium ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.

Reelium décline toute responsabilité pour :

— Toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
— Tout dommage résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site.
— Et plus généralement, tout dommage, direct ou indirect, quelles qu'en soient les causes, origines, natures ou conséquences.

Ce site peut contenir des liens vers des sites tiers. Reelium ne saurait être tenu responsable du contenu de ces sites, ni des éventuels dommages résultant de leur utilisation.`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "7. Contact",
    content: `Pour toute question relative au site ou à ces mentions légales, vous pouvez nous contacter par les moyens suivants :

Email : contact@reelium.fr
Adresse postale : 134 rue Saint-Maurice, 80080 Amiens, France

Nous nous engageons à répondre à toute demande dans les meilleurs délais, et au plus tard sous 30 jours ouvrables conformément aux exigences légales.`,
  },
  {
    id: "droit",
    icon: Phone,
    title: "8. Droit applicable",
    content: `Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les parties s'engagent à rechercher une solution amiable préalablement à tout recours judiciaire.

À défaut d'accord amiable, tout litige sera soumis à la compétence exclusive des tribunaux de Paris.

Ces mentions légales ont été rédigées conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).`,
  },
];

export default function LegaleNoticesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LegalTopBar updatedAt="23 février 2026" />

      <LegalHero
        badge="Document légal"
        badgeIcon={Building2}
        title="Mentions"
        titleAccent="Légales"
        subtitle="Informations légales relatives à l'éditeur, l'hébergeur et l'utilisation du site flow-slides.reelium.fr."
      />

      <LegalLayout sections={sections}>
        <LegalIntroCard>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la <strong>confiance dans l&apos;économie numérique</strong>, il est précisé aux utilisateurs du site flow-slides.reelium.fr l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </LegalIntroCard>

        {sections.map((section, index) => (
          <LegalSectionBlock key={section.id} section={section} index={index} />
        ))}

        <LegalContactCard
          title="Une question d'ordre légal ?"
          description="Notre équipe est disponible pour répondre à toute demande concernant les mentions légales."
          email="contact@reelium.fr"
          cta="Contacter Reelium"
        />
      </LegalLayout>
    </div>
  );
}