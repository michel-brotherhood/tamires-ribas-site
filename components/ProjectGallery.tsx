"use client";

/**
 * ProjectGallery.tsx
 * -----------------------------------------------------------------------------
 * Galeria de fotos do projeto, preparada para conjuntos grandes (algumas
 * pastas de clientes têm 20-90 fotos). Mostra um primeiro lote na grade;
 * "Ver mais" revela o resto. Clicar em qualquer foto abre um visualizador em
 * tela cheia com navegação (setas, teclado, contador).
 * -----------------------------------------------------------------------------
 */

import { useCallback, useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import FrameButton from "@/components/FrameButton";

const INITIAL_COUNT = 12;

export default function ProjectGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasMore = images.length > INITIAL_COUNT;
  const visible = expanded ? images : images.slice(0, INITIAL_COUNT);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      <section className="project-gallery">
        {visible.map((src, i) => (
          <button
            key={src}
            type="button"
            className="project-gallery-item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Ampliar foto ${i + 1} de ${images.length}`}
          >
            <SmartImage src={src} alt={`${alt} — imagem ${i + 1}`} />
          </button>
        ))}
      </section>

      {hasMore && !expanded && (
        <div className="project-gallery-more">
          <FrameButton onClick={() => setExpanded(true)}>
            Ver mais {images.length - INITIAL_COUNT} fotos
          </FrameButton>
        </div>
      )}

      {lightboxIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — visualizador de fotos`}
          onClick={close}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={close}
            aria-label="Fechar"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
            >
              ←
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightboxIndex]}
            alt={`${alt} — imagem ${lightboxIndex + 1}`}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima foto"
            >
              →
            </button>
          )}

          <span className="lightbox-counter">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
