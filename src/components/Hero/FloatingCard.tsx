"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  /** Parallax multiplier — higher = more movement (0.5, 0.8, or 1.0) */
  depth?: number;
  /** Parent motion values from useMouseParallax */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
}

/**
 * Glass card that drifts with cursor movement for parallax depth effect.
 * Wraps children in a motion.div with spring-animated translate.
 */
export function FloatingCard({
  children,
  depth = 1,
  mouseX,
  mouseY,
  className = "",
}: FloatingCardProps) {
  const x = useTransform(mouseX, (v) => v * depth);
  const y = useTransform(mouseY, (v) => v * depth);

  return (
    <motion.div
      style={{ x, y }}
      className={`glass p-4 shadow-xl ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
