/**
 * HomeIntro.tsx
 * -----------------------------------------------------------------------------
 * Conteúdo entre o herói e o portfólio: seções editoriais em fundo CREME sólido
 * (texto escuro, alta legibilidade — linguagem da referência). Esta folha é a
 * "pausa" opaca que cobre o vídeo fixo no meio; o vídeo reaparece depois, atrás
 * do portfólio (HomeShowcase), mantendo o fundo interligado na rolagem.
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";
import ProjectStat from "@/components/ProjectStat";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomeIntro() {
  return (
    <div className="home-sheet">
      <ScrollReveal />

      {/* 01 — O Escritório */}
      <section className="home-block">
        <div data-reveal className="home-block-text">
          <span className="section-index">01 — O Escritório</span>
          <h2 className="headline-md text-ink">
            Bem-vindo à <em>TR.</em>
          </h2>
          <p className="body-text mt-6">
            Fundado há mais de 10 anos pela arquiteta Tamires Ribas, o escritório
            é especializado em projetos residenciais de alto padrão. O lugar
            construído deve refletir personalidade, conforto e atemporalidade.
          </p>
        </div>
      </section>

      {/* 02 — O que entregamos + números */}
      <section className="home-block">
        <div data-reveal className="home-block-text">
          <span className="section-index">02 — O Que Entregamos</span>
          <h2 className="headline-md text-ink">
            Elegância e <em>excelência.</em>
          </h2>
          <p className="body-text mt-6">
            Elegância, personalidade e excelência em cada detalhe — do partido
            arquitetônico ao acabamento que se vive todos os dias. Um
            relacionamento transparente e humano, a serviço de quem vai morar.
          </p>
        </div>

        <div data-reveal className="stats-grid home-stats">
          <ProjectStat value="+10" label="Anos de escritório" />
          <ProjectStat value="100%" label="Alto padrão" />
          <ProjectStat value="TR" label="Assinatura autoral" />
        </div>
      </section>

      {/* 03 — Convite ao tour 360° (creme, legível) */}
      <section className="home-block home-block--cta">
        <div data-reveal className="home-block-text">
          <span className="section-index">03 — Tour 360°</span>
          <h2 className="headline-md text-ink">
            Entre no <em>projeto.</em>
          </h2>
          <p className="body-text mt-6 mb-8">
            Caminhe pelos ambientes em uma experiência imersiva de 360° — área
            social, suíte master e fachada, vistas de dentro para fora.
          </p>
          <Link href="/experiencia-360" className="cta cta-accent">
            Abrir tour 360°
          </Link>
        </div>
      </section>
    </div>
  );
}
