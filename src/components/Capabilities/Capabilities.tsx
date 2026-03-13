"use client";

import { motion } from "framer-motion";
import {
  PenLine,
  Code2,
  BarChart2,
  Sparkles,
  ListTodo,
  GraduationCap,
} from "lucide-react";
import { CapabilityCard } from "./CapabilityCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/motion";

const CAPABILITIES = [
  {
    Icon: PenLine,
    title: "Escrita & Comunicação",
    description: "Redija emails, relatórios e textos profissionais em segundos.",
  },
  {
    Icon: Code2,
    title: "Código & Desenvolvimento",
    description: "Escreva, explique e revise código em qualquer linguagem.",
  },
  {
    Icon: BarChart2,
    title: "Análise & Pesquisa",
    description: "Resuma documentos longos e extraia insights rapidamente.",
  },
  {
    Icon: Sparkles,
    title: "Criatividade & Ideias",
    description: "Gere ideias, roteiros, histórias e conteúdo criativo.",
  },
  {
    Icon: ListTodo,
    title: "Organização & Produtividade",
    description: "Planeje projetos, crie listas e organize tarefas complexas.",
  },
  {
    Icon: GraduationCap,
    title: "Aprendizado & Explicações",
    description: "Entenda qualquer assunto com explicações claras e simples.",
  },
] as const;

/**
 * Grid of 6 capability cards with staggered scroll reveal.
 */
export function Capabilities() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-4 font-serif text-4xl italic text-text-primary md:text-5xl"
          >
            O que você pode fazer com Claude
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-text-secondary">
            Escolha uma tarefa. Claude cuida do resto.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
