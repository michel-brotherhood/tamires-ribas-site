/**
 * ScrollSections.tsx
 * -----------------------------------------------------------------------------
 * As 6 seções editoriais (100vh cada) que ficam empilhadas SOBRE o canvas 3D.
 * O <main> é o trigger único do ScrollTrigger (ver ArchitectureModel.tsx).
 *
 * ✅ SEGURO AJUSTAR: toda a copy (eyebrow / headline / texto / CTA) e os stats.
 * ⚠️  NÃO REMOVER: o atributo data-section em cada <section> nem os
 *     data-hero-reveal do Hero — a intro e o CSS mobile dependem deles.
 *     Mantenha 6 seções alinhadas a SCROLL_STATES (scrollStates.ts).
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";
import ProjectStat from "@/components/ProjectStat";
import LineButton from "@/components/LineButton";

export default function ScrollSections() {
  return (
    <main className="section-stack">
      {/* ================= 1 · HERO ================= */}
      <section id="hero" data-section="hero" className="section justify-start">
        <div className="max-w-2xl">
          <p data-hero-reveal className="eyebrow mb-6">
            Arquitetura e Interiores de Alto Padrão
          </p>
          <h1 data-hero-reveal className="headline mb-8 text-ink">
            Muito Além
            <br />
            de um <em>Projeto.</em>
          </h1>
          <p data-hero-reveal className="body-text mb-9">
            Projetos residenciais de alto padrão que refletem personalidade,
            conforto e atemporalidade — pela arquiteta Tamires Ribas.
          </p>
          <LineButton
            href="https://wa.me/5521985978830"
            external
            reveal
          >
            Falar com a Arquiteta
          </LineButton>
        </div>

        {/* Indicador de scroll (só desktop, some ao rolar). */}
        <div className="scroll-hint" data-hero-reveal>
          <span>Role para explorar</span>
          <span className="scroll-hint-line" />
        </div>
      </section>

      {/* ================= 2 · CONCEITO ================= */}
      <section
        id="conceito"
        data-section="concept"
        className="section justify-end"
      >
        <div className="max-w-xl lg:ml-auto lg:text-right">
          <span className="section-index">01 — O Escritório</span>
          <h2 className="headline-md mb-7 text-ink">
            Bem-vindo à <em>TR.</em>
          </h2>
          <p className="body-text lg:ml-auto">
            Fundado há mais de 10 anos pela arquiteta Tamires Ribas, o escritório
            é especializado em projetos residenciais de alto padrão. O lugar
            construído deve refletir personalidade, conforto e atemporalidade.
          </p>
        </div>
      </section>

      {/* ================= 3 · FACHADA ================= */}
      <section
        id="projetos"
        data-section="facade"
        className="section justify-start"
      >
        <div className="max-w-xl">
          <span className="section-index">02 — Nossa Essência</span>
          <h2 className="headline-md mb-7 text-ink">
            Sonho e <em>desejo.</em>
          </h2>
          <p className="body-text mb-10">
            Mais que plantas técnicas: construímos uma relação de exclusividade,
            onde o sonho habita sob o modo de vida projetado — a sua casa.
          </p>

          <div className="stats-grid">
            <ProjectStat value="+10" label="Anos de escritório" />
            <ProjectStat value="100%" label="Alto padrão" />
            <ProjectStat value="TR" label="Assinatura autoral" />
          </div>
        </div>
      </section>

      {/* ================= 4 · PLANTA ================= */}
      <section data-section="floorplan" className="section justify-end">
        <div className="max-w-xl lg:ml-auto lg:text-right">
          <span className="section-index">03 — O Que Entregamos</span>
          <h2 className="headline-md mb-7 text-ink">
            Elegância e <em>excelência.</em>
          </h2>
          <p className="body-text lg:ml-auto">
            Elegância, personalidade e excelência em cada detalhe — do partido
            arquitetônico ao acabamento que se vive todos os dias.
          </p>
        </div>
      </section>

      {/* ================= 5 · MATERIAIS ================= */}
      <section
        id="materiais"
        data-section="materials"
        className="section justify-start"
      >
        <div className="max-w-xl">
          <span className="section-index">04 — O Que Acreditamos</span>
          <h2 className="headline-md mb-7 text-ink">
            Confiança e <em>transparência.</em>
          </h2>
          <p className="body-text">
            Um relacionamento transparente e humano, com criatividade a serviço
            daquilo que é essencial para quem vai morar.
          </p>
        </div>
      </section>

      {/* ============ TEASER · TOUR 360° (link para página dedicada) ============
          Apenas um convite. O viewer 360 completo vive em /experiencia-360,
          separado da timeline 3D da home para não competir nem pesar. */}
      <section className="teaser-section">
        <div className="teaser-card">
          <span className="section-index">05 — Tour 360°</span>
          <h2 className="headline-md mb-6 text-ink">
            Entre no <em>projeto.</em>
          </h2>
          <p className="body-text mx-auto mb-9">
            Caminhe pelos ambientes em uma experiência imersiva de 360°: área
            social, suíte master e fachada, vistas de dentro para fora.
          </p>
          <Link href="/experiencia-360" className="cta cta-accent">
            Abrir tour 360°
          </Link>
        </div>
      </section>

      {/* ================= 7 · FINAL / CONTATO ================= */}
      <section
        id="contato"
        data-section="final"
        className="section flex-col justify-between"
      >
        <div className="w-full max-w-2xl pt-[18vh] lg:pt-0">
          <span className="section-index">06 — Nossa Missão</span>
          <h2 className="headline-md mb-7 text-ink">
            Vamos projetar
            <br />
            a sua <em>casa?</em>
          </h2>
          <p className="body-text mb-9">
            Transformar todas as necessidades e vontades do cliente em um projeto
            aconchegante, acolhedor e funcional. Fale com a arquiteta.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LineButton href="https://wa.me/5521985978830" external>
              Fale com a Arquiteta
            </LineButton>
          </div>
        </div>
      </section>
    </main>
  );
}
