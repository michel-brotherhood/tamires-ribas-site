"use client";

/**
 * LogoTestModel.tsx — TESTE (provisório)
 * -----------------------------------------------------------------------------
 * Extruda o símbolo TR (vetor traçado em public/marca/tr-traced.svg) num sólido
 * 3D com volume real, dentro da mesma coreografia (ModelRig) do modelo principal.
 *
 * O SVG é gerado offline por scripts/trace-tr.mjs (potrace) a partir do raster
 * tr-branco.webp — por isso tem profundidade de verdade e não "some" de perfil
 * como o plano texturizado.
 *
 * Liga/desliga via a flag USE_LOGO_TEST em Scene.tsx.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Box3, ExtrudeGeometry, Vector3 } from "three";
import { ModelRig } from "./ArchitectureModel";

const SVG_PATH = "/marca/tr-traced.svg";

/* Profundidade da extrusão em unidades do SVG (bbox ~637×519). Normalizada
   depois para a maior dimensão = 1, vira uma fatia proporcional. */
const EXTRUDE_DEPTH = 70;

export default function LogoTestModel({ isMobile }: { isMobile: boolean }) {
  const data = useLoader(SVGLoader, SVG_PATH);

  const geometry = useMemo(() => {
    const geos: ExtrudeGeometry[] = [];
    for (const path of data.paths) {
      const shapes = SVGLoader.createShapes(path);
      for (const shape of shapes) {
        geos.push(
          new ExtrudeGeometry(shape, {
            depth: EXTRUDE_DEPTH,
            bevelEnabled: false,
            curveSegments: 24,
          }),
        );
      }
    }

    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());

    // SVG tem Y para baixo: rotaciona 180° em X (preserva o winding/normais)
    // para deixar o TR em pé, e a profundidade apontando para +Z.
    merged.rotateX(Math.PI);

    // Centraliza na origem e normaliza para a maior dimensão = 1 (mesma
    // convenção do GLB), para as escalas de scrollStates valerem igual.
    merged.computeBoundingBox();
    const box = merged.boundingBox as Box3;
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    merged.translate(-center.x, -center.y, -center.z);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    merged.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);
    merged.computeVertexNormals();

    return merged;
  }, [data]);

  return (
    <ModelRig isMobile={isMobile}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#ece7dc" roughness={0.42} metalness={0.12} />
      </mesh>
    </ModelRig>
  );
}
