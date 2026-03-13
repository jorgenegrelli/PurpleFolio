"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "./ProcessStep";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/motion";

const STEPS = [
  {
    number: 1,
    title: "Descreva",
    description: "Diga com suas próprias palavras o que você precisa.",
  },
  {
    number: 2,
    title: "Claude responde",
    description: "Receba uma resposta inteligente em segundos.",
  },
  {
    number: 3,
    title: "Refine e use",
    description: "Ajuste, expanda ou aplique diretamente.",
  },
] as const;

/**
 * Three-step horizontal process section with connecting line and scroll reveal.
 */
export function Process() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="como-funciona"
      ref={ref as React.RefObject<HTMLElement>}
      className="px-6 py-24 md:py-32"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124, 58, 237, 0.07) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl italic text-text-primary md:text-5xl"
          >
            Simples assim.
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative grid gap-8 md:grid-cols-3 md:gap-0"
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }}
          />

          {STEPS.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
