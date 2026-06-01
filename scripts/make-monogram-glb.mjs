/**
 * make-monogram-glb.mjs  —  PREVIEW (não-final)
 * -----------------------------------------------------------------------------
 * Gera o MONOGRAMA "TR" extrudado como escultura 3D em
 * public/models/architecture.glb. Abstrato, forte em identidade de marca
 * (menos "arquitetura" literal). É só para visualizar a ideia — não está
 * comitado/publicado. Para voltar à maquete: `node scripts/make-sample-glb.mjs`.
 *
 * Uso:  node scripts/make-monogram-glb.mjs
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
      blob.arrayBuffer().then((ab) => { this.result = ab; this.onloadend?.(); });
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

/* ----------------------------- material (marca) -------------------------- */
// Taupe da marca com leve metalness → escultura refinada (bronze/pedra polida).
const sculpt = new THREE.MeshStandardMaterial({
  color: 0x8a8276,
  roughness: 0.35,
  metalness: 0.25,
});

const DEPTH = 1.3;
const extrude = {
  depth: DEPTH,
  bevelEnabled: true,
  bevelThickness: 0.08,
  bevelSize: 0.08,
  bevelSegments: 3,
  curveSegments: 24,
};

/* -------------------------------- letra T -------------------------------- */
// Polígono simples: barra superior + haste central.
const T = new THREE.Shape();
const barTop = 3.0, barBot = 2.0, halfBar = 1.5, halfStem = 0.42, bottom = -3.0;
T.moveTo(-halfBar, barTop);
T.lineTo(halfBar, barTop);
T.lineTo(halfBar, barBot);
T.lineTo(halfStem, barBot);
T.lineTo(halfStem, bottom);
T.lineTo(-halfStem, bottom);
T.lineTo(-halfStem, barBot);
T.lineTo(-halfBar, barBot);
T.closePath();

/* -------------------------------- letra R -------------------------------- */
// Contorno externo (haste + bojo arredondado + perna diagonal).
const R = new THREE.Shape();
R.moveTo(-1.3, -3.0);
R.lineTo(-1.3, 3.0);          // sobe a haste (esquerda)
R.lineTo(0.2, 3.0);           // topo até o início do bojo
R.quadraticCurveTo(1.5, 3.0, 1.5, 1.65);   // bojo: externo direito
R.quadraticCurveTo(1.5, 0.35, 0.25, 0.35); // bojo: volta para perto da haste
R.lineTo(0.6, 0.35);          // arranque da perna
R.lineTo(1.6, -3.0);          // perna diagonal (externa)
R.lineTo(0.65, -3.0);         // base da perna
R.lineTo(-0.5, 0.15);         // perna interna sobe até a haste
R.lineTo(-0.5, -3.0);         // desce pela borda direita da haste
R.closePath();
// Contador (vazio) do bojo — o "buraco" que faz o R ser R.
const hole = new THREE.Path();
hole.moveTo(-0.5, 2.55);
hole.lineTo(0.3, 2.55);
hole.quadraticCurveTo(0.85, 2.55, 0.85, 1.75);
hole.quadraticCurveTo(0.85, 0.95, 0.3, 0.95);
hole.lineTo(-0.5, 0.95);
hole.closePath();
R.holes.push(hole);

/* ------------------------------ montagem --------------------------------- */
function letterMesh(shape, name) {
  const geo = new THREE.ExtrudeGeometry(shape, extrude);
  geo.center(); // centra cada letra na própria origem
  const m = new THREE.Mesh(geo, sculpt);
  m.name = name;
  return m;
}

const monogram = new THREE.Group();
monogram.name = "TR_monogram";

const tMesh = letterMesh(T, "letra_T");
const rMesh = letterMesh(R, "letra_R");

// "TR" lado a lado, levemente sobrepostos como no símbolo da marca.
tMesh.position.set(-1.55, 0, 0);
rMesh.position.set(1.35, 0, 0.0);

monogram.add(tMesh);
monogram.add(rMesh);

/* ------------------------------ exportar --------------------------------- */
mkdirSync(path.dirname(OUT), { recursive: true });
const exporter = new GLTFExporter();
exporter.parse(
  monogram,
  (result) => {
    const buffer = Buffer.from(result);
    writeFileSync(OUT, buffer);
    console.log(`OK (PREVIEW monograma): ${OUT} (${(buffer.length / 1024).toFixed(1)} kB)`);
    console.log("Para voltar à maquete: node scripts/make-sample-glb.mjs");
  },
  (err) => { console.error("Falha ao exportar GLB:", err); process.exit(1); },
  { binary: true },
);
