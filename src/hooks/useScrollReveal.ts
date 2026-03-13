"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Thin wrapper around Framer Motion useInView.
 * Returns a ref to attach to the observed element and a boolean `isVisible`.
 * Use with fadeUp + staggerContainer variants from lib/motion.ts.
 *
 * Entry animation: opacity 0→1, y 20→0, duration 0.5s easeOut
 * Triggers once — does not reset when element leaves viewport.
 */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return { ref, isVisible };
}
