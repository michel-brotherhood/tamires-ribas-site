"use client";

/**
 * VideoBackground.tsx
 * -----------------------------------------------------------------------------
 * Fundo em vídeo cinematográfico que SUBSTITUI a antiga cena 3D.
 *
 * Efeito: o vídeo fica PAUSADO e a ROLAGEM conduz a reprodução — descer avança
 * os quadros (currentTime), subir retrocede ("scrub"). Em paralelo, uma
 * PANORÂMICA VERTICAL acompanha o mesmo progresso de scroll. O vídeo é
 * re-codificado com keyframe em cada quadro (all-intra) para o seeking ser
 * fluido, sem o engasgo típico de MP4 comum.
 *
 * Dois modos:
 *   • "hero"    → home. Panorâmica amarrada ao scroll do <main>. Reproduz o
 *                 contrato de carregamento/intro que antes vivia no 3D
 *                 (markModelReady → intro → unlockScroll).
 *   • "ambient" → páginas internas. Mais discreto, varredura sobre a página
 *                 inteira, sem trava de scroll nem intro. (NÃO usar na 360°.)
 *
 * Robustez:
 *   • prefers-reduced-motion: vídeo congelado, sem panorâmica.
 *   • Safety timeout: libera a LoadingScreen mesmo se o vídeo falhar (hero).
 *   • A panorâmica é criada DE IMEDIATO (não depende da intro) e re-medida no
 *     unlock — para nunca ficar "estática".
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markModelReady, onIntroStart, unlockScroll } from "@/lib/sceneReady";

gsap.registerPlugin(ScrollTrigger);

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/* --------- intro (✅ seguras para ajustar) --------- */
const INTRO_DURATION = 1.4; // s — fade/zoom suave de entrada do vídeo
const INTRO_SCALE_FROM = 1.06; // leve zoom-out glamouroso ao revelar
const HERO_REVEAL_AT = 0.4; // s — quando o texto do hero aparece
const HERO_REVEAL_DURATION = 0.8;
const SAFETY_MS = 3000; // libera o loading mesmo se o vídeo não sinalizar

/* --------- panorâmica VERTICAL controlada pelo SCROLL (✅ seguro ajustar) ---
 * O vídeo desliza para CIMA ao DESCER a página (revela a parte de baixo) e
 * volta ao SUBIR — acompanhando o scroll, como uma panorâmica/tilt.
 * PAN   = amplitude do deslocamento vertical (% da altura). Topo = +PAN
 *         (vídeo abaixado); fim = -PAN (vídeo levantado).
 * SCALE = zoom de base para o deslocamento não revelar as bordas (cobre 2× PAN).
 * SMOOTH = suavização (s) entre o scroll e o movimento. Baixo = "cola" no scroll. */
const PAN = { hero: 16, ambient: 10 };
const SCALE = { hero: 1.4, ambient: 1.28 };
const SMOOTH = 0.35;

type Mode = "hero" | "ambient";

