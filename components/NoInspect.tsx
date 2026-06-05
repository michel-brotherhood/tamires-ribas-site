"use client";

/**
 * NoInspect.tsx
 * -----------------------------------------------------------------------------
 * Desativa o menu de contexto (botão direito) e os atalhos comuns de devtools
 * (F12, Ctrl+Shift+I/J/C, Ctrl+U). ⚠️ Isto apenas DESENCORAJA o usuário casual
 * — não é uma proteção real (devtools não pode ser bloqueado de verdade no
 * navegador). Serve para a experiência ficar mais "fechada".
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";

export default function NoInspect() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || "").toLowerCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (k === "i" || k === "j" || k === "c")) ||
        (e.metaKey && e.altKey && (k === "i" || k === "j" || k === "c")) || // mac
        (e.ctrlKey && k === "u")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
