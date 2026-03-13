# Design Spec: Claude Capabilities Landing Page

**Date:** 2026-03-13
**Project:** PurpleFolio
**Author:** Jorge Negrelli

---

## Overview

A premium dark landing page that presents Claude AI's capabilities to a general (non-technical) audience. The goal is not a personal portfolio — it is a showcase of what Claude can do, organized around real-world use cases that any person can immediately understand and relate to.

**Approach:** Use-case first ("O que você pode fazer agora") — concrete scenarios over abstract descriptions.

**Target audience:** Laypeople with no technical background who want to understand what Claude is and how it can help them.

---

## Visual System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#080810` | Page background |
| `--purple-primary` | `#7c3aed` | Glow, orb base |
| `--purple-accent` | `#a855f7` | Hover states, highlights |
| `--purple-cta` | `#9333ea` | Primary CTA button |
| `--text-primary` | `#f4f0ff` | Headlines, primary text |
| `--text-secondary` | `#8b7fa8` | Subtext, captions |
| `--glass-bg` | `rgba(255,255,255,0.04)` | Card backgrounds |
| `--glass-border` | `rgba(255,255,255,0.08)` | Card borders |

### Typography

- **Display font:** Instrument Serif (Google Fonts) — elegant serif for headlines, italic variant on key words
- **UI / Body font:** Geist (Vercel) — clean, modern, readable
- **Hero headline size:** `clamp(3.5rem, 7vw, 7rem)`, line-height `1.05`
- **Body text:** `1rem` / `1.125rem`, line-height `1.6`

### Glassmorphism Cards

```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

---

## Motion System

### Hero Orb (Framer Motion)

- Animated SVG/div blob with `border-radius` morphing
- Slow organic drift: 8–12s cycle, `ease: "easeInOut"`, `repeat: Infinity`, `repeatType: "reverse"`
- Radial gradient fill: `#7c3aed` → `#a855f7` → transparent
- Blur filter: `blur(80px)` to create atmospheric glow
- Positioned: `absolute`, behind hero content, right-center offset

### Cursor Parallax (floating cards)

- Track `mousemove` on hero section
- Cards shift ±15px on X/Y relative to cursor position
- Smooth spring: `stiffness: 100, damping: 30`
- Each card has a slightly different multiplier (0.5x, 0.8x, 1x) for depth

### Section Reveal

- `useInView` hook from Framer Motion
- Entry: `opacity: 0 → 1`, `y: 20 → 0`
- Duration: `0.5s`, `ease: "easeOut"`
- Stagger between child elements: `0.1s`

### Capability Card Hover

- `scale: 1.02`
- Border color transitions to `rgba(147, 51, 234, 0.4)` (purple glow)
- Box-shadow: `0 0 20px rgba(147, 51, 234, 0.15)`
- Duration: `0.2s`

---

## Page Structure

### 1. Navbar

- **Position:** Sticky, top-0
- **Background:** `rgba(8, 8, 16, 0.8)` with `backdrop-blur(12px)`
- **Left:** Logo — "Claude" wordmark in Instrument Serif
- **Right:** Single CTA button — "Começar grátis"
- **No navigation links** — keeps focus on conversion

### 2. Hero Section

**Layout:** Full viewport height, centered content, absolute-positioned orb and floating cards behind

**Headline (2 lines):**
```
Your intelligent
collaborator.
```
- "intelligent" in Instrument Serif italic
- "collaborator." in Instrument Serif regular
- Size: `clamp(3.5rem, 7vw, 7rem)`

**Subtext:**
```
Claude helps you write, think, code and create — effortlessly.
```
- Font: Geist, `1.25rem`, color: `--text-secondary`

**CTAs:**
- Primary: "Começar agora" — `bg: #9333ea`, `border-radius: 9999px`, `px-8 py-4`
- Secondary: "Ver como funciona" — ghost style, `border: 1px solid rgba(255,255,255,0.15)`

