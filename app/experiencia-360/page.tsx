import type { Metadata } from "next";
import { existsSync, readdirSync } from "fs";
import path from "path";
import Experience360, { type PanoramaTab } from "@/components/Experience360";

export const metadata: Metadata = {
  title: "Tour 360° — TR Arquitetura e Interiores",
  description:
    "Explore os ambientes do projeto em uma experiência imersiva 360°: área social, suíte master, espaço gourmet, salão de festas e fachada.",
};

const PANORAMA_DIR = path.join(process.cwd(), "public", "panoramas");

/**
 * Resolução de rótulo e ordem por palavra-chave no nome do arquivo. Isso torna
 * a página robusta a nomes variados (ex.: "sa-tio-gourmet" → "Espaço Gourmet")
 * e permite simplesmente soltar novos .webp na pasta.
 */
const RULES: { match: RegExp; label: string; order: number }[] = [
  { match: /(sala|cozinha|social|living)/i, label: "Área Social", order: 1 },
  { match: /(suite|master|quarto|dormit)/i, label: "Suíte Master", order: 2 },
  { match: /gourmet/i, label: "Espaço Gourmet", order: 3 },
  { match: /(festas?|salao|salão)/i, label: "Salão de Festas", order: 4 },
  { match: /(fachada|externa|exterior)/i, label: "Fachada", order: 5 },
];

function titleCase(slug: string): string {
  return slug
    .replace(/-?360-?/gi, " ")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function resolve(file: string): { label: string; order: number } {
  const base = file.replace(/\.webp$/i, "");
  for (const r of RULES) {
    if (r.match.test(base)) return { label: r.label, order: r.order };
  }
  return { label: titleCase(base), order: 50 };
}

export default function Experience360Page() {
  let files: string[] = [];
  if (existsSync(PANORAMA_DIR)) {
    files = readdirSync(PANORAMA_DIR).filter((f) => /\.webp$/i.test(f));
  }

  const tabs: PanoramaTab[] = files
    .map((file) => {
      const { label, order } = resolve(file);
      return {
        id: file.replace(/\.webp$/i, ""),
        label,
        src: `/panoramas/${file}`,
        exists: true,
        order,
      };
    })
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));

  return <Experience360 tabs={tabs} />;
}
