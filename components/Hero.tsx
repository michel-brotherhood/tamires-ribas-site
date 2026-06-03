/**
 * Hero.tsx
 * -----------------------------------------------------------------------------
 * Primeira dobra da home: vídeo cinematográfico (atrás, via VideoBackground)
 * com texto CLARO por cima — legível e glamouroso. Mantém os data-hero-reveal
 * que a intro do VideoBackground anima. O conteúdo sólido vem depois e cobre o
 * vídeo ao rolar (o scrub do vídeo é localizado nesta dobra).
 * -----------------------------------------------------------------------------
 */

import LineButton from "@/components/LineButton";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <p data-hero-reveal className="hero-eyebrow">
          Arquitetura e Interiores de Alto Padrão
        </p>
        <h1 data-hero-reveal className="hero-title">
          Muito Além
          <br />
          de um <em>Projeto.</em>
        </h1>
        <p data-hero-reveal className="hero-sub">
          Projetos residenciais que refletem personalidade, conforto e
          atemporalidade — pela arquiteta Tamires Ribas.
        </p>
        <LineButton href="https://wa.me/5521985978830" external reveal>
          Falar com a Arquiteta
        </LineButton>
      </div>

      <div className="scroll-hint scroll-hint--light" data-hero-reveal>
        <span>Role para explorar</span>
        <span className="scroll-hint-line" />
      </div>
    </section>
  );
}
