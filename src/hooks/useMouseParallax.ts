"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { parallaxSpring } from "@/lib/motion";

/**
 * Tracks cursor position within a container element.
 * Returns spring-animated {x, y} motion values normalized to ±1 from center.
 * Returns zero offset on touch devices (no mousemove events).
 *
 * @param multiplier - Scale factor for maximum offset in pixels (default: 15)
 */
export function useMouseParallax(multiplier = 15) {
  const containerRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, parallaxSpring);
  const y = useSpring(rawY, parallaxSpring);

  useEffect(() => {
    // No-op on touch devices
    if (typeof window === "undefined" || !("onmousemove" in window)) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = ((e.clientX - centerX) / (rect.width / 2)) * multiplier;
      const normalizedY = ((e.clientY - centerY) / (rect.height / 2)) * multiplier;

      rawX.set(normalizedX);
      rawY.set(normalizedY);
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [multiplier, rawX, rawY]);

  return { containerRef, x, y };
}
