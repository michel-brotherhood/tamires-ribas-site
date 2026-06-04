"use client";

/**
 * ImmersiveHome.tsx
 * -----------------------------------------------------------------------------
 * Home no estilo da referência (ICG Gallery): um WALKTHROUGH em tela cheia onde
 * a ROLAGEM leva a câmera pelos ambientes. O vídeo de flythrough fica PAUSADO e
 * o scroll conduz os quadros (scrub) — você "anda" pelo espaço ao rolar.
 *
 * Chrome minimalista (como a referência): header fino (logo · centro · nav),
 * rótulo do ambiente no canto inferior esquerdo, índice/hint no canto direito.
 * Sem textão editorial. O vídeo é re-codificado all-intra → seeking fluido.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/Logo";

gsap.registerPlugin(ScrollTrigger);

const VIDEO = "/video/videosite2.2.mp4";
const POSTER = "/video/videosite2.2-poster.webp";
const SCROLL_VH = 460; // altura do container = espaço de rolagem do flythrough

/** Rótulos dos "ambientes" conforme a câmera avança (canto inferior esquerdo). */
const AREAS = ["Fachada", "Entrada", "Área Social", "Cozinha & Sala", "Suíte"];

const NAV = [
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "360°", href: "/experiencia-360" },
  { label: "Contato", href: "/contato" },
];

export default function ImmersiveHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // fecha o menu mobile com Esc + trava scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const save = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || ""));
    if (!reduced && !save) setVideoSrc(VIDEO); // carrega o vídeo no cliente

    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    // vídeo pausado; o scroll conduz os quadros
    const seek0 = () => {
      if (isFinite(video.duration)) video.currentTime = 0.001;
    };
    video.pause();
    video.play().then(() => video.pause()).catch(() => {}).finally(() => {
      if (video.readyState >= 1) seek0();
      else video.addEventListener("loadedmetadata", seek0, { once: true });
    });

    let lastBucket = -1;
    const ctx = gsap.context(() => {
      gsap.set(video, { scale: 1.06, transformOrigin: "center", force3D: true });
      const proxy = { t: 0 };
      gsap.to(proxy, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: reduced ? true : 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const d = video.duration;
            if (d && isFinite(d)) video.currentTime = proxy.t * (d - 0.05);
            // pan vertical sutil acompanhando o avanço
            gsap.set(video, { yPercent: gsap.utils.interpolate(3, -3, proxy.t) });
            const bucket = Math.min(AREAS.length - 1, Math.floor(self.progress * AREAS.length));
            if (bucket !== lastBucket) {
              lastBucket = bucket;
              setProgress(self.progress);
            }
          },
        },
      });
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const areaIdx = Math.min(AREAS.length - 1, Math.floor(progress * AREAS.length));

  return (
    <div ref={rootRef} className="iv" style={{ height: `${SCROLL_VH}vh` }}>
      {/* Palco fixo em tela cheia */}
      <div className="iv-stage">
        <video
          ref={videoRef}
          className="iv-media"
          src={videoSrc}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
        />
        <div className="iv-vignette" aria-hidden="true" />
      </div>

      {/* Header minimalista (logo · centro · nav) */}
      <header className="iv-nav">
        <Link href="/" className="iv-nav-logo" aria-label="TR — Início">
          <Logo variant="branco" className="brand-logo" />
        </Link>
        <span className="iv-nav-center">Galeria</span>
        <nav className="iv-nav-links">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="iv-burger"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Canto inferior esquerdo — ambiente atual */}
      <div className="iv-corner iv-corner--bl" aria-live="polite">
        <span className="iv-corner-label">Ambiente</span>
        <span className="iv-corner-value">{AREAS[areaIdx]}</span>
      </div>

      {/* Canto inferior direito — índice + hint */}
      <div className="iv-corner iv-corner--br" aria-hidden="true">
        <span className="iv-corner-index">
          {String(areaIdx + 1).padStart(2, "0")} / {String(AREAS.length).padStart(2, "0")}
        </span>
        <span className={`iv-scrollhint ${progress > 0.02 ? "is-hidden" : ""}`}>
          Role para percorrer
        </span>
      </div>

      {/* Menu mobile em overlay */}
      <div className={`iv-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="iv-menu-top">
          <Logo variant="branco" className="brand-logo" />
          <button type="button" className="iv-menu-close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
            <span />
            <span />
          </button>
        </div>
        <nav className="iv-menu-links">
          {NAV.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                transition: `opacity .4s ease ${0.06 * i + 0.1}s, transform .4s ease ${0.06 * i + 0.1}s`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="iv-menu-foot">+55 21 98597-8830</div>
      </div>
    </div>
  );
}
