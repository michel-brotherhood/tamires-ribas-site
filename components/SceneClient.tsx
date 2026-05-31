"use client";

/**
 * SceneClient.tsx
 * -----------------------------------------------------------------------------
 * Wrapper client-side que carrega a cena 3D de forma dinâmica com ssr:false.
 *
 * É AQUI que garantimos que three / fiber / drei fiquem em um chunk separado
 * (lazy), fora do bundle inicial da rota. Não importe Scene.tsx estaticamente
 * em nenhum outro lugar.
 * -----------------------------------------------------------------------------
 */

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

export default function SceneClient() {
  return (
    <div className="scene-fixed">
      <Scene />
    </div>
  );
}
