"use client";

/**
 * SiteBackdrop.tsx
 * -----------------------------------------------------------------------------
 * FUNDO IMERSIVO ÚNICO E PERSISTENTE do site inteiro. Fica no layout, então
 * NÃO recarrega ao trocar de página (Next mantém o layout) — o mesmo ambiente
 * permanece atrás de Home / Sobre / Projetos / Contato, sem "trocar de fundo".
 * O conteúdo de cada página apenas sobrepõe.
 *
 * Vídeo do flythrough em loop ambiente (mudo), com um sombreado escuro para o
 * texto/conteúdo ler bem por cima. Em /experiencia-360 o fundo é ocultado
 * (a 360° tem o viewer próprio). prefers-reduced-motion / Save-Data → pôster.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const VIDEO = "/video/videosite2.2.mp4";
const POSTER = "/video/videosite2.2-poster.webp";

export default function SiteBackdrop() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);

  // 360° tem o próprio viewer em tela cheia → some com o fundo lá.
  const hidden = pathname?.startsWith("/experiencia-360");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const save = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || ""));
    if (!reduced && !save) setUseVideo(true);
  }, []);

  useEffect(() => {
    if (useVideo) videoRef.current?.play().catch(() => {});
  }, [useVideo]);

  if (hidden) return null;

  return (
    <div className="site-backdrop" aria-hidden="true">
      {useVideo ? (
        <video
          ref={videoRef}
          className="site-backdrop__media"
          src={VIDEO}
          poster={POSTER}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="site-backdrop__media" src={POSTER} alt="" />
      )}
      <div className="site-backdrop__scrim" />
    </div>
  );
}
