"use client";

/**
 * ScrollReveal.tsx
 * -----------------------------------------------------------------------------
 * Revela suavemente (fade + leve subida) os elementos marcados com
 * [data-reveal] quando entram na viewport. Uma instância por página.
 *
 * • Usa ScrollTrigger.batch (eficiente: agrupa os gatilhos próximos).
 * • Anima UMA vez por elemento (once) — não "pisca" ao rolar de volta.
 * • Respeita prefers-reduced-motion: não esconde nada, deixa tudo visível.
 * • Para não causar flash, marque com [data-reveal] apenas blocos ABAIXO da
 *   dobra (o conteúdo já visível no load não deve ser escondido).
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  selector = "[data-reveal]",
}: {
  selector?: string;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = gsap.utils.toArray<HTMLElement>(selector);
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 28, willChange: "opacity, transform" });

    const triggers = ScrollTrigger.batch(items, {
      start: "top 86%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          overwrite: true,
          onComplete: () =>
            batch.forEach((el) => ((el as HTMLElement).style.willChange = "")),
        }),
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(items, { clearProps: "opacity,transform,willChange" });
    };
  }, [selector]);

  return null;
}
