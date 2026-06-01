"use client";

/**
 * ArchitectureModel.tsx — ARQUIVO PRINCIPAL DA EXPERIÊNCIA
 * -----------------------------------------------------------------------------
 * Responsável por:
 *   1. Carregar /models/architecture.glb (com fallback para placeholder).
 *   2. Clonar a cena, centralizar e escalar para caber em ~1 unidade.
 *   3. Corrigir materiais (opacos sólidos, transparência só em vidro).
 *   4. Sinalizar que o modelo está pronto (markModelReady).
 *   5. Tocar a intro cinematográfica quando a LoadingScreen liberar (onIntroStart).
 *   6. Revelar o texto do hero no meio da intro.
 *   7. Liberar o scroll e criar UMA timeline / UM ScrollTrigger que conduz o
 *      modelo entre os 6 estados de SCROLL_STATES.
 *
 * ⚠️  NÃO MEXER sem cuidado: a ordem ready → intro → unlock → scroll timeline,
 *     e a regra de "um único ScrollTrigger". Quebrar isso quebra a experiência.
 * ✅ SEGURO AJUSTAR: durações/eases da intro (constantes no topo) e os valores
 *     em scrollStates.ts.
 * -----------------------------------------------------------------------------
 */

import {
  Component,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MOBILE_POSITION_FACTOR,
  MOBILE_SCALE_FACTOR,
  MOBILE_Y_OFFSET,
  SCROLL_STATES,
  ScrollState,
} from "./scrollStates";
import { markModelReady, onIntroStart, unlockScroll } from "@/lib/sceneReady";

const MODEL_PATH = "/models/architecture.glb";

/* --------- constantes de intro (✅ seguras para ajustar) --------- */
const INTRO_DURATION = 2.0; // intro mais curta → scroll libera mais cedo
const INTRO_Y_OFFSET = 0.7; // rotação extra inicial (suave, monograma legível)
const HERO_REVEAL_AT = 0.7; // segundo em que o texto do hero aparece
const HERO_REVEAL_DURATION = 0.8;

/* "Assinatura" quando o usuário passa do <main> para o portfólio — o modelo
   continua vivo. Para o monograma "TR", oscila suavemente (sem girar 360°, que
   deixaria as letras de perfil). */
const FREE_SWAY_AMPLITUDE = 0.42; // rad para cada lado
const FREE_SWAY_SPEED = 0.5;

/* materiais cujo nome indica vidro mantêm transparência */
const GLASS_RE = /glass|vidro|window|janela|glazing|crystal|transparent/i;

gsap.registerPlugin(ScrollTrigger);

/* ============================================================================
   Helpers de material e de estados
   ============================================================================ */

function fixMaterial(material: Material, meshName: string): Material {
  const cloned = material.clone();
  const isGlass = GLASS_RE.test(`${material.name} ${meshName}`);

  if (isGlass) {
    // Vidro: preserva (ou garante) transparência.
    cloned.transparent = true;
    cloned.depthWrite = false;
    cloned.depthTest = true;
    if (cloned.opacity >= 1) cloned.opacity = 0.35;
  } else {
    // Tudo o mais é sólido: força opacidade total.
    cloned.transparent = false;
    cloned.opacity = 1;
    cloned.depthWrite = true;
    cloned.depthTest = true;
    cloned.side = FrontSide;
  }

  // Preserva textura quando existir, no espaço de cor correto.
  const map = (cloned as unknown as { map?: { colorSpace: string } }).map;
  if (map) map.colorSpace = SRGBColorSpace;

  cloned.needsUpdate = true;
  return cloned;
}

/** Centraliza na origem e escala o objeto para caber em ~1 unidade. */
function normalize(object: Object3D): void {
  const box = new Box3().setFromObject(object);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scaleFactor = 1 / maxDim;

  object.scale.setScalar(scaleFactor);
  object.position.set(
    -center.x * scaleFactor,
    -center.y * scaleFactor,
    -center.z * scaleFactor,
  );
}

