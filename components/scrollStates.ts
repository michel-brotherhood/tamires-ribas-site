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

export const SCROLL_STATES: ScrollState[] = [
  {
    id: "hero",
    position: [0.72, 0.02, 0.05],
    rotation: [0.08, Math.PI - 0.7, 0.02],
    scale: 1.85,
  },
  {
    id: "concept",
    position: [-0.55, 0.02, 0.42],
    rotation: [0.04, Math.PI - 0.25, 0.01],
    scale: 2.05,
  },
  {
    id: "facade",
    position: [-0.15, -0.04, 0.2],
    rotation: [0.02, Math.PI, 0],
    scale: 1.9,
  },
  {
    id: "floorplan",
    position: [0, 0.05, 0.35],
    rotation: [Math.PI / 2 - 0.18, 0, Math.PI / 2],
    scale: 1.75,
  },
  {
    id: "materials",
    position: [0.58, -0.03, 0.05],
    rotation: [-0.08, -1.35, 0.12],
    scale: 1.7,
  },
  {
    id: "final",
    position: [-0.85, -0.02, 0.18],
    rotation: [0.03, Math.PI - 0.42, -0.01],
    scale: 1.9,
  },
];

/* ------------------------------- Ajustes mobile -------------------------------- */

/** Multiplica a escala de cada estado no mobile (modelo um pouco maior). */
export const MOBILE_SCALE_FACTOR = 1.08;

/** Suaviza o deslocamento horizontal no mobile (aproxima do centro). */
export const MOBILE_POSITION_FACTOR = 0.12;

/** Levanta o modelo dentro da faixa central da tela no mobile. */
export const MOBILE_Y_OFFSET = 0.25;
