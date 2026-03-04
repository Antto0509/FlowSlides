'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, CreditCard, Save, CheckCircle2, Clock, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { logout } from '@/app/login/action';
import { createClient } from '@/lib/supabase/client';
import { Subscription } from '@/types/pricing';

interface AccountClientProps {
  user: {
    email: string;
    created_at: string;
    first_name: string;
    last_name: string;
    email_confirmed_at: string | null;
    last_sign_in_at: string | null;
    provider: string;
  };
  subscription: Subscription;
}

function getPlanLabel(plan: string | undefined | null): string {
  switch (plan) {
    case 'pro_monthly': return 'Pro (mensuel)';
    case 'pro_annual': return 'Pro (annuel)';
    case 'king_monthly': return 'King (mensuel)';
    case 'king_annual': return 'King (annuel)';
    default: return 'Free';
  }
}

function getStatusLabel(status: string | undefined | null): string {
  switch (status) {
    case 'active': return 'Actif';
    case 'trialing': return 'Essai en cours';
    case 'canceled': return 'Annulé';
    case 'past_due': return 'Paiement en retard';
    default: return 'Gratuit';
  }
}

function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString('fr-FR', opts ?? { day: 'numeric', month: 'long', year: 'numeric' });
}

export function AccountClient({ user, subscription }: AccountClientProps) {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [saving, setSaving] = useState(false);

  const isPaid = subscription?.status === 'active' && subscription?.plan !== 'free';
  const avatarLetter = (firstName || user.email)[0].toUpperCase();

  const handleSaveProfile = async () => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { first_name: firstName.trim(), last_name: lastName.trim() },
    });
    setSaving(false);
    if (error) {
      toast.error('Impossible de sauvegarder le profil.');
    } else {
      toast.success('Profil mis à jour.');
    }
  };

  const handlePortal = async () => {
    const res = await fetch('/api/stripe/portal', { method: 'POST' });
    const { url, error } = await res.json();
    if (error || !url) {
      toast.error("Impossible d'ouvrir le portail de facturation.");
      return;
    }
    window.location.href = url;
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mon compte</h1>

      {/* Profil */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 mb-4">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0">
            {avatarLetter}
          </div>
          <div className="min-w-0 flex-1">
            {/* Email + badge vérifié */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-semibold truncate">{user.email}</p>
              {user.email_confirmed_at && (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              )}
            </div>

            {/* Méta-infos */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              <span className="text-sm text-muted-foreground">
                Membre depuis {formatDate(user.created_at, { month: 'long', year: 'numeric' })}
              </span>
              {user.last_sign_in_at && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Dernière connexion : {formatDate(user.last_sign_in_at)}
                </span>
              )}
            </div>

            {/* Fournisseur d'auth */}
            <div className="mt-2">
              {user.provider === 'google' ? (
                <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-border/60 bg-muted/40 text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  Connecté via Google
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-border/60 bg-muted/40 text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  Connecté via Email
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Champs nom */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Votre prénom"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Votre nom"
            />
          </div>
        </div>

        <Button size="sm" onClick={handleSaveProfile} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </Button>
      </div>

      {/* Abonnement */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 mb-4">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Abonnement
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{getPlanLabel(subscription?.plan)}</p>
            <p className="text-sm text-muted-foreground">{getStatusLabel(subscription?.status)}</p>
            {isPaid && subscription?.current_period_end && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Renouvellement le {formatDate(subscription.current_period_end)}
              </p>
            )}
          </div>
          {isPaid ? (
            <Button variant="outline" size="sm" onClick={handlePortal}>
              Gérer la facturation
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/pricing">Passer à Pro</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Thème personnalisé (branding) (seulement pour les membres King) */}
      {subscription?.plan?.startsWith('king') && (
        <div className="rounded-2xl border border-border/50 bg-card p-6 mb-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Thème personnalisé
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Vos couleurs et police personnalisées sont disponibles directement dans l&apos;éditeur de carrousel, via le menu <strong>Thèmes → Branding personnalisé</strong>.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/create-carousel">Créer un carrousel</Link>
          </Button>
        </div>
      )}

      {/* Déconnexion */}
      <Button
        variant="ghost"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => logout()}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Se déconnecter
      </Button>
    </div>
  );
}
