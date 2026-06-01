/**
 * trace-tr.mjs — gera um SVG vetorial do símbolo TR a partir do raster.
 * -----------------------------------------------------------------------------
 * Uso: node scripts/trace-tr.mjs
 *
 * Pega public/marca/tr-branco.webp (TR branco em fundo transparente), usa o
 * canal alpha como silhueta, recorta na bounding box, traça com potrace e
 * salva public/marca/tr-traced.svg. Esse SVG é consumido por LogoTestModel
 * (SVGLoader + ExtrudeGeometry) para o teste de extrusão 3D.
 *
 * É um utilitário de build (offline): sharp/potrace não vão para o bundle.
 * -----------------------------------------------------------------------------
 */

import sharp from "sharp";
import potrace from "potrace";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../public/marca/tr-branco.webp");
const OUT = resolve(__dirname, "../public/marca/tr-traced.svg");

async function main() {
  // 1) Alpha como silhueta: opaco (logo) -> preto; transparente (fundo) -> branco.
  //    .trim() remove a moldura branca, deixando a bbox justa do TR.
  const mask = await sharp(SRC)
    .ensureAlpha()
    .extractChannel("alpha") // 0 no fundo, 255 no traço
    .negate() // traço -> 0 (preto), fundo -> 255 (branco)
    .toColourspace("b-w")
    .png()
    .toBuffer();

  const trimmed = await sharp(mask)
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });

  const { width, height } = trimmed.info;
  console.log(`Silhueta recortada: ${width}x${height}`);

  // 2) Traço vetorial. turdSize alto descarta ruído/pontos minúsculos.
  const traced = await new Promise((res, rej) => {
    potrace.trace(
      trimmed.data,
      {
        threshold: 128,
        turdSize: 60, // ignora manchas pequenas (px²)
        optTolerance: 0.4,
        turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
      },
      (err, svg) => (err ? rej(err) : res(svg)),
    );
  });

  // 3) Conta subcaminhos (M) só para diagnóstico.
  const dMatch = traced.match(/ d="([^"]+)"/);
  const subpaths = dMatch ? (dMatch[1].match(/M/gi) || []).length : 0;
  console.log(`Subcaminhos no traço: ${subpaths}`);

  writeFileSync(OUT, traced, "utf8");
  console.log(`SVG salvo em ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
