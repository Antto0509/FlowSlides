"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plan } from "@/types/pricing";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function PlanCard({
  plan,
  annual,
  animationDelay,
}: {
  plan: Plan;
  annual: boolean;
  animationDelay: number;
}) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;
  const isFree = plan.monthlyPrice === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: animationDelay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className={cn(
        "relative rounded-2xl border flex flex-col gap-6 h-full p-8",
        plan.highlighted
          ? "border-primary/40 bg-card shadow-2xl shadow-primary/10"
          : "border-border/60 bg-card hover:border-primary/20 hover:shadow-lg"
      )}
    >
      {/* Popular badge */}
      {plan.badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: animationDelay / 1000 + 0.25, duration: 0.35, ease: "backOut" }}
          className="absolute z-10 -top-3.5 left-1/2 -translate-x-1/2"
        >
          <Badge className="gradient-primary text-primary-foreground border-0 px-4 py-1 text-xs font-semibold shadow-md shadow-primary/20 whitespace-nowrap">
            {plan.badge}
          </Badge>
        </motion.div>
      )}

      {/* Top accent line */}
      {plan.highlighted && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: animationDelay / 1000 + 0.3, duration: 0.5, ease: "easeOut" }}
          style={{ originX: 0.5 }}
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full gradient-primary"
        />
      )}

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -6, 6, 0], transition: { duration: 0.5 } }}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center",
              plan.highlighted
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            )}
          >
            {plan.icon}
          </motion.div>
          <span className="font-bold text-lg">{plan.name}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-end gap-1">
          {isFree ? (
            <motion.span
              key="free"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-black tracking-tight gradient-text"
            >
              Gratuit
            </motion.span>
          ) : (
            <>
              <motion.span
                key={price}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-5xl font-black tracking-tight gradient-text"
              >
                {price}€
              </motion.span>
              <span className="text-muted-foreground mb-2 text-sm">/mois</span>
            </>
          )}
        </div>

        <motion.div
          key={annual ? "annual" : "monthly"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {annual && !isFree && (
            <p className="text-xs text-muted-foreground">
              Facturé{" "}
              <span className="font-semibold text-foreground">{price * 12}€</span>{" "}
              par an
            </p>
          )}
          {!annual && !isFree && (
            <p className="text-xs text-muted-foreground">
              Soit{" "}
              <span className="font-semibold text-primary">
                {plan.annualPrice}€/mois
              </span>{" "}
              en annuel (-20 %)
            </p>
          )}
        </motion.div>
      </div>

      {/* CTA */}
      <Link href="/create-carousel" className="block">
        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
          <Button
            size="lg"
            className={cn(
              "w-full h-12 font-semibold gap-2 transition-all",
              plan.ctaVariant === "gradient" &&
                "gradient-primary border-0 shadow-lg shadow-primary/25 hover:opacity-90",
              plan.ctaVariant === "outline" && "hero-cta-secondary",
              plan.ctaVariant === "secondary" &&
                "border-secondary hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </Link>

      <div className="border-t border-border/60" />

      {/* Features */}
      <ul className="space-y-3">
        {plan.features.map((feature, i) => (
          <motion.li
            key={feature.text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: animationDelay / 1000 + 0.15 + i * 0.045,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="flex items-start gap-3 text-sm"
          >
            <div
              className={cn(
                "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                feature.included
                  ? feature.highlight
                    ? "gradient-primary"
                    : "bg-primary/20"
                  : "bg-border"
              )}
            >
              {feature.included ? (
                <Check
                  className={cn(
                    "w-2.5 h-2.5",
                    feature.highlight ? "text-primary-foreground" : "text-primary"
                  )}
                />
              ) : (
                <X className="w-2.5 h-2.5 text-muted-foreground/40" />
              )}
            </div>
            <span
              className={cn(
                feature.included
                  ? feature.highlight
                    ? "text-foreground font-medium"
                    : "text-foreground"
                  : "text-muted-foreground/50 line-through"
              )}
            >
              {feature.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}