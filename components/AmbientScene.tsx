"use client";

/**
 * AmbientScene.tsx
 * -----------------------------------------------------------------------------
 * Canvas R3F para as páginas internas: mesma linguagem visual da home (câmera,
 * luzes, ambiente apartment/procedural), mas com o AmbientModel girando devagar
 * como assinatura de fundo — sem intro, sem scroll-lock, sem ScrollTrigger.
 * -----------------------------------------------------------------------------
 */

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import AmbientModel from "./AmbientModel";
import ProceduralEnvironment from "./ProceduralEnvironment";

const MOBILE_QUERY = "(max-width: 1024px)";
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

export default function AmbientScene() {
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

      <ambientLight intensity={0.25} />
      <directionalLight position={[-6, 4, 5]} intensity={1.5} />
      <directionalLight position={[5, 2, 4]} intensity={0.55} />
      {!isMobile && (
        <directionalLight position={[3, 4, -6]} intensity={1.1} color="#fff5df" />
      )}

      <Suspense fallback={null}>
        {isMobile ? (
          <ProceduralEnvironment />
        ) : (
          <Environment preset="apartment" environmentIntensity={1.15} />
        )}
        <AmbientModel />
      </Suspense>
    </Canvas>
  );
}
