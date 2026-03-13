"use client";

import { motion } from "framer-motion";

/**
 * Animated purple atmospheric orb for the hero background.
 * Morphs border-radius slowly to create organic blob movement.
 * Respects prefers-reduced-motion via globals.css.
 */
export function HeroOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 z-0"
    >
      <motion.div
        className="relative"
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "50% 60% 30% 70% / 40% 70% 60% 30%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.35) 0%, rgba(124, 58, 237, 0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
