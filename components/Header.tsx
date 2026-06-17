"use client";

/**
 * Header.tsx
 * -----------------------------------------------------------------------------
 * Header fixo no topo. O container é pointer-events-none para não bloquear o
 * canvas 3D; apenas os elementos interativos (logo, links, botão) recebem
 * pointer-events-auto.
 *
 * Mobile: botão hambúrguer que abre um overlay de navegação em tela cheia.
 * O overlay fecha ao tocar em um link, no "X", ou na tecla Esc.
 *
 * Os links usam next/link e apontam para as páginas internas reais.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "360°", href: "/experiencia-360" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Header "scroll-aware": transparente no topo (logo taupe sobre o bege),
  // ganha banda taupe + logo branca depois de rolar um pouco.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha com Esc e trava o scroll do body enquanto o menu está aberto.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={`home-header pointer-events-none fixed inset-x-0 top-0 z-50 ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <div className="flex items-center justify-between px-[6vw] py-3 lg:px-[8vw] lg:py-4">
          {/* Logo: taupe no topo (sobre bege), branca após rolar (sobre taupe). */}
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center"
            aria-label="TR — Início"
          >
            <Logo
              variant={scrolled ? "branco" : "taupe"}
              className="brand-logo"
            />
          </Link>

          {/* Navegação desktop */}
          <nav className="pointer-events-auto hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="home-nav-link text-base font-medium transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botão hambúrguer (mobile) — abre o overlay. */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="home-burger pointer-events-auto flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className="block h-px w-7" />
            <span className="block h-px w-7" />
          </button>
        </div>
      </header>

      {/* ---------------- Overlay de navegação mobile ---------------- */}
      <div
        className={`fixed inset-0 z-[60] bg-canvas transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-[6vw] py-5">
          {/* Topo do overlay: logo + botão fechar */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center">
              <Logo variant="taupe" className="brand-logo" />
            </span>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <span className="absolute h-px w-7 rotate-45 bg-ink" />
              <span className="absolute h-px w-7 -rotate-45 bg-ink" />
            </button>
          </div>

          {/* Links grandes, estilo editorial */}
          <nav className="mt-auto mb-auto flex flex-col gap-7">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-semibold tracking-[-0.03em] text-ink"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.4s ease ${
                    0.08 * i + 0.1
                  }s, transform 0.4s ease ${0.08 * i + 0.1}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Rodapé do overlay */}
          <div className="text-sm text-ink/45">
            <p>+55 21 96436-2282</p>
            <p className="mt-1">© TR Arquitetura e Interiores</p>
          </div>
        </div>
      </div>
    </>
  );
}
