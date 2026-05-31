"use client";

/**
 * ProceduralEnvironment.tsx
 * -----------------------------------------------------------------------------
 * Ambiente de iluminação leve para mobile/tablet, gerado proceduralmente com
 * RoomEnvironment + PMREMGenerator. Evita baixar um HDR de Environment preset
 * (mais pesado) no mobile, mantendo reflexos suaves nos materiais.
 *
 * Aplica o resultado em scene.environment e libera os recursos no cleanup.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function ProceduralEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const envTexture = pmrem.fromScene(room, 0.04).texture;

    const previous = scene.environment;
    scene.environment = envTexture;

    return () => {
      scene.environment = previous;
      envTexture.dispose();
      pmrem.dispose();
      // RoomEnvironment é uma Scene de geometrias simples; dispose defensivo.
      room.traverse((obj) => {
        // @ts-expect-error — geometry/material existem em meshes
        obj.geometry?.dispose?.();
      });
    };
  }, [gl, scene]);

  return null;
}
