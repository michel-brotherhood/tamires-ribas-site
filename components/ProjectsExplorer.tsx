"use client";

/**
 * ProjectsExplorer.tsx
 * -----------------------------------------------------------------------------
 * Grid de projetos com filtro por categoria (Todos / Residencial / Comercial...).
 * Client component: precisa de estado para re-renderizar a lista ao trocar de
 * filtro. Por isso os cards aqui NÃO usam [data-reveal] — esse atributo fica
 * oculto por padrão via CSS e só é revelado uma vez, no mount, pelo
 * ScrollReveal (GSAP). Cards que aparecem depois (troca de filtro) nunca
 * seriam revelados e ficariam presos em opacity:0. Como é uma ação de clique
 * do usuário, faz sentido aparecer na hora mesmo — sem fade-in.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { type Project, projectMeta } from "@/lib/content";

/** Categoria "de cima" usada no filtro (ex.: "Residencial · Reforma" → "Residencial"). */
function topCategory(category: string): string {
  return category.split(" · ")[0];
}

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const p of projects) seen.add(topCategory(p.category));
    return ["Todos", ...Array.from(seen)];
  }, [projects]);

  const [active, setActive] = useState("Todos");
  const isAll = active === "Todos";
  const filtered = isAll
    ? projects
    : projects.filter((p) => topCategory(p.category) === active);

  // Só no estado padrão ("Todos") o primeiro projeto ganha o tratamento de
  // destaque grande — em qualquer filtro específico, a grade fica uniforme.
  const [featured, ...rest] = isAll ? projects : [];
  const gridItems = isAll ? rest : filtered;

  return (
    <>
      {categories.length > 2 && (
        <nav className="projects-filter" aria-label="Filtrar projetos por categoria">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`projects-filter-btn ${active === c ? "is-active" : ""}`}
            >
              {c}
            </button>
          ))}
        </nav>
      )}

      {featured && (
        <Link href={`/projetos/${featured.slug}`} className="project-featured">
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
            {projectMeta(featured) && (
              <p className="project-card-meta">{projectMeta(featured)}</p>
            )}
            <p className="project-card-summary">{featured.summary}</p>
            <span className="project-card-link">Ver projeto →</span>
          </div>
        </Link>
      )}

      {gridItems.length > 0 ? (
        <section className="projects-grid">
          {gridItems.map((p) => (
            <Link key={p.slug} href={`/projetos/${p.slug}`} className="project-card">
              <div className="project-card-media">
                <SmartImage src={p.cover} alt={p.title} className="project-card-img" />
                <span className="project-card-cat">{p.category}</span>
              </div>
              <div className="project-card-body">
                <h2 className="project-card-title">{p.title}</h2>
                {projectMeta(p) && (
                  <p className="project-card-meta">{projectMeta(p)}</p>
                )}
                <p className="project-card-summary">{p.summary}</p>
                <span className="project-card-link">Ver projeto →</span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <p className="projects-empty">Nenhum projeto nessa categoria ainda.</p>
      )}
    </>
  );
}
