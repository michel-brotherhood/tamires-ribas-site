import SiteHeader from "@/components/SiteHeader";
import HomeShowcase from "@/components/HomeShowcase";
import LineButton from "@/components/LineButton";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      {/* O fundo imersivo é o SiteBackdrop (no layout) — persistente em todo o
          site. Aqui só vai o conteúdo, sobreposto. */}
      <SiteHeader />

      <section className="home-hero">
        <div className="home-hero-inner">
          <span className="section-index">Arquitetura e Interiores de Alto Padrão</span>
          <h1 className="headline">
            Muito Além
            <br />
            de um <em>Projeto.</em>
          </h1>
          <p className="body-text">
            Projetos residenciais de alto padrão que refletem personalidade,
            conforto e atemporalidade — pela arquiteta Tamires Ribas.
          </p>
          <LineButton href="https://wa.me/5521985978830" external>
            Falar com a Arquiteta
          </LineButton>
        </div>
      </section>

      {/* Projetos · Depoimentos · Contato — sobre o MESMO fundo. */}
      <HomeShowcase />

      <WhatsAppWidget />
    </>
  );
}
