"use client";

import { Building2, Database, Globe, Lock, Mail, RefreshCw, Shield, UserCheck } from "lucide-react";
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
    id: "responsable",
    icon: Building2,
    title: "1. Responsable du traitement",
    content: `Le responsable du traitement des données personnelles collectées via flow-slides.reelium.fr est :

Reelium
Entrepreneur individuel (EI) — SIREN : 991 971 953
134 rue Saint-Maurice, 80080 Amiens, France
Email : contact@reelium.fr`,
  },
  {
    id: "collecte",
    icon: Database,
    title: "2. Données collectées",
    content: `Nous collectons uniquement les données nécessaires au bon fonctionnement de la plateforme. Selon votre utilisation, ces données peuvent inclure :

— Données d'identification : adresse email, nom d'utilisateur.
— Données de contenu : sujets, textes et paramètres saisis lors de la génération de carrousels.
— Données de navigation : adresse IP, type de navigateur, pages visitées, durée des sessions.
— Données de paiement : traitées directement par notre prestataire (Stripe) — Reelium ne stocke aucune donnée bancaire.

Nous ne collectons jamais de données sensibles au sens de l'article 9 du RGPD (origines ethniques, opinions politiques, données de santé, etc.).`,
  },
  {
    id: "finalites",
    icon: UserCheck,
    title: "3. Finalités du traitement",
    content: `Vos données sont traitées pour les finalités suivantes :

— Fourniture du service : création de compte, génération de carrousels, gestion des abonnements.
— Amélioration de la plateforme : analyse des usages pour corriger les bugs et améliorer l'expérience.
— Communication : envoi d'emails transactionnels (confirmation d'inscription, factures) et, avec votre consentement, d'emails marketing.
— Obligations légales : conservation des données de facturation conformément aux obligations fiscales et comptables.

Chaque traitement repose sur une base légale : exécution du contrat, intérêt légitime, consentement ou obligation légale.`,
  },
  {
    id: "conservation",
    icon: Lock,
    title: "4. Durée de conservation",
    content: `Nous conservons vos données uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :

— Données de compte : pendant toute la durée de votre abonnement actif, puis 3 ans après la clôture du compte.
— Données de contenu : jusqu'à suppression de votre compte ou demande d'effacement.
— Données de navigation et logs : 13 mois maximum.
— Données de facturation : 10 ans conformément aux obligations légales françaises (Code de commerce).

À l'expiration de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.`,
  },
  {
    id: "partage",
    icon: Globe,
    title: "5. Partage des données",
    content: `Reelium ne vend jamais vos données personnelles à des tiers. Nous pouvons partager vos données avec des sous-traitants strictement sélectionnés pour les besoins du service :

— Vercel Inc. : hébergement de la plateforme (États-Unis — clauses contractuelles types).
— Anthropic PBC : traitement des requêtes d'intelligence artificielle (États-Unis — clauses contractuelles types).
— Stripe Inc. : traitement des paiements (États-Unis — certification PCI-DSS).
— Brevo : envoi d'emails transactionnels.

Ces sous-traitants sont contractuellement tenus de respecter la confidentialité et la sécurité de vos données, et ne peuvent les utiliser qu'aux fins pour lesquelles nous les leur communiquons.`,
  },
  {
    id: "droits",
    icon: Shield,
    title: "6. Vos droits",
    content: `Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :

— Droit d'accès : obtenir une copie des données vous concernant.
— Droit de rectification : corriger des données inexactes ou incomplètes.
— Droit à l'effacement : demander la suppression de vos données (« droit à l'oubli »).
— Droit à la limitation : restreindre temporairement le traitement de vos données.
— Droit à la portabilité : recevoir vos données dans un format structuré et lisible.
— Droit d'opposition : vous opposer à un traitement basé sur l'intérêt légitime.
— Droit de retirer votre consentement : à tout moment, sans que cela n'affecte la licéité des traitements antérieurs.

Pour exercer vos droits, contactez-nous à l'adresse contact@reelium.fr en précisant votre demande. Nous vous répondrons dans un délai maximum de 30 jours. Vous pouvez également introduire une réclamation auprès de la CNIL : https://www.cnil.fr`,
  },
  {
    id: "securite",
    icon: Lock,
    title: "7. Sécurité des données",
    content: `Reelium met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou divulgation :

— Chiffrement des données en transit (HTTPS/TLS) et au repos.
— Authentification sécurisée et gestion des accès à privilèges minimaux.
— Journalisation et surveillance des accès aux systèmes.
— Mises à jour régulières des dépendances et correctifs de sécurité.

En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, nous nous engageons à notifier la CNIL dans les 72 heures et à vous en informer dans les meilleurs délais.`,
  },
  {
    id: "cookies",
    icon: Globe,
    title: "8. Cookies et traceurs",
    content: `Nous utilisons des cookies strictement nécessaires au fonctionnement de la plateforme (session, authentification) ainsi que des cookies analytiques pour mesurer l'audience.

— Cookies essentiels : aucun consentement requis, nécessaires au service.
— Cookies analytiques (Vercel Analytics) : anonymisés, ne nécessitent pas de consentement selon les recommandations CNIL.
— Cookies tiers : uniquement si vous vous connectez via un service tiers (Google OAuth, etc.).

Vous pouvez à tout moment désactiver les cookies non essentiels via les paramètres de votre navigateur. Cela peut affecter certaines fonctionnalités de la plateforme.`,
  },
  {
    id: "modifications",
    icon: RefreshCw,
    title: "9. Modifications de la politique",
    content: `Reelium se réserve le droit de modifier la présente politique de confidentialité à tout moment, notamment pour se conformer à de nouvelles obligations légales ou à l'évolution de nos services.

En cas de modification substantielle, vous serez informé par email ou via une notification sur la plateforme au moins 15 jours avant l'entrée en vigueur des changements.

La version en vigueur est toujours accessible à l'adresse : https://flow-slides.reelium.fr/privacy`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "10. Contact et délégué à la protection des données",
    content: `Pour toute question relative à la présente politique ou à l'exercice de vos droits, vous pouvez contacter Reelium :

Email : contact@reelium.fr
Adresse : 134 rue Saint-Maurice, 80080 Amiens, France

En tant qu'entrepreneur individuel, Reelium n'est pas soumis à l'obligation de désigner un Délégué à la Protection des Données (DPO). Toutefois, toute demande relative à vos données sera traitée avec la plus grande attention.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <LegalTopBar updatedAt="23 février 2026" />

      <LegalHero
        badge="Document légal"
        badgeIcon={Shield}
        title="Politique de"
        titleAccent="Confidentialité"
        subtitle="Nous nous engageons à protéger vos données personnelles. Découvrez comment nous les collectons, les utilisons et les sécurisons."
      />

      <LegalLayout sections={sections}>
        <LegalIntroCard>
          Chez Reelium, la protection de vos données personnelles est une priorité. Cette politique de confidentialité vous informe de manière transparente sur la façon dont nous collectons, utilisons et protégeons vos données dans le cadre de l&apos;utilisation de <strong>FlowSlides</strong>, conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong> et à la loi Informatique et Libertés.
        </LegalIntroCard>

        {sections.map((section, index) => (
          <LegalSectionBlock key={section.id} section={section} index={index} />
        ))}

        <LegalContactCard
          title="Une question sur vos données ?"
          description="Nous nous engageons à répondre à toute demande dans un délai maximum de 30 jours."
          email="contact@reelium.fr"
          cta="Contacter Reelium"
        />
      </LegalLayout>
    </div>
  );
}