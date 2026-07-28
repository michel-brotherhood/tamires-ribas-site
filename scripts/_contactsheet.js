const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const TH_W = 220;
const TH_H = 150;
const COLS = 7;
const PAD = 4;
const LABEL_H = 18;

async function buildSheet(folder, files, outPath) {
  const cellW = TH_W + PAD * 2;
  const cellH = TH_H + LABEL_H + PAD * 2;
  const rows = Math.ceil(files.length / COLS);
  const canvasW = cellW * COLS;
  const canvasH = cellH * rows;

  const composites = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * cellW + PAD;
    const y = row * cellH + PAD;
    let buf;
    try {
      buf = await sharp(path.join(folder, f))
        .resize(TH_W, TH_H, { fit: "cover" })
        .jpeg({ quality: 65 })
        .toBuffer();
    } catch (e) {
      continue;
    }
    composites.push({ input: buf, left: x, top: y });
    const label = `${i + 1}`;
    const svg = `<svg width="${TH_W}" height="${LABEL_H}"><rect width="100%" height="100%" fill="black"/><text x="2" y="13" font-size="10" fill="white" font-family="sans-serif">${label}</text></svg>`;
    composites.push({ input: Buffer.from(svg), left: x, top: y + TH_H });
  }

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: "#222" },
  })
    .composite(composites)
    .jpeg({ quality: 76 })
    .toFile(outPath);
  console.log("OK", outPath, files.length, "imgs");
}

// uso: node _contactsheet.js "<pasta>" "<saida.jpg>" [maxPorPagina]
const [, , folder, outBase, maxPerPageStr] = process.argv;
const maxPerPage = maxPerPageStr ? parseInt(maxPerPageStr) : 63;

(async () => {
  const files = fs
    .readdirSync(folder)
    .filter((f) => /\.(webp|jpg|jpeg)$/i.test(f))
    .sort((a, b) => {
      const na = parseInt((a.match(/\((\d+)\)/) || [])[1] || "-1");
      const nb = parseInt((b.match(/\((\d+)\)/) || [])[1] || "-1");
      if (na !== -1 && nb !== -1 && na !== nb) return na - nb;
      return a.localeCompare(b);
    });
  fs.writeFileSync(outBase.replace(/\.jpg$/, "") + "-files.json", JSON.stringify(files));
  console.log("total:", files.length);

  const pages = Math.ceil(files.length / maxPerPage);
  for (let p = 0; p < pages; p++) {
    const slice = files.slice(p * maxPerPage, (p + 1) * maxPerPage);
    const out = pages > 1 ? outBase.replace(/\.jpg$/, `-p${p + 1}.jpg`) : outBase;
    await buildSheet(folder, slice, out);
  }
})();
