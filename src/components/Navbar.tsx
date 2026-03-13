"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Sticky top navbar with blur backdrop.
 * No nav links — single CTA to maximize conversion focus.
 */
export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full"
      aria-label="Navegação principal"
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        style={{
          background: "rgba(8, 8, 16, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Claude — página inicial"
          className="font-serif text-2xl italic text-text-primary transition-opacity hover:opacity-80"
        >
          Claude
        </Link>

        {/* CTA */}
        <Link
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Começar a usar o Claude gratuitamente"
          className="rounded-full bg-purple-cta px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-accent"
        >
          Começar grátis
        </Link>
      </div>
    </motion.nav>
  );
}
