"use client";

/**
 * Panorama360.tsx
 * -----------------------------------------------------------------------------
 * Viewer 360° equiretangular usando React Three Fiber + Three.js puro
 * (sem OrbitControls nem libs extras).
 *
 * Técnica:
 *   - Esfera grande com escala X invertida ([-1, 1, 1]) → a textura
 *     equiretangular é vista corretamente POR DENTRO.
 *   - Câmera no centro (0,0,0) apenas OLHA ao redor (lon/lat) via arraste de
 *     mouse/touch (Pointer Events). Auto-rotação sutil quando parado.
 *
 * Robustez / UX:
 *   - Downscale automático: imagens maiores que o MAX_TEXTURE_SIZE da GPU
 *     (comum: 4096 no mobile) são reduzidas via canvas antes de virar textura,
 *     evitando falha de renderização em celulares com panoramas 8K.
 *   - Fade-in suave ao trocar de ambiente.
 *   - Placeholder procedural se a imagem faltar/falhar — nunca quebra.
 *
 * Independente da home: nada aqui toca o ArchitectureModel/ScrollTrigger.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import {
  BackSide,
  CanvasTexture,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  type PerspectiveCamera as PerspectiveCameraType,
  SRGBColorSpace,
  Texture,
} from "three";

const SPHERE_RADIUS = 500;
const DRAG_SPEED = 0.12;
const AUTO_ROTATE_AFTER = 3; // s parado antes de girar sozinho
const AUTO_ROTATE_SPEED = 1.6; // graus/segundo
const FADE_SPEED = 2.2; // velocidade do fade-in da textura

/* ----------------------------------------------------------------------------
   Placeholder procedural (quando não há imagem).
   ---------------------------------------------------------------------------- */
function buildPlaceholder(): Texture | null {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 1024;
  const ctx = c.getContext("2d");
  if (!ctx) return null;

  const g = ctx.createLinearGradient(0, 0, 0, 1024);
  g.addColorStop(0, "#ece7dc");
  g.addColorStop(0.5, "#d8d2c4");
  g.addColorStop(1, "#b4ad9c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 2048, 1024);

  ctx.strokeStyle = "rgba(17,17,17,0.10)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 24; i++) {
    const x = (i / 24) * 2048;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(17,17,17,0.4)";
  ctx.textAlign = "center";
  ctx.font = "600 46px -apple-system, system-ui, sans-serif";
  ctx.fillText("PANORAMA 360°", 1024, 512);

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/* ----------------------------------------------------------------------------
   Carrega imagem e devolve textura já adequada ao limite da GPU.
   ---------------------------------------------------------------------------- */
function loadEquirectTexture(src: string, maxSize: number): Promise<Texture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let source: HTMLImageElement | HTMLCanvasElement = img;

      if (img.width > maxSize || img.height > maxSize) {
        const scale = maxSize / Math.max(img.width, img.height);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, c.width, c.height);
          source = c;
        }
      }

      const tex = new Texture(source as HTMLImageElement);
      tex.colorSpace = SRGBColorSpace;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = src;
  });
}

/* ----------------------------------------------------------------------------
   Esfera + carga da textura (precisa estar dentro do Canvas p/ acessar a GPU).
   ---------------------------------------------------------------------------- */
function PanoramaSphere({
  src,
  onLoadingChange,
}: {
  src: string | null;
  onLoadingChange: (loading: boolean) => void;
}) {
  const { gl } = useThree();
  const meshRef = useRef<Mesh>(null);
  const placeholder = useMemo(buildPlaceholder, []);
  const [texture, setTexture] = useState<Texture | null>(placeholder);
  const fade = useRef(1);

  useEffect(() => {
    if (!src) {
      setTexture(placeholder);
      fade.current = 1;
      onLoadingChange(false);
      return;
    }

    let active = true;
    onLoadingChange(true);
    const maxSize = gl.capabilities.maxTextureSize || 4096;

    loadEquirectTexture(src, maxSize)
      .then((tex) => {
        if (!active) {
          tex.dispose();
          return;
        }
        fade.current = 0; // reinicia o fade-in
        setTexture((prev) => {
          if (prev && prev !== placeholder) prev.dispose();
          return tex;
        });
        onLoadingChange(false);
      })
      .catch(() => {
        if (active) {
          setTexture(placeholder);
          fade.current = 1;
          onLoadingChange(false);
        }
      });

    return () => {
      active = false;
    };
  }, [src, gl, placeholder, onLoadingChange]);

  // Fade-in suave da textura recém-carregada.
  useFrame((_, delta) => {
    const mat = meshRef.current?.material as MeshBasicMaterial | undefined;
    if (!mat) return;
    if (fade.current < 1) {
      fade.current = Math.min(1, fade.current + delta * FADE_SPEED);
      mat.opacity = fade.current;
      mat.needsUpdate = true;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[SPHERE_RADIUS, 64, 40]} />
      <meshBasicMaterial
        map={texture}
        side={BackSide}
        toneMapped={false}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

/* ----------------------------------------------------------------------------
   FOV adaptativo: a fov do Three é VERTICAL. Em telas retrato (celular), isso
   deixa o campo horizontal muito estreito (sensação de zoom). Aqui aumentamos
   a fov quando a tela é mais alta que larga, mantendo um enquadramento natural.
   ---------------------------------------------------------------------------- */
function AdaptiveFov() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    let fov = 72;
    if (aspect < 0.7)
      fov = 92; // retrato estreito (celular em pé)
    else if (aspect < 1)
      fov = 84; // quase quadrado / tablet retrato
    else if (aspect > 2) fov = 66; // ultrawide
    const cam = camera as PerspectiveCameraType;
    if (cam.fov !== fov) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  }, [camera, size]);

  return null;
}

/* ----------------------------------------------------------------------------
   Olhar ao redor por arraste + auto-rotação.
   ---------------------------------------------------------------------------- */
function LookControls() {
  const { camera, gl } = useThree();
  const lon = useRef(0);
  const lat = useRef(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const idle = useRef(0);

  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = "none";
    el.style.cursor = "grab";

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      idle.current = 0;
      last.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = "grabbing";
      el.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      lon.current -= dx * DRAG_SPEED;
      lat.current += dy * DRAG_SPEED;
      lat.current = Math.max(-85, Math.min(85, lat.current));
      idle.current = 0;
    };
    const onUp = (e: PointerEvent) => {
      dragging.current = false;
      el.style.cursor = "grab";
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!dragging.current) {
      idle.current += delta;
      if (idle.current > AUTO_ROTATE_AFTER) {
        lon.current += delta * AUTO_ROTATE_SPEED;
      }
    }
    const phi = MathUtils.degToRad(90 - lat.current);
    const theta = MathUtils.degToRad(lon.current);
    camera.lookAt(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    );
  });

  return null;
}

/* ----------------------------------------------------------------------------
   Export.
   ---------------------------------------------------------------------------- */
export default function Panorama360({ src }: { src: string | null }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Canvas dpr={[1, 2]} gl={{ antialias: true }} className="panorama-canvas">
        <PerspectiveCamera
          makeDefault
          fov={72}
          position={[0, 0, 0]}
          near={0.1}
          far={1100}
        />
        <AdaptiveFov />
        <LookControls />
        <PanoramaSphere src={src} onLoadingChange={setLoading} />
      </Canvas>

      {loading && (
        <div className="panorama-loading" aria-live="polite">
          Carregando panorama…
        </div>
      )}
    </>
  );
}
