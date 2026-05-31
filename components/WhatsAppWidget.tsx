"use client";

/**
 * WhatsAppWidget.tsx
 * -----------------------------------------------------------------------------
 * Botão flutuante com um CUBO 3D animado (combina com o tema arquitetônico/3D).
 * Ao clicar, expande um painel com a logo TR e opções: navegar para Projetos,
 * Contato, ou falar direto no WhatsApp da arquiteta.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PHONE = "5521985978830"; // +55 21 98597-8830
const WA_MSG =
  "Olá, Tamires! Gostaria de falar sobre o meu projeto de arquitetura.";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(
      () => document.addEventListener("click", onClick),
      0,
    );
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div className={`tr-dock ${open ? "is-open" : ""}`} ref={ref}>
      {/* Painel de ações */}
      <div className="tr-dock-panel" role="menu" aria-label="Menu de contato">
        <div className="tr-dock-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/marca/logo-branco.webp"
            alt="TR Arquitetura e Interiores"
            className="tr-dock-logo"
            draggable={false}
          />
        </div>

        <div className="tr-dock-items">
          <Link
            href="/projetos"
            role="menuitem"
            className="tr-dock-item"
            onClick={() => setOpen(false)}
          >
            Ver projetos
          </Link>
          <Link
            href="/contato"
            role="menuitem"
            className="tr-dock-item"
            onClick={() => setOpen(false)}
          >
            Contato
          </Link>
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className="tr-dock-item tr-dock-item--accent"
            onClick={() => setOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Botão flutuante: cubo 3D (fecha com ✕ quando aberto) */}
      <button
        type="button"
        className="tr-dock-fab"
        aria-label={open ? "Fechar menu" : "Abrir menu de contato"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <span className="tr-dock-close" aria-hidden="true">
            ✕
          </span>
        ) : (
          <svg
            className="tr-triangle"
            viewBox="0 0 100 90"
            aria-hidden="true"
          >
            <polygon className="tcls-1" points="50,4 27,45 73,45" />
            <polygon className="tcls-2" points="27,45 4,86 50,86" />
            <polygon className="tcls-3" points="73,45 50,86 96,86" />
          </svg>
        )}
      </button>
    </div>
  );
}
