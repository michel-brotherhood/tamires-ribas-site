/**
 * scrollStates.ts
 * -----------------------------------------------------------------------------
 * Estados de posição / rotação / escala do modelo arquitetônico para cada uma
 * das 6 seções da página. A timeline de scroll (em ArchitectureModel.tsx)
 * interpola o modelo entre estes estados.
 *
 * ✅ SEGURO AJUSTAR: os valores numéricos de position/rotation/scale e os
 *    fatores de mobile abaixo. São a forma mais direta de recoreografar a
 *    experiência sem tocar na lógica de animação.
 * ⚠️  NÃO ALTERAR: a quantidade de estados (6) nem os `id`, pois correspondem
 *    1:1 às seções renderizadas em ScrollSections.tsx.
 * -----------------------------------------------------------------------------
 */

export type ScrollState = {
  id: "hero" | "concept" | "facade" | "floorplan" | "materials" | "final";
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

// Estados ajustados para o MONOGRAMA "TR" (escultura extrudada).
// A letra é alta e fina (frente em +Z): rotation.y fica perto de 0 para o "TR"
// permanecer LEGÍVEL (nunca vira de perfil); sem o tombamento de 90° (que para
// letras ficaria ilegível). Escalas menores que as de uma casa, pois a altura
// do monograma é a maior dimensão.
export const SCROLL_STATES: ScrollState[] = [
  {
    id: "hero",
    position: [0.5, 0.0, 0.05],
    rotation: [0.05, -0.4, 0.02],
    scale: 1.4,
  },
  {
    id: "concept",
    position: [-0.45, 0.02, 0.3],
    rotation: [0.04, 0.5, 0.01],
    scale: 1.45,
  },
  {
    id: "facade",
    position: [-0.05, -0.02, 0.2],
    rotation: [0.02, 0.0, 0],
    scale: 1.5,
  },
  {
    id: "floorplan",
    position: [0, 0.04, 0.3],
    rotation: [0.5, -0.15, 0.02],
    scale: 1.35,
  },
  {
    id: "materials",
    position: [0.5, -0.02, 0.05],
    rotation: [-0.1, -0.62, 0.05],
    scale: 1.4,
  },
  {
    id: "final",
    position: [-0.55, 0.0, 0.15],
    rotation: [0.03, 0.42, -0.01],
    scale: 1.5,
  },
];

/* ------------------------------- Ajustes mobile -------------------------------- */

/** Encolhe a escala no mobile: o "TR" é alto e a faixa central do 3D é baixa,
 *  então um fator < 1 evita que ele corte em cima/embaixo ao girar. */
export const MOBILE_SCALE_FACTOR = 0.62;

/** Suaviza o deslocamento horizontal no mobile (aproxima do centro). */
export const MOBILE_POSITION_FACTOR = 0.12;

/** Levanta o modelo dentro da faixa central da tela no mobile. */
export const MOBILE_Y_OFFSET = 0.2;
