"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedBlob3D } from "./AnimatedBlob3D";
import { FloatingCard } from "./FloatingCard";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const { containerRef, x, y } = useMouseParallax(15);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* 3D animated blob */}
      <AnimatedBlob3D />

      {/* Subtle radial gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm tracking-widest text-text-secondary uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-accent" />
          Powered by Anthropic
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mb-6 font-serif leading-[1.05] text-text-primary"
          style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)" }}
        >
          Your{" "}
          <em className="not-italic font-serif italic text-gradient-purple">
            intelligent
          </em>
          <br />
          collaborator.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          Claude helps you write, think, code and create — effortlessly.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Começar a usar o Claude gratuitamente"
            className="rounded-full bg-purple-cta px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-purple-accent hover:shadow-purple-primary/30 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-accent"
          >
            Começar agora
          </Link>
          <a
            href="#como-funciona"
            aria-label="Ver como o Claude funciona"
            className="rounded-full border border-white/15 px-8 py-4 text-base font-medium text-text-secondary transition-all duration-200 hover:border-white/30 hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Ver como funciona
          </a>
        </motion.div>
      </motion.div>

      {/* Floating glass cards — hidden on mobile */}
      <div className="hidden lg:block">
        {/* Card 1 — email preview, left upper */}
        <div className="absolute left-[8%] top-[28%]">
          <FloatingCard mouseX={x} mouseY={y} depth={0.5} className="w-56">
            <p className="mb-1 text-xs font-medium text-text-secondary">✉️ Email</p>
            <p className="text-xs font-semibold text-text-primary">
              Assunto: Proposta de parceria
            </p>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">
              Olá, gostaria de apresentar uma oportunidade de colaboração...
            </p>
          </FloatingCard>
        </div>

        {/* Card 2 — code snippet, right upper */}
        <div className="absolute right-[6%] top-[30%]">
          <FloatingCard mouseX={x} mouseY={y} depth={0.8} className="w-60">
            <p className="mb-1 text-xs font-medium text-text-secondary">💻 Código</p>
            <pre className="text-xs text-purple-accent leading-relaxed">
              <code>{`const result = await\n  claude.complete({\n    prompt: userInput\n  })`}</code>
            </pre>
          </FloatingCard>
        </div>

        {/* Card 3 — summary bullets, right lower */}
        <div className="absolute right-[10%] bottom-[22%]">
          <FloatingCard mouseX={x} mouseY={y} depth={1.0} className="w-52">
            <p className="mb-2 text-xs font-medium text-text-secondary">📋 Resumo</p>
            <ul className="space-y-1">
              {[
                "Reduz tempo de pesquisa",
                "Respostas em segundos",
                "Sempre disponível",
              ].map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs text-text-primary">
                  <span className="mt-0.5 text-purple-accent">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}
