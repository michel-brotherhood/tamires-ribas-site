"use client";

/**
 * AmbientSceneClient.tsx
 * -----------------------------------------------------------------------------
 * Wrapper que carrega a cena ambiente das páginas internas via dynamic(ssr:false),
 * mantendo o Three.js fora do bundle inicial dessas rotas.
 *
 * Renderiza um fundo fixo, atrás do conteúdo (z-index 0), com baixa opacidade
 * para o 3D ser uma assinatura sutil — o texto continua perfeitamente legível.
 * -----------------------------------------------------------------------------
 */

import dynamic from "next/dynamic";

const AmbientScene = dynamic(() => import("./AmbientScene"), {
  ssr: false,
  loading: () => null,
});

export default function AmbientSceneClient() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <AmbientScene />
    </div>
  );
}
