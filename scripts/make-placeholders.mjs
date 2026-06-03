/**
 * make-placeholders.mjs
 * -----------------------------------------------------------------------------
 * Gera imagens-placeholder ELEGANTES e on-brand para os projetos e depoimentos,
 * nos caminhos referenciados em lib/content.ts. Assim o site não exibe 404
 * enquanto as fotos reais não chegam. Basta sobrescrever os arquivos depois.
 *
 *   node scripts/make-placeholders.mjs
 *
 * Cores da marca: taupe #827b6f · bege #cabfab · concreto #b8ad99 · creme #f4f1ea
 * -----------------------------------------------------------------------------
 */
import sharp from "sharp";
import { mkdirSync, readFileSync, existsSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const projetosDir = path.join(ROOT, "public", "projetos");
const depoDir = path.join(ROOT, "public", "depoimentos");
mkdirSync(projetosDir, { recursive: true });
mkdirSync(depoDir, { recursive: true });

// Monograma TR (taupe) embutido como marca d'água, se existir.
const markPath = path.join(ROOT, "public", "marca", "tr-taupe.webp");
const markB64 = existsSync(markPath)
  ? `data:image/webp;base64,${readFileSync(markPath).toString("base64")}`
  : null;

function svg(w, h, { from, to, label }) {
  const markW = Math.round(Math.min(w, h) * 0.32);
  const markH = markW;
  const mark = markB64
    ? `<image href="${markB64}" x="${(w - markW) / 2}" y="${(h - markH) / 2}" width="${markW}" height="${markH}" opacity="0.16"/>`
    : "";
  const text = label
    ? `<text x="50%" y="${h - Math.round(h * 0.08)}" text-anchor="middle"
         font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(h * 0.05)}"
         fill="#5f584e" opacity="0.5" letter-spacing="2">${label}</text>`
    : "";
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${from}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
        <radialGradient id="v" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.55" stop-color="#000000" stop-opacity="0"/>
          <stop offset="1" stop-color="#5b554b" stop-opacity="0.16"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
      ${mark}
      <rect width="${w}" height="${h}" fill="url(#v)"/>
      ${text}
    </svg>`,
  );
}

async function make(file, w, h, opts) {
  await sharp(svg(w, h, opts)).webp({ quality: 82 }).toFile(file);
  console.log("✓", path.relative(ROOT, file));
}

const W = 1600, H = 1066; // projetos (3:2)
const projects = [
  ["casa-aurora-cover", "Casa Aurora"],
  ["casa-aurora-01", ""],
  ["casa-aurora-02", ""],
  ["casa-aurora-03", ""],
  ["residencia-mata-cover", "Residência Mata"],
  ["residencia-mata-01", ""],
  ["residencia-mata-02", ""],
  ["pavilhao-corporativo-cover", "Pavilhão Corporativo"],
  ["pavilhao-corporativo-01", ""],
];

const avatars = ["marina-rafael", "helena", "diretoria"];

const run = async () => {
  for (const [name, label] of projects) {
    await make(path.join(projetosDir, `${name}.webp`), W, H, {
      from: "#b8ad99",
      to: "#cabfab",
      label,
    });
  }
  for (const name of avatars) {
    await make(path.join(depoDir, `${name}.webp`), 400, 400, {
      from: "#cabfab",
      to: "#9c9384",
    });
  }
  console.log("\nPlaceholders gerados. Sobrescreva com as fotos reais quando tiver.");
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
