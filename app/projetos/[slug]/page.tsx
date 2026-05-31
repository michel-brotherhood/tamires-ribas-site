import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmartImage from "@/components/SmartImage";
import { PROJECTS, getProject } from "@/lib/content";

type Params = { params: { slug: string } };

// Gera as rotas estáticas de cada projeto no build.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Projeto — TR Arquitetura e Interiores" };
  return {
    title: `${project.title} — TR Arquitetura e Interiores`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />

      <main className="page">
        <Link href="/projetos" className="back-link">
          ← Todos os projetos
        </Link>

        <header className="project-hero">
          <span className="section-index">{project.category}</span>
          <h1 className="headline text-ink">{project.title}</h1>
          <p className="body-text mt-6">{project.summary}</p>

          <dl className="project-facts">
            <div>
              <dt>Local</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Ano</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Área</dt>
              <dd>{project.area}</dd>
            </div>
            <div>
              <dt>Categoria</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>
        </header>

        <div className="project-cover">
          <SmartImage src={project.cover} alt={`${project.title} — capa`} />
        </div>

        <section className="project-body">
          {project.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>

        {project.gallery.length > 0 && (
          <section className="project-gallery">
            {project.gallery.map((img, i) => (
              <SmartImage
                key={i}
                src={img}
                alt={`${project.title} — imagem ${i + 1}`}
              />
            ))}
          </section>
        )}

        <section className="project-cta">
          <h2 className="headline-md text-ink">
            Quer um projeto <em>assim?</em>
          </h2>
          <div className="project-cta-actions">
            <Link href="/contato" className="cta cta-accent">
              Falar com a arquiteta
            </Link>
            <Link href="/experiencia-360" className="cta-ghost">
              Ver tour 360°
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
