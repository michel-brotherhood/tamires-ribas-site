/**
 * HomeShowcase.tsx
 * -----------------------------------------------------------------------------
 * Conteúdo da home que vem DEPOIS da experiência 3D: projetos, depoimentos e
 * contato. Fica fora do <main> (que é o trigger do ScrollTrigger), com fundo
 * sólido que cobre o canvas 3D fixo — assim a timeline do modelo permanece
 * intacta e o usuário entra em uma área de site "normal" ao final do scroll.
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Logo from "@/components/Logo";
import { PROJECTS } from "@/lib/content";

export default function HomeShowcase() {
  const projects = PROJECTS.slice(0, 3);

  return (
    <div className="home-showcase">
      {/* Zona de transição: o modelo 3D (canvas fixo atrás) se dissolve
          suavemente no fundo sólido antes do conteúdo começar. */}
      <div className="showcase-transition" aria-hidden="true" />

      <div className="showcase-solid">
      {/* ---------------- PROJETOS ---------------- */}
      <section id="home-projetos" className="showcase-section">
        <div className="showcase-head">
          <div>
            <span className="section-index">Portfólio</span>
            <h2 className="headline-md">
              Projetos <em>recentes.</em>
            </h2>
          </div>
          <Link href="/projetos" className="cta-ghost showcase-head-cta">
            Ver todos
          </Link>
        </div>

        <div className="showcase-projects">
          {projects.map((p) => (
            <Link
              key={p.slug}
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
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-meta">
                  {p.location} · {p.year} · {p.area}
                </p>
                <p className="project-card-summary">{p.summary}</p>
                <span className="project-card-link">Ver projeto →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- DEPOIMENTOS ---------------- */}
      <section id="home-depoimentos" className="showcase-section showcase-testimonials">
        <Testimonials />
      </section>

      {/* ---------------- CONTATO ---------------- */}
      <section id="home-contato" className="showcase-section showcase-contact">
        <div className="contact-split">
          <div className="contact-intro">
            <span className="section-index">Contato</span>
            <h2 className="headline-md">
              Vamos criar <em>juntos.</em>
            </h2>
            <p className="body-text mt-5">
              Conte sobre o seu projeto. Respondemos em até dois dias úteis.
            </p>

            <ul className="contact-channels">
              <li>
                <span className="contact-label">WhatsApp</span>
                <a
                  href="https://wa.me/5521985978830"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +55 21 98597-8830
                </a>
              </li>
              <li>
                <span className="contact-label">Arquiteta</span>
                <span>Tamires Ribas</span>
              </li>
              <li>
                <span className="contact-label">Atendimento</span>
                <span>Projetos de alto padrão</span>
              </li>
              <li>
                <span className="contact-label">Resposta</span>
                <span>Em até 2 dias úteis</span>
              </li>
            </ul>
          </div>

          <div className="contact-form-card">
            <ContactForm />
          </div>
        </div>

        <footer className="showcase-footer">
          <Logo variant="branco" className="brand-logo" />
          <span>
            © {new Date().getFullYear()} TR Arquitetura e Interiores
          </span>
        </footer>
      </section>
      </div>
    </div>
  );
}
