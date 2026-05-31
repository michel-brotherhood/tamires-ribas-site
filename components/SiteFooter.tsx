/**
 * SiteFooter.tsx — rodapé das páginas internas.
 */

import Link from "next/link";
import Logo from "@/components/Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <span className="site-logo">
          <Logo variant="branco" className="brand-logo brand-logo--lg" />
        </span>
        <nav className="site-footer-nav">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/projetos">Projetos</Link>
          <Link href="/experiencia-360">360°</Link>
          <Link href="/contato">Contato</Link>
        </nav>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} TR Arquitetura e Interiores</span>
        <span>Arquitetura e interiores de alto padrão</span>
      </div>
    </footer>
  );
}
