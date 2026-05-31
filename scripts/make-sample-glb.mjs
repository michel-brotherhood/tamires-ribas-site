/**
 * make-sample-glb.mjs
 * -----------------------------------------------------------------------------
 * Gera o modelo 3D de fundo em public/models/architecture.glb usando o three já
 * instalado. Conceito: VILLA CONTEMPORÂNEA ACONCHEGANTE — alinhada à marca TR
 * Arquitetura e Interiores ("a sua casa", aconchegante, atemporal, alto padrão).
 *
 * Características: massa horizontal e baixa, MADEIRA QUENTE dominante (ripado/
 * brises), grandes panos de vidro, laje fina em balanço (cantilever) e base com
 * deck + faixa de jardim. Estilizado em geometrias — para algo fotorrealista,
 * basta substituir este .glb por um feito por artista 3D (mesmo caminho/nome).
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

/* ---------------------- paleta TR (quente e sóbria) ---------------------- */
const woodWarm = new THREE.MeshStandardMaterial({ color: 0xb8854e, roughness: 0.55, metalness: 0.05 }); // madeira dominante
const woodDark = new THREE.MeshStandardMaterial({ color: 0x8a5f34, roughness: 0.6, metalness: 0.05 });  // ripado/brise
const taupe = new THREE.MeshStandardMaterial({ color: 0x827b6f, roughness: 0.85, metalness: 0 });       // taupe da marca
const cream = new THREE.MeshStandardMaterial({ color: 0xece7dc, roughness: 0.8, metalness: 0 });        // volume claro
const stone = new THREE.MeshStandardMaterial({ color: 0xb8ad99, roughness: 0.9, metalness: 0 });        // base/pedra
const slab = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.85, metalness: 0 });        // laje fina
const garden = new THREE.MeshStandardMaterial({ color: 0x8f9c7f, roughness: 1, metalness: 0 });         // faixa de jardim
const water = new THREE.MeshStandardMaterial({ color: 0x9fb4b8, roughness: 0.25, metalness: 0.1 });     // espelho d'água

// Vidro: nome contém "glass" → a correção de material no app mantém transparente.
const glass = new THREE.MeshStandardMaterial({
  name: "glass",
  color: 0xd7e3e2,
  transparent: true,
  opacity: 0.3,
  roughness: 0.08,
  metalness: 0,
});

/* ------------------------------- helpers --------------------------------- */
function box(w, h, d, mat, x, y, z, name) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (name) m.name = name;
  return m;
}

/* ------------------------------- a villa --------------------------------- */
// Proporções em "metros"; o app normaliza para ~1 unidade automaticamente.
// Villa horizontal: térreo amplo em vidro/madeira + volume superior recuado
// revestido em madeira, com laje fina em balanço sobre o deck.
const villa = new THREE.Group();
villa.name = "TR_villa";

/* --- terreno: deck de madeira + faixa de jardim + espelho d'água --- */
villa.add(box(13.0, 0.3, 8.0, stone, 0, -2.35, 0, "terreno"));
villa.add(box(7.5, 0.12, 4.6, woodWarm, -0.5, -2.16, 1.6, "deck"));
villa.add(box(12.4, 0.06, 1.4, garden, 0, -2.14, -2.9, "jardim"));
villa.add(box(4.2, 0.05, 1.6, water, 4.0, -2.16, 1.8, "espelho_dagua"));

/* --- térreo: volume baixo, recuado, leve (estar social) --- */
villa.add(box(8.4, 2.7, 4.8, cream, -0.4, -0.75, 0, "terreo"));
// laje de piso do térreo (fina, em leve balanço sobre o deck)
villa.add(box(9.6, 0.22, 5.6, slab, 0, -2.0, 0.2, "laje_piso"));

/* --- volume superior: caixa de MADEIRA recuada e deslocada --- */
villa.add(box(6.6, 2.5, 4.2, woodWarm, 0.9, 1.5, -0.3, "volume_madeira"));

/* --- laje de cobertura fina em BALANÇO (cantilever) --- */
villa.add(box(11.2, 0.3, 6.4, slab, 0.3, 2.95, 0.1, "laje_cobertura_balanco"));
// pingo/sombra: segunda laje fina sobre o térreo (marca horizontal)
villa.add(box(10.2, 0.18, 5.8, slab, -0.1, 0.65, 0.15, "laje_intermediaria"));

/* --- brises/ripado de madeira (textura quente repetida na fachada sup.) --- */
for (let i = 0; i < 9; i++) {
  const x = -1.9 + i * 0.62;
  villa.add(box(0.12, 2.3, 0.12, woodDark, x + 0.9, 1.5, 1.95, `brise_${i}`));
}

/* --- pilar/lâmina de pedra (ancora o conjunto, contraponto) --- */
villa.add(box(0.45, 5.4, 0.9, stone, -4.4, 0.1, -0.6, "lamina_pedra"));

/* --- grandes panos de VIDRO (estar térreo + volume superior + lateral) --- */
villa.add(box(7.6, 2.4, 0.06, glass, -0.4, -0.78, 2.45, "glass_estar"));
villa.add(box(6.0, 2.1, 0.06, glass, 0.9, 1.5, 1.85, "glass_superior"));
villa.add(box(0.06, 2.3, 4.2, glass, 3.6, -0.78, 0, "glass_lateral"));

/* ------------------------------ exportar --------------------------------- */
mkdirSync(path.dirname(OUT), { recursive: true });

const exporter = new GLTFExporter();
exporter.parse(
  villa,
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
