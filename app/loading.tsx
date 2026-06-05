/**
 * loading.tsx (raiz) — feedback instantâneo ao navegar entre páginas.
 * O Next mostra isto enquanto a próxima rota carrega (em dev, durante a
 * compilação sob demanda; em produção, durante o carregamento). O fundo
 * imersivo (no layout) permanece atrás — só o conteúdo mostra o loader.
 */
export default function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading-mark">TR</span>
      <span className="route-loading-bar" />
    </div>
  );
}
