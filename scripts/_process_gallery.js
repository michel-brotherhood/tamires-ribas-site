const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// uso: node _process_gallery.js "<pasta origem>" "<selected.json>" "<slug>"
const [, , srcFolder, selectedJson, slug] = process.argv;
const OUT_DIR = path.join(process.cwd(), "public", "projetos");

const selected = JSON.parse(fs.readFileSync(selectedJson, "utf8"));

(async () => {
  let i = 1;
  for (const file of selected) {
    const out = `${slug}-${String(i).padStart(2, "0")}.webp`;
    await sharp(path.join(srcFolder, file))
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT_DIR, out));
    console.log(i, "->", out, "(" + file + ")");
    i++;
  }
  console.log("done, total:", selected.length);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
