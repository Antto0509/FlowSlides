"use client";

import { FileText, Lock, Scale, Shield, AlertTriangle, RefreshCw } from "lucide-react";
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
    id: "objet",
    icon: FileText,
    title: "1. Objet",
    content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme FlowSlides, accessible à l'adresse flow-slides.reelium.fr, et de l'ensemble des services associés.

En accédant à FlowSlides, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous devez cesser d'utiliser la plateforme immédiatement.

FlowSlides est édité par Reelium, société EI au capital de 0 euros, immatriculée au RCS de Amiens sous le numéro 991 971 953, dont le siège social est situé au 134 rue Saint-Maurice, 80080 Amiens.`,
  },
  {
    id: "services",
    icon: Shield,
    title: "2. Description des services",
    content: `FlowSlides est une plateforme de création de carrousels visuels assistée par intelligence artificielle, permettant notamment :

— La génération automatique de hooks et de contenus de slides à partir de paramètres définis par l'utilisateur.
— La personnalisation visuelle des carrousels (thèmes, formats, typographies).
— L'export des carrousels dans des formats compatibles avec les principaux réseaux sociaux (LinkedIn, Instagram).

FlowSlides se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services à tout moment, sans préavis ni indemnité.`,
  },
  {
    id: "compte",
    icon: Lock,
    title: "3. Création de compte",
    content: `L'accès à certaines fonctionnalités de FlowSlides nécessite la création d'un compte utilisateur. Vous vous engagez à :

— Fournir des informations exactes, complètes et à jour lors de votre inscription.
— Maintenir la confidentialité de vos identifiants de connexion.
— Notifier immédiatement FlowSlides de toute utilisation non autorisée de votre compte.

Vous êtes seul responsable de toute activité réalisée depuis votre compte. FlowSlides ne pourra être tenu responsable des dommages résultant du non-respect de ces obligations.

Un compte peut être créé uniquement par des personnes majeures (18 ans révolus) ou des entités légalement constituées.`,
  },
  {
    id: "utilisation",
    icon: Scale,
    title: "4. Conditions d'utilisation",
    content: `En utilisant FlowSlides, vous vous engagez à ne pas :

— Utiliser le service à des fins illicites ou contraires aux présentes CGU.
— Générer, stocker ou partager des contenus illégaux, diffamatoires, obscènes, menaçants ou portant atteinte aux droits de tiers.
— Tenter de porter atteinte à l'intégrité ou à la disponibilité des serveurs et systèmes de FlowSlides.
— Utiliser des robots, scrapers ou tout autre outil automatisé non autorisé pour accéder aux services.
— Revendre, sous-licencier ou exploiter commercialement les services sans autorisation écrite préalable.
— Contourner les mécanismes de sécurité ou les systèmes de limitation d'usage.

Tout manquement à ces obligations peut entraîner la suspension immédiate du compte, sans préjudice de tout recours en dommages et intérêts.`,
  },
  {
    id: "propriete",
    icon: FileText,
    title: "5. Propriété intellectuelle",
    content: `L'ensemble des éléments constituant FlowSlides (logiciels, algorithmes, interfaces graphiques, marques, logos, textes, images) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Contenus générés par l'IA : Les contenus produits via FlowSlides grâce aux modèles d'intelligence artificielle sont mis à la disposition de l'utilisateur sous licence non exclusive. Vous demeurez responsable de l'utilisation de ces contenus et devez vous assurer qu'ils ne portent pas atteinte aux droits de tiers.

Contenus utilisateur : Vous conservez la propriété des contenus que vous importez sur la plateforme. Vous accordez à FlowSlides une licence non exclusive, mondiale et gratuite pour les utiliser dans le seul but de fournir les services.`,
  },
  {
    id: "donnees",
    icon: Lock,
    title: "6. Protection des données personnelles",
    content: `FlowSlides traite vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.

Les données collectées (email, données d'usage, contenus générés) sont utilisées exclusivement pour la fourniture des services, l'amélioration de la plateforme et, avec votre consentement, à des fins de communication.

Vos droits : Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à l'adresse : contact@reelium.fr

Durée de conservation : Vos données sont conservées pendant la durée de votre relation contractuelle avec FlowSlides, puis pendant les délais légaux applicables.`,
  },
  {
    id: "responsabilite",
    icon: AlertTriangle,
    title: "7. Limitation de responsabilité",
    content: `FlowSlides s'efforce de maintenir la plateforme disponible et fonctionnelle, mais ne peut garantir une disponibilité ininterrompue. La responsabilité de FlowSlides ne saurait être engagée en cas de :

— Indisponibilité temporaire ou permanente du service.
— Perte de données ou de contenus générés.
— Dommages indirects résultant de l'utilisation ou de l'impossibilité d'utiliser les services.
— Inexactitude ou inadéquation des contenus générés par l'intelligence artificielle.

En tout état de cause, la responsabilité de FlowSlides est limitée aux sommes effectivement versées par l'utilisateur au cours des douze derniers mois précédant la survenance du dommage.`,
  },
  {
    id: "modifications",
    icon: RefreshCw,
    title: "8. Modifications des CGU",
    content: `FlowSlides se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme.

En cas de modification substantielle, FlowSlides s'engage à vous en informer par email ou via une notification sur la plateforme, au moins 15 jours avant l'entrée en vigueur des nouvelles conditions.

La poursuite de l'utilisation des services après notification des modifications vaut acceptation des nouvelles CGU. Si vous n'acceptez pas les nouvelles conditions, vous devez cesser d'utiliser les services et supprimer votre compte.`,
  },
  {
    id: "droit",
    icon: Scale,
    title: "9. Droit applicable et juridiction",
    content: `Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU, les parties s'engagent à rechercher une solution amiable préalablement à tout recours judiciaire.

À défaut d'accord amiable, tout litige sera soumis à la compétence exclusive des tribunaux de Paris, nonobstant pluralité de défendeurs ou appel en garantie.

Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l'adresse : contact@reelium.fr`,
  },
];

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-background">
      <LegalTopBar updatedAt="23 février 2026" />

      <LegalHero
        badge="Document légal"
        badgeIcon={Scale}
        title="Conditions Générales"
        titleAccent="d'Utilisation"
        subtitle="En utilisant FlowSlides, vous acceptez les présentes conditions. Prenez le temps de les lire attentivement."
      />

      <LegalLayout sections={sections}>
        <LegalIntroCard>
          Les présentes Conditions Générales d&apos;Utilisation constituent un contrat juridiquement contraignant entre vous (<strong>l&apos;utilisateur</strong>) et FlowSlides (<strong>l&apos;éditeur</strong>). Elles définissent les règles d&apos;accès et d&apos;utilisation de la plateforme. En cas de désaccord avec ces conditions, veuillez ne pas utiliser nos services.
        </LegalIntroCard>

        {sections.map((section, index) => (
          <LegalSectionBlock key={section.id} section={section} index={index} />
        ))}

        <LegalContactCard
          title="Des questions sur nos CGU ?"
          description="Notre équipe est disponible pour répondre à vos questions."
          email="contact@reelium.fr"
          cta="Contacter Reelium"
        />
      </LegalLayout>
    </div>
  );
}