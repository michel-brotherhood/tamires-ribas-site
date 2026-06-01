"use client";

/**
 * Scene.tsx
 * -----------------------------------------------------------------------------
 * O Canvas do React Three Fiber: câmera, luzes, ambiente e o modelo.
 *
 * Diferenças desktop x mobile:
 *   - DPR reduzido no mobile; antialias desligado.
 *   - Sem rim light no mobile.
 *   - Ambiente: Environment "apartment" (desktop) vs ProceduralEnvironment
 *     (mobile, mais leve).
 *   - powerPreference "low-power" no mobile.
 *
 * ⚠️  Sem shadows pesadas, sem postprocessing, sem bloom, sem SSAO.
 * -----------------------------------------------------------------------------
 */

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
} from "three";
import ArchitectureModel from "./ArchitectureModel";
import LogoTestModel from "./LogoTestModel";
import ProceduralEnvironment from "./ProceduralEnvironment";

const MOBILE_QUERY = "(max-width: 1024px)";

/* 🧪 TESTE: true = usa a logo da marca (plano texturizado) no lugar do GLB.
   Volte para false para restaurar o modelo arquitetônico (architecture.glb). */
const USE_LOGO_TEST = true;

/* ✅ SEGURO AJUSTAR: exposição do tonemapping (1.2 – 1.28 no spec). */
const TONE_MAPPING_EXPOSURE = 1.25;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function Scene() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: isMobile ? "low-power" : "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: TONE_MAPPING_EXPOSURE,
        outputColorSpace: SRGBColorSpace,
        alpha: true,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={32} />

      {/* Iluminação base. */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[-6, 4, 5]} intensity={1.5} />
      <directionalLight position={[5, 2, 4]} intensity={0.55} />

      {/* Rim light somente no desktop (recorte quente nas bordas). */}
      {!isMobile && (
        <directionalLight
          position={[3, 4, -6]}
          intensity={1.1}
          color="#fff5df"
        />
      )}

      <Suspense fallback={null}>
        {isMobile ? (
          <ProceduralEnvironment />
        ) : (
          <Environment preset="apartment" environmentIntensity={1.15} />
        )}

        {USE_LOGO_TEST ? (
          <LogoTestModel isMobile={isMobile} />
        ) : (
          <ArchitectureModel isMobile={isMobile} />
        )}
      </Suspense>
    </Canvas>
  );
}
