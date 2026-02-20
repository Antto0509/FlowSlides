"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram, ArrowRight } from "lucide-react";
import { MiniCarousel } from "./MiniCarousel";
import { ExampleCarousel } from "@/types/example";

interface ExampleCardProps {
  example: ExampleCarousel;
  index: number;
}

export function ExampleCard({ example, index }: ExampleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      layout
      className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
      style={{ willChange: "transform" }}
    >
      {/* Wrapper hover élevation */}
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 40px oklch(0.55 0.2 285 / 10%)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col flex-1 rounded-2xl overflow-hidden"
      >
        {/* Preview area — hauteur fixe pour uniformiser toutes les cards */}
        <div className="bg-secondary/40 h-[280px] flex items-center justify-center overflow-hidden">
          <MiniCarousel example={example} />
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Network badge + format */}
          <div className="flex items-center gap-2">
            {example.network === "linkedin" ? (
              <div className="flex items-center gap-1.5 bg-[#0077B5]/10 text-[#0077B5] px-2.5 py-1 rounded-full text-xs font-semibold">
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-pink-500/10 text-pink-500 px-2.5 py-1 rounded-full text-xs font-semibold">
                <Instagram className="w-3 h-3" />
                Instagram
              </div>
            )}
            <span className="text-xs text-muted-foreground">{example.format}</span>
          </div>

          {/* Title & description */}
          <div>
            <h3 className="font-bold text-base leading-snug mb-1.5">{example.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{example.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {example.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-end pt-1 mt-auto">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="sm" className="hero-cta-primary gap-1.5 text-xs h-8">
                <Link href="/create-carousel">
                  Créer le mien
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}