export default function VideoBackground({
  src,
  mode = "hero",
  poster,
}: {
  src: string;
  mode?: Mode;
  poster?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // src só é definido no cliente (e só quando NÃO for conexão econômica), para
  // não baixar o vídeo à toa. Em SSR fica indefinido → só o pôster aparece.
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduced = window.matchMedia(REDUCED_QUERY).matches;
    // Data-aware: economiza dados (Save-Data ou 2g) → fica só no pôster, sem
    // baixar o vídeo nem fazer scrub (mantém o sombreado e o tilt leve).
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || ""));
    const lite = reduced || saveData; // sem vídeo (só pôster)

    const pan = PAN[mode];
    const scale = SCALE[mode];

    let st: ScrollTrigger | null = null;
    let introTl: gsap.core.Timeline | null = null;
    let unsubIntro: (() => void) | null = null;
    let safetyId = 0;
    let started = false;

    // Carrega o vídeo apenas quando vale a pena (senão, fica no pôster estático).
    if (!lite) setVideoSrc(src);

    // O vídeo NÃO toca sozinho: fica PAUSADO; é o scroll que conduz os quadros.
    // "Priming" do iOS: um play()/pause() mudo destrava o seeking de vídeo
    // pausado no Safari mobile. Depois posiciona no 1º quadro.
    const startPlayback = () => {
      if (lite) return;
      video.loop = false;
      const seek0 = () => {
        if (isFinite(video.duration)) video.currentTime = 0.001;
      };
      video
        .play()
        .then(() => video.pause())
        .catch(() => {})
        .finally(() => {
          if (video.readyState >= 1) seek0();
          else video.addEventListener("loadedmetadata", seek0, { once: true });
        });
    };

    // SCROLL conduz a reprodução (currentTime) + a PANORÂMICA VERTICAL.
    // Um único ScrollTrigger com scrub: proxy.t (0→1) acompanha o scroll com
    // suavização; em cada update escrevemos o quadro do vídeo e o deslocamento.
    const buildMotion = () => {
      gsap.set(video, { transformOrigin: "center center", scale, yPercent: pan });
      if (reduced) return; // congelado, sem scrub nem varredura

      const proxy = { t: 0 };
      const tween = gsap.to(proxy, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mode === "hero" ? "main" : document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: SMOOTH,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const d = video.duration;
          if (d && isFinite(d)) {
            // -0.05s evita travar exatamente no último quadro (alguns players).
            video.currentTime = proxy.t * (d - 0.05);
          }
          gsap.set(video, { yPercent: gsap.utils.interpolate(pan, -pan, proxy.t) });
        },
      });
      st = tween.scrollTrigger ?? null;
      ScrollTrigger.refresh();
    };

    /* ----------------------------- MODO AMBIENTE ----------------------------- */
    if (mode === "ambient") {
      startPlayback();
      buildMotion();
      return () => {
        st?.kill();
      };
    }

    /* ------------------------------- MODO HERO ------------------------------- */
    // Esconde o texto do hero antes da intro (a LoadingScreen cobre a tela).
    gsap.set("[data-hero-reveal]", { opacity: 0, y: 22 });
    // Estado inicial do vídeo: invisível e levemente ampliado (a intro revela).
    gsap.set(wrap, { opacity: 0, scale: INTRO_SCALE_FROM });

    // A panorâmica já fica armada de imediato (o scroll está travado até a
    // intro terminar, mas o ScrollTrigger já existe e responde no unlock).
    buildMotion();

    const start = () => {
      if (started) return;
      started = true;
      window.clearTimeout(safetyId);
      startPlayback(); // posiciona o vídeo (ou nada, no modo lite)
      markModelReady(); // libera a LoadingScreen (mesmo contrato do antigo 3D)
    };

    if (lite) {
      // Sem vídeo p/ esperar: libera a LoadingScreen já no próximo frame.
      requestAnimationFrame(start);
    } else {
      video.addEventListener("loadeddata", start);
      video.addEventListener("canplay", start);
      video.addEventListener("error", start); // rede lenta/erro: não trava o loading
      safetyId = window.setTimeout(start, SAFETY_MS);
    }

    // Quando a LoadingScreen termina o fade, roda a intro (apenas o reveal).
    unsubIntro = onIntroStart(() => {
      introTl = gsap.timeline();
      introTl
        .to(wrap, {
          opacity: 1,
          scale: 1,
          duration: INTRO_DURATION,
          ease: "power2.out",
        })
        .to(
          "[data-hero-reveal]",
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: HERO_REVEAL_DURATION,
            ease: "power2.out",
          },
          HERO_REVEAL_AT,
        )
        .eventCallback("onComplete", () => {
          unlockScroll();
          document.documentElement.classList.add("aurea-ready");
          // ⚠️ Re-mede SÓ depois que o navegador aplicou o unlock e recalculou
          // a altura rolável (senão o ScrollTrigger mede range 0 e a panorâmica
          // fica "estática"). Daí o duplo rAF + um refresh de segurança.
          requestAnimationFrame(() =>
            requestAnimationFrame(() => ScrollTrigger.refresh()),
          );
          setTimeout(() => ScrollTrigger.refresh(), 400);
        });
    });

    return () => {
      window.clearTimeout(safetyId);
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      video.removeEventListener("error", start);
      unsubIntro?.();
      introTl?.kill();
      st?.kill();
    };
    // Intencional: monta uma vez por rota.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, mode]);

  return (
    <div ref={wrapRef} className={`video-bg video-bg--${mode}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="video-bg__media"
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        preload="auto"
        // src só é setado no cliente (data-aware). Sem autoPlay/loop: a
        // reprodução é conduzida pelo scroll (scrub). O pôster cobre o resto.
      />
      {/* Sombreado: lavagem quente p/ legibilidade + vinheta cinematográfica. */}
      <div className="video-bg__scrim" />
    </div>
  );
}
