import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Testimonials from "@/components/Testimonials";
import VideoBackground from "@/components/VideoBackground";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Sobre — TR Arquitetura e Interiores",
  description:
    "Escritório da arquiteta Tamires Ribas, há mais de 10 anos em projetos residenciais de alto padrão. Conheça nossa essência, valores e missão.",
};

export default function SobrePage() {
  return (
    <div className="has-ambient">
      <VideoBackground
        mode="ambient"
        src="/video/videosite2.2.mp4"
        poster="/video/videosite2.2-poster.webp"
      />
      <ScrollReveal />
      <SiteHeader />

      <main className="page">
        <header className="page-hero">
          <span className="section-index">Nossa Essência</span>
          <h1 className="headline text-ink">
            Muito além de um <em>projeto.</em>
          </h1>
          <p className="body-text mt-6">
            Fundado há mais de 10 anos pela arquiteta Tamires Ribas, o escritório
            TR Arquitetura e Interiores é especializado em projetos residenciais
            de alto padrão. &ldquo;T&rdquo; e &ldquo;R&rdquo; resumem iniciais que
            valorizam o relacionamento transparente e humano, alinhando o
            desenvolvimento projetual ao que é essencial para o morador.
          </p>
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
            <Link href="/contato" className="cta cta-accent">
              Entrar em contato
            </Link>
            <Link href="/projetos" className="cta-ghost">
              Ver projetos
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
