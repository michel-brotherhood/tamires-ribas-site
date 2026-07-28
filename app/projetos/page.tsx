import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos — TR Arquitetura e Interiores",
  description:
    "Portfólio de projetos residenciais e comerciais de alto padrão da TR Arquitetura e Interiores.",
};

export default function ProjetosPage() {
  return (
    <div className="has-ambient">
      <ScrollReveal />
      <SiteHeader />

      <main className="page">
        <header className="page-hero">
          <span className="section-index">Portfólio</span>
          <h1 className="headline text-ink">
            Projetos <em>autorais.</em>
          </h1>
          <p className="body-text mt-6">
            Uma seleção de projetos de alto padrão onde personalidade,
            conforto e atemporalidade caminham juntos.
          </p>
        </header>

        <ProjectsExplorer projects={PROJECTS} />
      </main>

      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
