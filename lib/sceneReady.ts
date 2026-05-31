/**
 * sceneReady.ts
 * -----------------------------------------------------------------------------
 * Pequeno módulo de coordenação entre LoadingScreen e o modelo 3D.
 * Usa apenas eventos nativos do browser — sem Zustand, sem contexto, sem libs.
 *
 * Fluxo:
 *   1. LoadingScreen trava o scroll ao montar.
 *   2. ArchitectureModel prepara o GLB e chama markModelReady().
 *   3. LoadingScreen escuta (onModelReady), faz fade-out e chama markIntroStart().
 *   4. ArchitectureModel escuta (onIntroStart), toca a intro e, no fim, libera
 *      o scroll com unlockScroll().
 * -----------------------------------------------------------------------------
 */

const MODEL_READY = "aurea:model-ready";
const INTRO_START = "aurea:intro-start";

const isBrowser = typeof window !== "undefined";

/* --------------------------------- Scroll lock --------------------------------- */

export function lockScroll(): void {
  if (!isBrowser) return;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

export function unlockScroll(): void {
  if (!isBrowser) return;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

/* ------------------------------- Model ready event ----------------------------- */

export function markModelReady(): void {
  if (!isBrowser) return;
  window.dispatchEvent(new CustomEvent(MODEL_READY));
}

/** Retorna uma função de unsubscribe. */
export function onModelReady(cb: () => void): () => void {
  if (!isBrowser) return () => {};
  window.addEventListener(MODEL_READY, cb);
  return () => window.removeEventListener(MODEL_READY, cb);
}

/* ------------------------------- Intro start event ----------------------------- */

export function markIntroStart(): void {
  if (!isBrowser) return;
  window.dispatchEvent(new CustomEvent(INTRO_START));
}

/** Retorna uma função de unsubscribe. */
export function onIntroStart(cb: () => void): () => void {
  if (!isBrowser) return () => {};
  window.addEventListener(INTRO_START, cb);
  return () => window.removeEventListener(INTRO_START, cb);
}
