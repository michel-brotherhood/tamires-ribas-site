import { ImageResponse } from "next/og";

/**
 * Imagem de compartilhamento (Open Graph / Twitter). Gerada dinamicamente pelo
 * Next — sem dependências extras nem arquivo de imagem manual.
 */
export const runtime = "edge";
export const alt = "TR Arquitetura e Interiores — Muito Além de um Projeto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f1ea",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            fontWeight: 600,
            color: "#111111",
          }}
        >
          TR
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 32,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#827b6f",
              marginBottom: 16,
            }}
          >
            Arquitetura e Interiores de Alto Padrão
          </div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#111111",
            }}
          >
            Muito Além de um Projeto.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "rgba(17,17,17,0.6)" }}>
          TR Arquitetura e Interiores · Tamires Ribas
        </div>
      </div>
    ),
    { ...size },
  );
}
