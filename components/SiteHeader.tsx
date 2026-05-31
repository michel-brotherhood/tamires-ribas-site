"use client";

/**
 * SiteHeader.tsx
 * -----------------------------------------------------------------------------
 * Header das PÁGINAS INTERNAS (sólido, sobre fundo off-white). Diferente do
 * Header.tsx da home — que é transparente e sobreposto à cena 3D.
 *
 * Usa next/link para navegação real entre rotas (/, /projetos, /sobre...).
 * Inclui menu mobile em overlay, como o da home.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "360°", href: "/experiencia-360" },
  { label: "Contato", href: "/contato" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-logo" aria-label="TR — Início">
            <Logo variant="branco" className="brand-logo" />
          </Link>

          <nav className="site-nav">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="site-nav-link">
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="site-burger"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Overlay mobile */}
      <div className={`site-overlay ${open ? "is-open" : ""}`}>
        <div className="site-overlay-top">
          <span className="site-logo">
            <Logo variant="taupe" className="brand-logo" />
          </span>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="site-close"
          >
            <span />
            <span />
          </button>
        </div>

        <nav className="site-overlay-nav">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity .4s ease ${0.08 * i + 0.1}s, transform .4s ease ${0.08 * i + 0.1}s`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="site-overlay-foot">
          <p>+55 21 98597-8830</p>
          <p>© TR Arquitetura e Interiores</p>
        </div>
      </div>
    </>
  );
}
