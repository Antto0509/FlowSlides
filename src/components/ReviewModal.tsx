"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({ open, onOpenChange }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [authorCompany, setAuthorCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Veuillez sélectionner une note.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, content, author_name: authorName, author_role: authorRole, author_company: authorCompany }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }
      toast.success("Merci pour votre avis ! Il sera publié après modération.");
      onOpenChange(false);
      setRating(0);
      setContent("");
      setAuthorName("");
      setAuthorRole("");
      setAuthorCompany("");
    } catch (err: any) {
      toast.error(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const displayRating = hovered || rating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Laisser un avis</DialogTitle>
          <DialogDescription>
            Votre retour nous aide à améliorer FlowSlides et inspire d&apos;autres créateurs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Étoiles */}
          <div className="space-y-1.5">
            <Label>Note *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                  aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= displayRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Avis */}
          <div className="space-y-1.5">
            <Label htmlFor="review-content">Votre avis *</Label>
            <Textarea
              id="review-content"
              placeholder="Partagez votre expérience avec FlowSlides..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">{content.length}/500</p>
          </div>

          {/* Nom */}
          <div className="space-y-1.5">
            <Label htmlFor="review-name">Nom affiché *</Label>
            <Input
              id="review-name"
              placeholder="Marie Dupont"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              maxLength={80}
            />
          </div>

          {/* Rôle & Entreprise */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="review-role">Rôle</Label>
              <Input
                id="review-role"
                placeholder="Content Creator"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="review-company">Entreprise</Label>
              <Input
                id="review-company"
                placeholder="Freelance"
                value={authorCompany}
                onChange={(e) => setAuthorCompany(e.target.value)}
                maxLength={80}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="gradient-primary border-0">
              {loading ? "Envoi..." : "Envoyer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
