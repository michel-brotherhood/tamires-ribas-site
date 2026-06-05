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
  const rootRef = useRef<HTMLDivElement>(null);
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

  /* FUNDO CONDUZIDO PELA ROLAGEM: o vídeo (flythrough) fica PAUSADO e o scroll
     conduz os quadros (scrub) — a câmera "avança" pelo ambiente conforme você
     rola. Persistente em todo o site; cada página mapeia seu scroll 0→1 no
     vídeo. Lerp para suavidade; guarda contra seeks redundantes (sem travar).
     Vídeo all-intra → seeking fluido. Desligado em reduced-motion / lite. */
  useEffect(() => {
    if (hidden || !useVideo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (!video) return;

    // posiciona no 1º quadro (e "prime" do iOS para o seek de vídeo pausado)
    video.pause();
    const seek0 = () => { if (isFinite(video.duration)) video.currentTime = 0.001; };
    video.play().then(() => video.pause()).catch(() => {}).finally(() => {
      if (video.readyState >= 1) seek0();
      else video.addEventListener("loadedmetadata", seek0, { once: true });
    });

    let cur = 0, target = 0, lastCt = -1, raf = 0, running = true;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      target = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const loop = () => {
      if (!running) return;
      cur += (target - cur) * 0.12; // lerp → atraso suave
      const d = video.duration;
      if (d && isFinite(d)) {
        const ct = cur * (d - 0.05);
        if (Math.abs(ct - lastCt) > 0.008) { // evita seek redundante (anti-trava)
          video.currentTime = ct;
          lastCt = ct;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hidden, pathname, useVideo]);

  if (hidden) return null;

  return (
    <div ref={rootRef} className="site-backdrop" aria-hidden="true">
      {useVideo ? (
        <video
          ref={videoRef}
          className="site-backdrop__media"
          src={VIDEO}
          poster={POSTER}
          muted
          playsInline
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
