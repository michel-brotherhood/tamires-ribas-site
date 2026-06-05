"use client";

/**
 * ImmersiveHome.tsx
 * -----------------------------------------------------------------------------
 * Home no estilo da referência (ICG Gallery): uma GALERIA DE AMBIENTES em tela
 * cheia. A cada rolagem a cena "encaixa" no próximo ambiente (snap), com uma
 * transição rápida (cross-dissolve + leve zoom). Cada ambiente é uma IMAGEM
 * distinta — por isso "muda" de verdade ao rolar (não é o mesmo vídeo contínuo).
 *
 * Depois dos ambientes, o conteúdo (Projetos/Depoimentos/Contato) flui na mesma
 * página. A 360° é página à parte. Troque as imagens por renders reais depois.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/Logo";

gsap.registerPlugin(ScrollTrigger);

/** Ambientes (imagens distintas). Substituir por renders/fotos reais. */
const ROOMS = [
  { img: "/experiencia/amb-1.webp", label: "Fachada" },
  { img: "/experiencia/amb-2.webp", label: "Jardim" },
  { img: "/experiencia/amb-3.webp", label: "Pátio Social" },
  { img: "/experiencia/amb-4.webp", label: "Estar" },
];

const SCROLL_VH = 300; // espaço de rolagem da galeria; depois o conteúdo flui

/* Página única: nav rola para as seções (âncoras). 360° é página à parte. */
const NAV = [
  { label: "Projetos", href: "#home-projetos" },
  { label: "Depoimentos", href: "#home-depoimentos" },
  { label: "360°", href: "/experiencia-360" },
  { label: "Contato", href: "#home-contato" },
];

export default function ImmersiveHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [inFly, setInFly] = useState(true);

  const n = ROOMS.length;

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
    const root = rootRef.current;
    if (!root) return;

    let lastBucket = -1;
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".iv-scene");
      gsap.set(scenes, { opacity: 0, force3D: true });
      gsap.set(scenes[0], { opacity: 1 });
      gsap.set(".iv-media", { scale: 1.04, transformOrigin: "center", force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: reduced ? true : 0.5,
          // EM PASSOS: cada rolagem encaixa no próximo ambiente (como a referência).
          snap: reduced
            ? undefined
            : { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.5 }, ease: "power2.inOut" },
          invalidateOnRefresh: true,
          onLeave: () => setInFly(false),
          onEnterBack: () => setInFly(true),
          onUpdate: (self) => {
            const bucket = Math.min(n - 1, Math.round(self.progress * (n - 1)));
            if (bucket !== lastBucket) {
              lastBucket = bucket;
              setActive(bucket);
            }
          },
        },
      });

      // Cross-dissolve sem escurecer: a cena nova surge POR CIMA da anterior.
      for (let i = 1; i < n; i++) {
        tl.fromTo(scenes[i], { opacity: 0 }, { opacity: 1, ease: "none" }, i - 1);
        const m = scenes[i].querySelector<HTMLElement>(".iv-media");
        if (m) tl.fromTo(m, { scale: 1.12 }, { scale: 1.02, ease: "none" }, i - 1);
      }

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="iv" style={{ height: `${SCROLL_VH}vh` }}>
      {/* Palco fixo: ambientes empilhados */}
      <div className="iv-stage">
        {ROOMS.map((r, i) => (
          <div key={r.img} className={`iv-scene iv-scene-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="iv-media" src={r.img} alt="" />
          </div>
        ))}
        <div className="iv-vignette" aria-hidden="true" />
      </div>

      {/* Header minimalista */}
      <header className="iv-nav">
        <Link href="/" className="iv-nav-logo" aria-label="TR — Início">
          <Logo variant="branco" className="brand-logo" />
        </Link>
        <span className="iv-nav-center">Galeria</span>
        <nav className="iv-nav-links">
          {NAV.map((l) =>
            l.href.startsWith("#") ? (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ),
          )}
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
      <div className={`iv-corner iv-corner--bl ${inFly ? "" : "is-hidden"}`} aria-live="polite">
        <span className="iv-corner-label">Ambiente</span>
        <span className="iv-corner-value">{ROOMS[active]?.label}</span>
      </div>

      {/* Rodapé central — índice + hint */}
      <div className={`iv-corner iv-corner--br ${inFly ? "" : "is-hidden"}`} aria-hidden="true">
        <span className="iv-corner-index">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <span className={`iv-scrollhint ${active > 0 ? "is-hidden" : ""}`}>Role para percorrer</span>
      </div>

      {/* Menu mobile */}
      <div className={`iv-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="iv-menu-top">
          <Logo variant="branco" className="brand-logo" />
          <button type="button" className="iv-menu-close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
            <span />
            <span />
          </button>
        </div>
        <nav className="iv-menu-links">
          {NAV.map((l, i) => {
            const style = {
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              transition: `opacity .4s ease ${0.06 * i + 0.1}s, transform .4s ease ${0.06 * i + 0.1}s`,
            };
            return l.href.startsWith("#") ? (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={style}>
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={style}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="iv-menu-foot">+55 21 98597-8830</div>
      </div>
    </div>
  );
}
