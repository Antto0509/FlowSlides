"use client";

import { useState } from "react";
import { login, signup, loginWithGoogle } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const errorMessages: Record<string, string> = {
  credentials: "Email ou mot de passe incorrect.",
  signup: "Impossible de créer le compte. Cet email est peut-être déjà utilisé.",
  oauth: "Erreur avec Google. Réessaie dans un instant.",
  auth: "Erreur d'authentification. Réessaie.",
};

const successMessages: Record<string, string> = {
  "check-email": "Vérifie ta boîte mail pour confirmer ton compte.",
};

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState<"email" | "google" | null>(null);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  const handleEmailAction = async (formData: FormData) => {
    setLoading("email");
    if (mode === "login") {
      await login(formData);
    } else {
      await signup(formData);
    }
    setLoading(null);
  };

  const handleGoogle = async () => {
    setLoading("google");
    await loginWithGoogle();
    setLoading(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-black text-xl tracking-tight">FlowSlides</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-2xl shadow-black/5">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "login" ? "Bon retour 👋" : "Créer un compte"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {mode === "login"
                ? "Connecte-toi pour continuer sur FlowSlides."
                : "Rejoins FlowSlides et commence à créer."}
            </p>
          </div>

          {/* Error / Success messages */}
          <AnimatePresence mode="wait">
            {error && errorMessages[error] && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
              >
                {errorMessages[error]}
              </motion.div>
            )}
            {message && successMessages[message] && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 rounded-lg bg-primary/10 border border-primary/20 px-4 py-3 text-sm text-primary"
              >
                {successMessages[message]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-2 font-medium mb-4"
            onClick={handleGoogle}
            disabled={loading !== null}
          >
            {loading === "google" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continuer avec Google
          </Button>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Email form */}
          <form action={handleEmailAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="toi@exemple.com"
                required
                className="h-11"
                disabled={loading !== null}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={mode === "signup" ? "8 caractères minimum" : "••••••••"}
                required
                minLength={mode === "signup" ? 8 : undefined}
                className="h-11"
                disabled={loading !== null}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-semibold gap-2 gradient-primary border-0 shadow-lg shadow-primary/25 hover:opacity-90"
              disabled={loading !== null}
            >
              {loading === "email" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Se connecter" : "Créer mon compte"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle login/signup */}
          <p className="text-center text-sm text-muted-foreground mt-5">
            {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary font-medium hover:underline underline-offset-4"
            >
              {mode === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Retour à l'accueil
          </Link>
        </p>
      </motion.div>
    </div>
  );
}