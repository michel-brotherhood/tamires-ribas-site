/**
 * make-sample-glb.mjs
 * -----------------------------------------------------------------------------
 * Gera o modelo 3D de fundo em public/models/architecture.glb usando o three já
 * instalado. Conceito: MAQUETE ARQUITETÔNICA BRANCA SOBRE BASE — estilo
 * editorial/conceitual, fiel a "Muito Além de um Projeto" (o projeto vira
 * protagonista, como um objeto de estúdio sobre um plinto).
 *
 * Estética "clay/study model": tudo branco fosco (espuma/impressão 3D), aberturas
 * como vazios recessados (sem vidro), pousado sobre uma base taupe que faz o
 * contraste de "objeto sobre pedestal". Para algo fotorrealista, basta substituir
 * este .glb por um feito por artista 3D (mesmo caminho/nome).
 *
 * Uso:  node scripts/make-sample-glb.mjs
 * -----------------------------------------------------------------------------
 */

import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as THREE from "three";

// --- Polyfill mínimo: GLTFExporter (modo binário) usa FileReader do browser. ---
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((ab) => {
        this.result = ab;
        this.onloadend?.();
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((ab) => {
        const type = blob.type || "application/octet-stream";
        this.result = `data:${type};base64,${Buffer.from(ab).toString("base64")}`;
        this.onloadend?.();
      });
    }
  };
}

const { GLTFExporter } = await import(
  "three/examples/jsm/exporters/GLTFExporter.js"
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "models", "architecture.glb");

/* ----------------------- paleta de maquete (branca) ----------------------- */
// Maquete: branco fosco dominante. Base: taupe claro (contraste de pedestal).
const white = new THREE.MeshStandardMaterial({ color: 0xf2efe9, roughness: 0.9, metalness: 0 });   // massas
const whiteSoft = new THREE.MeshStandardMaterial({ color: 0xeae6dd, roughness: 0.92, metalness: 0 }); // lajes/terreno
const recess = new THREE.MeshStandardMaterial({ color: 0xddd7cb, roughness: 1, metalness: 0 });     // vazios/aberturas
const baseMat = new THREE.MeshStandardMaterial({ color: 0x9c9486, roughness: 0.95, metalness: 0 }); // plinto taupe-claro
const tree = new THREE.MeshStandardMaterial({ color: 0xf2efe9, roughness: 0.9, metalness: 0 });     // arvoretas brancas

/* ------------------------------- helpers --------------------------------- */
function box(w, h, d, mat, x, y, z, name) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (name) m.name = name;
  return m;
}
function cyl(rt, rb, h, mat, x, y, z, name) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 14), mat);
  m.position.set(x, y, z);
  if (name) m.name = name;
  return m;
}

/* ------------------------------ a maquete -------------------------------- */
// Proporções em "metros"; o app normaliza para ~1 unidade automaticamente.
const maquete = new THREE.Group();
maquete.name = "TR_maquete";

/* --- PLINTO / base (pedestal editorial) --- */
maquete.add(box(11.0, 1.1, 8.0, baseMat, 0, -3.05, 0, "plinto"));
// borda fina no topo do plinto (lábio sutil)
maquete.add(box(11.2, 0.12, 8.2, whiteSoft, 0, -2.46, 0, "plinto_topo"));

/* --- terreno/base do projeto (branco, sobre o plinto) --- */
maquete.add(box(9.2, 0.3, 6.4, whiteSoft, 0, -2.28, 0, "terreno"));

/* --- volume térreo: massa horizontal branca --- */
maquete.add(box(7.4, 2.4, 4.6, white, -0.5, -0.95, 0, "terreo"));

/* --- laje fina entre pavimentos (marca horizontal) --- */
maquete.add(box(9.0, 0.22, 5.4, whiteSoft, -0.1, 0.35, 0.1, "laje_intermediaria"));

/* --- volume superior: caixa recuada e deslocada --- */
maquete.add(box(5.6, 2.2, 3.8, white, 0.9, 1.6, -0.3, "volume_superior"));

/* --- laje de cobertura fina em leve balanço --- */
maquete.add(box(9.6, 0.26, 5.8, whiteSoft, 0.2, 2.85, 0.1, "laje_cobertura"));

/* --- detalhes de massa (escada externa + lâmina de parede) --- */
// escada (degraus escalonados)
for (let i = 0; i < 5; i++) {
  maquete.add(box(1.6, 0.2, 0.5, white, -4.3, -2.0 + i * 0.2, 2.2 - i * 0.45, `degrau_${i}`));
}
// lâmina de parede vertical (ancora a composição)
maquete.add(box(0.3, 3.6, 2.2, white, 3.5, -0.4, -1.0, "lamina_parede"));

/* --- aberturas como VAZIOS recessados (planos recuados, branco mais escuro) --- */
maquete.add(box(5.4, 1.7, 0.05, recess, -0.5, -0.95, 2.32, "vazio_terreo"));   // estar térreo
maquete.add(box(3.8, 1.5, 0.05, recess, 0.9, 1.6, 1.62, "vazio_superior"));     // janela superior
maquete.add(box(0.05, 1.6, 2.6, recess, 3.18, -0.95, 0, "vazio_lateral"));      // rasgo lateral

/* --- arvoretas de maquete (charme editorial, discretas) --- */
maquete.add(cyl(0.05, 0.07, 0.5, white, -3.6, -2.0, -2.0, "tronco_1"));
maquete.add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), tree).translateX(-3.6).translateY(-1.5).translateZ(-2.0));
maquete.add(cyl(0.05, 0.07, 0.4, white, 3.9, -2.0, 2.4, "tronco_2"));
maquete.add(new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), tree).translateX(3.9).translateY(-1.55).translateZ(2.4));

/* ------------------------------ exportar --------------------------------- */
mkdirSync(path.dirname(OUT), { recursive: true });

const exporter = new GLTFExporter();
exporter.parse(
  maquete,
  (result) => {
    const buffer = Buffer.from(result);
    writeFileSync(OUT, buffer);
    console.log(`OK: ${OUT} (${(buffer.length / 1024).toFixed(1)} kB)`);
  },
  (err) => {
    console.error("Falha ao exportar GLB:", err);
    process.exit(1);
  },
  { binary: true },
);
