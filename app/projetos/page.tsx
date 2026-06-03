import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmartImage from "@/components/SmartImage";
import VideoBackground from "@/components/VideoBackground";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos — TR Arquitetura e Interiores",
  description:
    "Portfólio de projetos residenciais de alto padrão da TR Arquitetura e Interiores.",
};

export default function ProjetosPage() {
  const [featured, ...rest] = PROJECTS;

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
          <span className="section-index">Portfólio</span>
          <h1 className="headline text-ink">
            Projetos <em>autorais.</em>
          </h1>
          <p className="body-text mt-6">
            Uma seleção de residências de alto padrão onde personalidade,
            conforto e atemporalidade caminham juntos.
          </p>
        </header>

        {/* Projeto em destaque (o primeiro da lista) */}
        {featured && (
          <Link
            data-reveal
            href={`/projetos/${featured.slug}`}
            className="project-featured"
          >
            <div className="project-featured-media">
              <SmartImage
                src={featured.cover}
                alt={featured.title}
                className="project-card-img"
              />
            </div>
            <div className="project-featured-body">
              <span className="section-index">Em destaque · {featured.category}</span>
              <h2 className="project-featured-title">{featured.title}</h2>
              <p className="project-card-meta">
                {featured.location} · {featured.year} · {featured.area}
              </p>
              <p className="project-card-summary">{featured.summary}</p>
              <span className="project-card-link">Ver projeto →</span>
            </div>
          </Link>
        )}

        {/* Demais projetos */}
        {rest.length > 0 && (
          <section className="projects-grid">
            {rest.map((p) => (
              <Link
                key={p.slug}
                data-reveal
                href={`/projetos/${p.slug}`}
                className="project-card"
              >
                <div className="project-card-media">
                  <SmartImage
                    src={p.cover}
                    alt={p.title}
                    className="project-card-img"
                  />
                  <span className="project-card-cat">{p.category}</span>
                </div>
                <div className="project-card-body">
                  <h2 className="project-card-title">{p.title}</h2>
                  <p className="project-card-meta">
                    {p.location} · {p.year} · {p.area}
                  </p>
                  <p className="project-card-summary">{p.summary}</p>
                  <span className="project-card-link">Ver projeto →</span>
                </div>
              </Link>
            ))}
          </section>
        )}
      </main>

      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