/** Aplica os ajustes de mobile a um estado de scroll. */
function adaptState(state: ScrollState, isMobile: boolean): ScrollState {
  if (!isMobile) return state;
  return {
    ...state,
    position: [
      state.position[0] * MOBILE_POSITION_FACTOR,
      state.position[1] + MOBILE_Y_OFFSET,
      state.position[2] * MOBILE_POSITION_FACTOR,
    ],
    scale: state.scale * MOBILE_SCALE_FACTOR,
  };
}

/* ============================================================================
   ModelRig — coreografia compartilhada (intro + scroll)
   Recebe o conteúdo visual já normalizado como children.
   ============================================================================ */

function ModelRig({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);
  const introTl = useRef<gsap.core.Timeline | null>(null);
  const scrollTl = useRef<gsap.core.Timeline | null>(null);
  const introDone = useRef(false);
  // Quando true, o modelo oscila sozinho (área do portfólio em diante).
  const freeSpin = useRef(false);
  const swayT = useRef(0);
  const swayBaseY = useRef(0); // rotation.y de referência ao entrar no portfólio

  // Oscilação suave só enquanto freeSpin está ativo (ligado pelo ScrollTrigger
  // ao sair do <main>). Não conflita com a timeline: quando esta controla o
  // modelo, freeSpin está desligado.
  useFrame((_, delta) => {
    if (freeSpin.current && group.current) {
      swayT.current += delta * FREE_SWAY_SPEED;
      group.current.rotation.y =
        swayBaseY.current + Math.sin(swayT.current) * FREE_SWAY_AMPLITUDE;
    }
  });

  // Posição inicial + intro + sinal de "pronto".
  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;

    const hero = adaptState(SCROLL_STATES[0], isMobile);

    // Estado de partida: hero, porém com rotação Y deslocada para a intro girar.
    g.position.set(...hero.position);
    g.rotation.set(hero.rotation[0], hero.rotation[1] + INTRO_Y_OFFSET, hero.rotation[2]);
    g.scale.setScalar(hero.scale);

    // Esconde o texto do hero antes da intro (a LoadingScreen cobre a tela).
    gsap.set("[data-hero-reveal]", { opacity: 0, y: 22 });

    // Timeline da intro — criada pausada; só roda no evento introStart.
    const tl = gsap.timeline({ paused: true });
    tl.to(g.rotation, {
      y: hero.rotation[1],
      duration: INTRO_DURATION,
      ease: "sine.inOut",
    });
    tl.to(
      "[data-hero-reveal]",
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: HERO_REVEAL_DURATION,
        ease: "power2.out",
      },
      HERO_REVEAL_AT,
    );
    // Ao terminar a intro: libera o scroll e cria a timeline de scroll.
    // (Unlock só no fim evita que intro e scroll disputem a rotação do modelo.)
    tl.eventCallback("onComplete", () => {
      introDone.current = true;
      unlockScroll();
      buildScroll();
      // Marca a experiência como pronta: libera a interação do CTA do hero
      // (que fica inerte durante o loading/intro, evitando cliques sem efeito).
      document.documentElement.classList.add("aurea-ready");
    });
    introTl.current = tl;

    // Modelo preparado e na posição → avisa a LoadingScreen.
    markModelReady();

    const unsubscribe = onIntroStart(() => tl.play(0));

    return () => {
      unsubscribe();
      tl.kill();
    };
    // Intencional: roda uma vez. Mudança de isMobile é tratada na rebuild abaixo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // (Re)constrói a timeline de scroll — UMA timeline, UM ScrollTrigger.
  function buildScroll() {
    const g = group.current;
    if (!g) return;

    scrollTl.current?.scrollTrigger?.kill();
    scrollTl.current?.kill();

    const states = SCROLL_STATES.map((s) => adaptState(s, isMobile));

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "none" },
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        invalidateOnRefresh: true,
        // Ao passar do fim do <main> (entra no portfólio): liga a rotação livre.
        // Ao voltar para dentro do <main>: desliga (a timeline reassume).
        onLeave: () => {
          // Começa a oscilar a partir do ângulo atual (transição suave).
          swayBaseY.current = group.current?.rotation.y ?? 0;
          swayT.current = 0;
          freeSpin.current = true;
        },
        onEnterBack: () => {
          freeSpin.current = false;
        },
      },
    });

    // Interpola sequencialmente entre os estados (hero → ... → final).
    for (let i = 1; i < states.length; i++) {
      const s = states[i];
      const at = i - 1; // posição na timeline (segmentos de duração 1)
      tl.to(g.position, { x: s.position[0], y: s.position[1], z: s.position[2] }, at);
      tl.to(g.rotation, { x: s.rotation[0], y: s.rotation[1], z: s.rotation[2] }, at);
      tl.to(g.scale, { x: s.scale, y: s.scale, z: s.scale }, at);
    }

    scrollTl.current = tl;
    ScrollTrigger.refresh();
  }

  // Reconstroi o scroll ao alternar desktop/mobile (após a intro).
  useEffect(() => {
    if (introDone.current) buildScroll();
    return () => {
      scrollTl.current?.scrollTrigger?.kill();
      scrollTl.current?.kill();
      scrollTl.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return <group ref={group}>{children}</group>;
}

/* ============================================================================
   GLTFModel — carrega o GLB real, normaliza e corrige materiais
   ============================================================================ */

function GLTFModel({ isMobile }: { isMobile: boolean }) {
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
    <ModelRig isMobile={isMobile}>
      <primitive object={prepared} />
    </ModelRig>
  );
}

/* ============================================================================
   PlaceholderModel — usado quando architecture.glb ainda NÃO existe.
   👉 SUBSTITUA pelo seu GLB real colocando o arquivo em
      public/models/architecture.glb (este placeholder some automaticamente).
   ============================================================================ */

function PlaceholderModel({ isMobile }: { isMobile: boolean }) {
  return (
    <ModelRig isMobile={isMobile}>
      {/* Maquete simples de uma casa moderna, já centrada em ~1 unidade. */}
      <group>
        {/* Base / terreno (concreto) */}
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[0.95, 0.06, 0.72]} />
          <meshStandardMaterial color="#d8d2c4" roughness={0.9} metalness={0} />
        </mesh>

        {/* Pavimento térreo (concreto aparente) */}
        <mesh position={[-0.05, -0.24, 0]}>
          <boxGeometry args={[0.7, 0.36, 0.55]} />
          <meshStandardMaterial color="#cfc8ba" roughness={0.85} metalness={0} />
        </mesh>

        {/* Pavimento superior (volume claro) */}
        <mesh position={[0.08, 0.1, -0.02]}>
          <boxGeometry args={[0.8, 0.32, 0.5]} />
          <meshStandardMaterial color="#ece7dc" roughness={0.8} metalness={0} />
        </mesh>

        {/* Laje de cobertura */}
        <mesh position={[0.05, 0.28, 0]}>
          <boxGeometry args={[0.88, 0.04, 0.56]} />
          <meshStandardMaterial color="#bdb5a4" roughness={0.9} metalness={0} />
        </mesh>

        {/* Pilar / detalhe em madeira (acento) */}
        <mesh position={[-0.42, -0.05, 0.28]}>
          <boxGeometry args={[0.05, 0.5, 0.05]} />
          <meshStandardMaterial color="#b89b5e" roughness={0.6} metalness={0.05} />
        </mesh>

        {/* Fachada de VIDRO — material transparente (valida a regra de vidro) */}
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
    </ModelRig>
  );
}

/* ============================================================================
   ErrorBoundary — se o GLB falhar (ex.: arquivo ausente), cai no placeholder.
   ============================================================================ */

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ============================================================================
   Export principal
   ============================================================================ */

export default function ArchitectureModel({ isMobile }: { isMobile: boolean }) {
  return (
    <ModelErrorBoundary fallback={<PlaceholderModel isMobile={isMobile} />}>
      <GLTFModel isMobile={isMobile} />
    </ModelErrorBoundary>
  );
}

// Obs.: o próprio useGLTF dentro de GLTFModel já dispara o carregamento do GLB.
// Não usamos useGLTF.preload aqui para não gerar um fetch 404 extra enquanto o
// site roda apenas com o placeholder (sem architecture.glb).
