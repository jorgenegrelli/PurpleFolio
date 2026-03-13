"use client";

import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

/**
 * Individual process step: numbered badge, title, description.
 */
export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
      {/* Number badge */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-purple-primary/40 bg-purple-primary/10 text-lg font-semibold text-purple-accent">
        {number}
      </div>

      <h3 className="mb-2 font-medium text-text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
    </motion.div>
  );
}
