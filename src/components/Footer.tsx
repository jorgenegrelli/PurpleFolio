import Link from "next/link";

/**
 * Minimal footer — logo left, 3 links right, copyright centered below.
 */
export function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo */}
          <span className="font-serif text-xl italic text-text-primary">
            Claude
          </span>

          {/* Links */}
          <nav aria-label="Links do rodapé" className="flex gap-6">
            {[
              { label: "Privacidade", href: "#" },
              { label: "Termos", href: "#" },
              { label: "Anthropic", href: "https://anthropic.com" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} Anthropic. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
