/**
 * make-sample-glb.mjs
 * -----------------------------------------------------------------------------
 * Gera um GLB de exemplo (casa moderna) em public/models/architecture.glb,
 * usando o three já instalado no projeto. É só um modelo de demonstração para
 * ver a experiência com um modelo real — substitua pelo seu quando quiser.
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

/* ----------------------------- paleta sóbria ----------------------------- */
const concreteDark = new THREE.MeshStandardMaterial({ color: 0xcfc8ba, roughness: 0.85, metalness: 0 });
const concreteLight = new THREE.MeshStandardMaterial({ color: 0xece7dc, roughness: 0.8, metalness: 0 });
const concreteBase = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.9, metalness: 0 });
const slab = new THREE.MeshStandardMaterial({ color: 0xbdb5a4, roughness: 0.9, metalness: 0 });
const wood = new THREE.MeshStandardMaterial({ color: 0xb89b5e, roughness: 0.6, metalness: 0.05 });
const stone = new THREE.MeshStandardMaterial({ color: 0x9a9488, roughness: 0.8, metalness: 0 });

// Vidro: nome contém "glass" → a correção de material no app mantém transparente.
const glass = new THREE.MeshStandardMaterial({
  name: "glass",
  color: 0xcfe0e6,
  transparent: true,
  opacity: 0.32,
  roughness: 0.1,
  metalness: 0,
});

/* ------------------------------- helper ---------------------------------- */
function box(w, h, d, mat, x, y, z, name) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (name) m.name = name;
  return m;
}

/* ------------------------------ a casa ----------------------------------- */
// Proporções em "metros"; o app normaliza para ~1 unidade automaticamente.
const house = new THREE.Group();
house.name = "AUREA_casa_exemplo";

// Terreno / platô
house.add(box(9.5, 0.4, 7.2, concreteBase, 0, -2.2, 0, "terreno"));

// Pavimento térreo
house.add(box(7.0, 3.2, 5.5, concreteDark, -0.4, -0.4, 0, "pav_terreo"));

// Pavimento superior (recuado e deslocado, volume claro)
house.add(box(8.0, 3.0, 5.0, concreteLight, 0.6, 2.6, -0.2, "pav_superior"));

// Lajes de cobertura finas
house.add(box(8.8, 0.35, 5.6, slab, 0.4, 4.3, 0, "laje_cobertura"));
house.add(box(7.4, 0.3, 5.8, slab, -0.4, 1.25, 0, "laje_intermediaria"));

// Pilares em madeira (acento dourado)
for (const x of [-3.2, -1.0, 1.2, 3.4]) {
  house.add(box(0.35, 4.6, 0.35, wood, x, 0.0, 2.9, `pilar_${x}`));
}

// Muro/parede de pedra lateral
house.add(box(0.4, 4.0, 5.4, stone, -3.7, 0.2, 0, "parede_pedra"));

// Grandes panos de VIDRO (fachada e térreo)
house.add(box(5.6, 2.6, 0.08, glass, 0.4, 2.6, 2.55, "glass_fachada_superior"));
house.add(box(5.0, 2.4, 0.08, glass, -0.4, -0.4, 2.85, "glass_fachada_terreo"));
house.add(box(0.08, 2.6, 4.4, glass, 3.4, 2.6, 0, "glass_lateral"));

/* ------------------------------ exportar --------------------------------- */
mkdirSync(path.dirname(OUT), { recursive: true });

const exporter = new GLTFExporter();
exporter.parse(
  house,
  (result) => {
    // binary:true → result é ArrayBuffer
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
