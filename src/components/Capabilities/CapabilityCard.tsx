"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cardHover, fadeUp } from "@/lib/motion";

interface CapabilityCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Individual capability card with icon, title, description.
 * Reveals on scroll. Scales and glows on hover.
 */
export function CapabilityCard({ Icon, title, description }: CapabilityCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={cardHover}
      className="glass group flex flex-col gap-4 p-6 cursor-default"
      style={{ borderColor: "var(--glass-border)" }}
    >
      {/* Icon container */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-primary/20">
        <Icon
          size={20}
          className="text-purple-accent transition-colors duration-200 group-hover:text-white"
        />
      </div>

      <div>
        <h3 className="mb-1.5 font-medium text-text-primary">{title}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
    </motion.div>
  );
}
