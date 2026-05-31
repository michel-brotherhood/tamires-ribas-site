"use client";

/**
 * AmbientModel.tsx
 * -----------------------------------------------------------------------------
 * Versão AMBIENTE do modelo arquitetônico, para as páginas internas.
 *
 * Diferente do ArchitectureModel da home: NÃO tem intro, NÃO trava o scroll e
 * NÃO usa GSAP/ScrollTrigger. É apenas uma "assinatura" 3D de fundo que gira
 * lentamente — reforça a identidade da marca sem competir com o conteúdo.
 *
 * Reaproveita a mesma lógica de materiais (vidro transparente / sólidos opacos)
 * e normalização (centralizar + escalar) da home, para coerência visual.
 * -----------------------------------------------------------------------------
 */

import { ReactNode, useMemo, useRef, Component } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  Box3,
  FrontSide,
  Group,
  Material,
  Mesh,
  Object3D,
  SRGBColorSpace,
  Vector3,
} from "three";

const MODEL_PATH = "/models/architecture.glb";
const GLASS_RE = /glass|vidro|window|janela|glazing|crystal|transparent/i;

/* Valores espelhados do estado "hero" da home (SCROLL_STATES[0]) para que a
   assinatura 3D das páginas internas tenha o MESMO enquadramento da home:
   mesma escala, mesma inclinação e o mesmo deslocamento lateral. */
const SPIN_SPEED = 0.12; // rad/s — ✅ seguro ajustar
const BASE_SCALE = 1.85; // = scale do hero
const TILT_X = 0.08; // = rotation.x do hero
const POS: [number, number, number] = [0.72, 0.02, 0.05]; // = position do hero

/* --- mesma correção de material da home --- */
function fixMaterial(material: Material, meshName: string): Material {
  const cloned = material.clone();
  const isGlass = GLASS_RE.test(`${material.name} ${meshName}`);
  if (isGlass) {
    cloned.transparent = true;
    cloned.depthWrite = false;
    cloned.depthTest = true;
    if (cloned.opacity >= 1) cloned.opacity = 0.35;
  } else {
    cloned.transparent = false;
    cloned.opacity = 1;
    cloned.depthWrite = true;
    cloned.depthTest = true;
    cloned.side = FrontSide;
  }
  const map = (cloned as unknown as { map?: { colorSpace: string } }).map;
  if (map) map.colorSpace = SRGBColorSpace;
  cloned.needsUpdate = true;
  return cloned;
}

function normalize(object: Object3D): void {
  const box = new Box3().setFromObject(object);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const s = 1 / maxDim;
  object.scale.setScalar(s);
  object.position.set(-center.x * s, -center.y * s, -center.z * s);
}

/* --- rig: gira devagar para sempre, sem scroll/intro --- */
function SpinRig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * SPIN_SPEED;
  });

  return (
    <group
      ref={group}
      position={POS}
      scale={BASE_SCALE}
      rotation={[TILT_X, 0, 0]}
    >
      {children}
    </group>
  );
}

/* --- GLB real --- */
function GLTFAmbient() {
  const { scene } = useGLTF(MODEL_PATH);
  const prepared = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => fixMaterial(m, mesh.name));
      } else if (mesh.material) {
        mesh.material = fixMaterial(mesh.material, mesh.name);
      }
    });
    normalize(clone);
    return clone;
  }, [scene]);

  return (
    <SpinRig>
      <primitive object={prepared} />
    </SpinRig>
  );
}

/* --- placeholder (mesma maquete da home, sem o rig de scroll) --- */
function PlaceholderAmbient() {
  return (
    <SpinRig>
      <group>
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[0.95, 0.06, 0.72]} />
          <meshStandardMaterial color="#d8d2c4" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[-0.05, -0.24, 0]}>
          <boxGeometry args={[0.7, 0.36, 0.55]} />
          <meshStandardMaterial color="#cfc8ba" roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[0.08, 0.1, -0.02]}>
          <boxGeometry args={[0.8, 0.32, 0.5]} />
          <meshStandardMaterial color="#ece7dc" roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[0.05, 0.28, 0]}>
          <boxGeometry args={[0.88, 0.04, 0.56]} />
          <meshStandardMaterial color="#bdb5a4" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[-0.42, -0.05, 0.28]}>
          <boxGeometry args={[0.05, 0.5, 0.05]} />
          <meshStandardMaterial color="#b89b5e" roughness={0.6} metalness={0.05} />
        </mesh>
        <mesh name="glass-facade" position={[0.12, 0.02, 0.28]}>
          <boxGeometry args={[0.42, 0.46, 0.02]} />
          <meshStandardMaterial
            color="#cfe0e6"
            transparent
            opacity={0.32}
            roughness={0.1}
            metalness={0}
            depthWrite={false}
          />
        </mesh>
      </group>
    </SpinRig>
  );
}

/* --- error boundary -> placeholder se o GLB faltar --- */
class AmbientBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function AmbientModel() {
  return (
    <AmbientBoundary fallback={<PlaceholderAmbient />}>
      <GLTFAmbient />
    </AmbientBoundary>
  );
}

useGLTF.preload(MODEL_PATH);
