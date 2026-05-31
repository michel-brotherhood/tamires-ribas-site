"use client";

/**
 * LoadingScreen.tsx
 * -----------------------------------------------------------------------------
 * Tela de carregamento em fundo off-white.
 *
 * ⚠️  IMPORTANTE: este arquivo NÃO pode importar nada de three / drei / fiber,
 *     para que ele fique no bundle inicial leve e apareça instantaneamente,
 *     enquanto a cena 3D carrega em um chunk separado.
 *
 * Fluxo:
 *   - Ao montar: trava o scroll.
 *   - Escuta onModelReady().
 *   - Quando o modelo está pronto: segura 280ms → fade-out 500ms → dispara
 *     markIntroStart() (a intro do modelo então começa) → remove do DOM.
 *
 * A barra é puramente decorativa (CSS): a prontidão real vem do evento.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import {
  lockScroll,
  onModelReady,
  markIntroStart,
} from "@/lib/sceneReady";

const HOLD_MS = 150;
const FADE_MS = 400;

export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Trava o scroll assim que a experiência inicia.
    lockScroll();

    const unsubscribe = onModelReady(() => {
      // Segura um instante para o usuário perceber a transição.
      window.setTimeout(() => {
        setFading(true);

        // Após o fade, libera a intro e remove a tela do DOM.
        window.setTimeout(() => {
          markIntroStart();
          setHidden(true);
        }, FADE_MS);
      }, HOLD_MS);
    });

    return unsubscribe;
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden={fading}
      className="loading-screen fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marca/logo-branco.webp"
        alt="TR Arquitetura e Interiores"
        className="loading-logo mb-11 w-auto"
        draggable={false}
      />

      <div className="loading-bar loading-bar--light" />

      <div className="mt-7 text-[13px] font-medium uppercase tracking-[0.24em] text-white">
        Arquitetura e Interiores de Alto Padrão
      </div>
    </div>
  );
}
