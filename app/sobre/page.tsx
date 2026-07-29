import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Testimonials from "@/components/Testimonials";
import FrameButton from "@/components/FrameButton";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Sobre — TR Arquitetura e Interiores",
  description:
    "Escritório da arquiteta Tamires Ribas, há mais de 14 anos em projetos residenciais de alto padrão. Conheça nossa essência, valores e missão.",
};

export default function SobrePage() {
  return (
    <div className="has-ambient">
      <ScrollReveal />
      <SiteHeader />

      <main className="page">
        <header className="page-hero page-hero--about">
          <div className="about-hero-text">
            <span className="section-index">Nossa Essência</span>
            <h1 className="headline text-ink">
              Muito além de um <em>projeto.</em>
            </h1>
            <p className="body-text mt-6">
              Há mais de 14 anos, a TR Arquitetura e Interiores cria projetos
              residenciais guiados por escolhas inteligentes, atemporais e
              personalizadas. Cada projeto é pensado para refletir quem você
              é, valorizar seu patrimônio e permanecer atual por muitos anos.
            </p>
            <p className="about-hero-sign">
              Tamires Ribas — Arquiteta responsável
            </p>
          </div>

          <figure className="about-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/foto-perfil-paginalinks.webp"
              alt="Tamires Ribas, arquiteta responsável pela TR Arquitetura e Interiores"
              className="about-portrait-img"
              draggable={false}
            />
          </figure>
        </header>

        <section className="about-pillars">
          <div data-reveal className="about-pillar">
            <span className="about-pillar-num">01</span>
            <h3>O Que Entregamos</h3>
            <p>Elegância, personalidade e excelência.</p>
          </div>
          <div data-reveal className="about-pillar">
            <span className="about-pillar-num">02</span>
            <h3>O Que Acreditamos</h3>
            <p>Confiança, transparência e criatividade.</p>
          </div>
          <div data-reveal className="about-pillar">
            <span className="about-pillar-num">03</span>
            <h3>Nossa Missão</h3>
            <p>
              Transformar todas as necessidades e vontades do cliente em um
              projeto aconchegante, acolhedor e funcional.
            </p>
          </div>
        </section>

        <Testimonials />

        <section data-reveal className="project-cta">
          <h2 className="headline-md text-ink">
            Vamos conversar sobre o <em>seu projeto?</em>
          </h2>
          <div className="project-cta-actions">
            <FrameButton href="/contato">Entrar em contato</FrameButton>
            <FrameButton href="/projetos">Ver projetos</FrameButton>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
