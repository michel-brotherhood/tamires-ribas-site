import SiteHeader from "@/components/SiteHeader";
import HomeShowcase from "@/components/HomeShowcase";
import FrameButton from "@/components/FrameButton";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      {/* O fundo imersivo é o SiteBackdrop (no layout) — persistente em todo o
          site. Aqui só vai o conteúdo, sobreposto. */}
      <SiteHeader />

      <section className="home-hero">
        {/* Container 1200 (igual ao do header) → o texto alinha com a logo. */}
        <div className="home-hero-inner">
          <div className="home-hero-text">
            <span className="section-index">TR Arquitetura e Interiores - Residenciais</span>
            <h1 className="headline">
              Muito Além
              <br />
              de um <em>Projeto.</em>
            </h1>
            <p className="body-text">
              Projetos residenciais guiados por escolhas inteligentes,
              atemporais e feitas para durar.
            </p>
            <FrameButton href="https://wa.me/5521964362282" external className="btn-glow">
              Falar com a Arquiteta
            </FrameButton>
          </div>
        </div>
      </section>

      {/* Primeira parte do Sobre (essência) trazida para a home. */}
      <section className="home-about">
        <div className="home-about-inner home-about-inner--split">
          <figure className="about-portrait about-portrait--home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/foto-perfil-paginalinks.webp"
              alt="Tamires Ribas, arquiteta responsável pela TR Arquitetura e Interiores"
              className="about-portrait-img"
              draggable={false}
            />
          </figure>

          <div className="home-about-text">
            <span className="section-index">Nossa Essência</span>
            <h2 className="headline-md">
              Muito além de um <em>projeto.</em>
            </h2>
            <p className="body-text">
              Há mais de 14 anos, a TR Arquitetura e Interiores cria projetos
              residenciais guiados por escolhas inteligentes, atemporais e
              personalizadas. Cada projeto é pensado para refletir quem você
              é, valorizar seu patrimônio e permanecer atual por muitos anos.
            </p>
          </div>
        </div>
      </section>

      {/* Projetos · Depoimentos · Contato — sobre o MESMO fundo. */}
      <HomeShowcase />

      <WhatsAppWidget />
    </>
  );
}
