"use client";

/**
 * SmartImage.tsx
 * -----------------------------------------------------------------------------
 * <img> com fallback: se o arquivo não existir/falhar, mostra um placeholder
 * elegante (gradiente concreto + rótulo). Assim a página de portfólio funciona
 * mesmo antes de você adicionar as fotos reais em public/projetos/.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

export default function SmartImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`smart-image-fallback ${className ?? ""}`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
