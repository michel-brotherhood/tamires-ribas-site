/**
 * Experience360.tsx
 * -----------------------------------------------------------------------------
 * UI da página /experiencia-360: três opções de tour, cada uma apontando para
 * um link externo do Chaos Cloud (abre em nova aba).
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";
import Logo from "@/components/Logo";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export type PanoramaOption = {
  id: string;
  title: string;
  rooms: string;
  url: string;
};

export default function Experience360({
  options,
}: {
  options: PanoramaOption[];
}) {
  return (
    <main className="panorama-page panorama-page--select">
      <header className="panorama-topbar">
        <Link href="/" className="panorama-logo" aria-label="TR — Início">
          <Logo variant="taupe" className="brand-logo brand-logo--sm" />
        </Link>
        <Link href="/" className="panorama-back">
          ← Início
        </Link>
      </header>

      <section className="panorama-select">
        <span className="section-index">Tour 360°</span>
        <h1 className="panorama-title">Escolha um ambiente.</h1>
        <p className="panorama-note">
          Cada tour abre em uma nova aba, no visualizador Chaos Cloud.
        </p>

        <div className="panorama-options">
          {options.map((opt, i) => (
            <a
              key={opt.id}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="panorama-option"
            >
              <span className="panorama-option-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="panorama-option-badge">360°</span>
              <span className="panorama-option-body">
                <span className="panorama-option-title">{opt.title}</span>
                <span className="panorama-option-rooms">{opt.rooms}</span>
              </span>
              <span className="panorama-option-cta">
                Ver tour
                <span className="panorama-option-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="panorama-foot">
        © {new Date().getFullYear()} TR Arquitetura e Interiores
      </footer>

      <WhatsAppWidget />
    </main>
  );
}
