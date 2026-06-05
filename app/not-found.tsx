import type { Metadata } from "next";
import FrameButton from "@/components/FrameButton";

export const metadata: Metadata = {
  title: "Página não encontrada — TR Arquitetura e Interiores",
};

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound-inner">
        <span className="section-index">Erro 404</span>
        <h1 className="headline text-ink">
          Espaço <em>não encontrado.</em>
        </h1>
        <p className="body-text mx-auto mt-6">
          A página que você procura pode ter sido movida ou não existe mais.
          Vamos te levar de volta a um lugar conhecido.
        </p>
        <div className="notfound-actions">
          <FrameButton href="/">Voltar ao início</FrameButton>
          <FrameButton href="/projetos">Ver projetos</FrameButton>
        </div>
      </div>
    </main>
  );
}