**Hero Orb:**
- Absolute positioned, `right: 10%`, `top: 50%`, translated -50%
- Size: `600px × 600px`
- Animated blob with radial gradient

**Floating Glass Cards (3 total):**

| Card | Position | Content |
|---|---|---|
| Card 1 | Left, upper | Email preview: "Assunto: Proposta de parceria..." |
| Card 2 | Right, middle | Code snippet: `const result = await claude.complete(...)` |
| Card 3 | Right, lower | Summary bullets: "• Reduz tempo de pesquisa..." |

### 3. Capabilities Section

**Headline:** "O que você pode fazer com Claude"
**Subtext:** "Escolha uma tarefa. Claude cuida do resto."

**Grid:** `3 columns × 2 rows` on desktop, `1 column` on mobile

**Cards (6 total):**

| # | Icon | Title | Example |
|---|---|---|---|
| 1 | ✍️ | Escrita & Comunicação | "Redija emails, relatórios e textos profissionais em segundos" |
| 2 | 💻 | Código & Desenvolvimento | "Escreva, explique e revise código em qualquer linguagem" |
| 3 | 📊 | Análise & Pesquisa | "Resuma documentos longos e extraia insights rapidamente" |
| 4 | 🎨 | Criatividade & Ideias | "Gere ideias, roteiros, histórias e conteúdo criativo" |
| 5 | 📋 | Organização & Produtividade | "Planeje projetos, crie listas e organize tarefas complexas" |
| 6 | 🤝 | Aprendizado & Explicações | "Entenda qualquer assunto com explicações claras e simples" |

### 4. Como Funciona (Process)

**Headline:** "Simples assim."
**Layout:** 3 horizontal steps with connecting line

| Step | Title | Description |
|---|---|---|
| 1 | Descreva | Diga com suas próprias palavras o que você precisa |
| 2 | Claude responde | Receba uma resposta inteligente em segundos |
| 3 | Refine e use | Ajuste, expanda ou aplique diretamente |

### 5. Final CTA Section

- Large isolated container with intense purple glow background
- Headline: "Pronto para começar?"
- Subtext: "Milhões de pessoas já usam o Claude todos os dias."
- Single button: "Experimentar agora — é grátis"
- Visual: centered, generous vertical padding `py-32`

### 6. Footer

- Minimal: Logo left, copyright right
- Optional: 2–3 links (Privacidade, Termos, Anthropic)

---

## Component Architecture

```
src/
  app/
    page.tsx              # Main page composition
    layout.tsx            # Root layout, font imports
    globals.css           # CSS variables, base styles
  components/
    Navbar.tsx
    Hero/
      Hero.tsx
      HeroOrb.tsx         # Animated blob component
      FloatingCard.tsx    # Reusable glass card with parallax
    Capabilities/
      Capabilities.tsx
      CapabilityCard.tsx
    Process/
      Process.tsx
      ProcessStep.tsx
    CtaSection.tsx
    Footer.tsx
  hooks/
    useMouseParallax.ts   # Cursor tracking hook
    useScrollReveal.ts    # InView animation wrapper
  lib/
    motion.ts             # Shared Framer Motion variants
```

---

## Technical Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion v11
- **Fonts:** Google Fonts (Instrument Serif) + Geist (next/font)
- **Icons:** Lucide React
- **TypeScript:** Yes

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (`< 768px`) | Single column, hero cards hidden, orb smaller |
| Tablet (`768–1024px`) | 2-col capability grid, cards partially visible |
| Desktop (`> 1024px`) | Full layout as described |

---

## Accessibility

- All animated elements respect `prefers-reduced-motion`
- Color contrast: text on glass cards meets WCAG AA
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- CTAs have descriptive `aria-label`

---

## Out of Scope

- Authentication or user accounts
- Backend API calls
- Multi-language support (page is in English with Portuguese CTAs)
- Blog or content management
- Real Claude API integration (this is a showcase, not a live demo)
