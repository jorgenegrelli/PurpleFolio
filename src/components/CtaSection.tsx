"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Final conversion section — large headline, subtext, single CTA.
 * Intense purple glow behind container for visual climax.
 */
export function CtaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-6 py-32 md:py-40"
    >
      {/* Glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124, 58, 237, 0.18) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-4 font-serif text-4xl italic text-text-primary md:text-5xl"
        >
          Pronto para começar?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mb-10 text-lg text-text-secondary"
        >
          Milhões de pessoas já usam o Claude todos os dias.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Experimentar o Claude gratuitamente agora"
            className="inline-block rounded-full bg-purple-cta px-10 py-4 text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-purple-accent hover:shadow-purple-primary/30 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-accent"
          >
            Experimentar agora — é grátis
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
