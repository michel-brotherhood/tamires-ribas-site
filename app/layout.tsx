import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Tipografia da marca TR Arquitetura e Interiores:
 *  - Glacial Indifference → títulos e destaques (--font-display).
 *  - Westmount → textos corridos e apoio (--font-sans).
 *
 * `ascent-override: 110%` reserva mais espaço acima da linha de base — a Glacial
 * tem acentos altos (é, Á, ã) que, sem isso, encostam/cortam no topo da caixa.
 */
const display = localFont({
  src: [
    { path: "./fonts/GlacialIndifference-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/GlacialIndifference-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  declarations: [
    { prop: "ascent-override", value: "110%" },
  ],
});

const sans = localFont({
  src: [
    { path: "./fonts/WestmountRegular.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  declarations: [
    { prop: "ascent-override", value: "110%" },
  ],
});

export const metadata: Metadata = {
  title: "TR Arquitetura e Interiores — Muito Além de um Projeto",
  description:
    "Escritório da arquiteta Tamires Ribas, especializado em projetos residenciais de alto padrão. Arquitetura e interiores que refletem personalidade, conforto e atemporalidade.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#CABFAB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
