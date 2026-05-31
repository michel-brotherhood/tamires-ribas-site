"use client";

/**
 * Experience360.tsx
 * -----------------------------------------------------------------------------
 * UI da página /experiencia-360: barra superior, título do ambiente, dica de
 * interação, abas e o viewer 360 (carregado com ssr:false p/ manter o Three.js
 * fora do bundle inicial).
 *
 * As abas chegam prontas do servidor (descobertas na pasta public/panoramas).
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Logo from "@/components/Logo";

export type PanoramaTab = {
  id: string;
  label: string;
  src: string;
  exists: boolean;
  order: number;
};

const Panorama360 = dynamic(() => import("./Panorama360"), {
  ssr: false,
  loading: () => null,
});

export default function Experience360({ tabs }: { tabs: PanoramaTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active];
  const total = tabs.length;

  // Sem nenhuma imagem na pasta: estado vazio amigável.
  if (total === 0) {
    return (
      <main className="panorama-page">
        <header className="panorama-topbar">
          <Link href="/" className="panorama-logo" aria-label="TR — Início">
            <Logo variant="taupe" className="brand-logo brand-logo--sm" />
          </Link>
          <Link href="/" className="panorama-back">
            ← Início
          </Link>
        </header>
        <div className="panorama-empty">
          <span className="section-index">Tour 360°</span>
          <h1 className="panorama-title">Em breve.</h1>
          <p className="panorama-note">
            Adicione imagens equiretangulares (.webp 2:1) em{" "}
            <code>public\panoramas\</code> para ativar o tour.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="panorama-page">
      {/* Viewer ao fundo */}
      <div className="panorama-stage">
        <Panorama360 src={current?.exists ? current.src : null} />
      </div>

      {/* Scrims para legibilidade do texto sobre a foto */}
      <div className="panorama-scrim panorama-scrim-top" />
      <div className="panorama-scrim panorama-scrim-bottom" />

      {/* Barra superior */}
      <header className="panorama-topbar">
        <Link href="/" className="panorama-logo" aria-label="TR — Início">
          <Logo variant="taupe" className="brand-logo brand-logo--sm" />
        </Link>
        <Link href="/" className="panorama-back">
          ← Início
        </Link>
      </header>

      {/* Título / contexto */}
      <div className="panorama-heading">
        <span className="section-index">
          Tour 360° · {String(active + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <h1 className="panorama-title">{current?.label}</h1>
      </div>

      {/* Dica de interação */}
      <p className="panorama-hint">Arraste para olhar ao redor</p>

      {/* Abas (scroll horizontal se não couberem) */}
      <nav className="panorama-tabs" aria-label="Ambientes">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`panorama-tab ${i === active ? "is-active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </main>
  );
}
