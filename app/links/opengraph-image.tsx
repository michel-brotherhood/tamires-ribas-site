import { ImageResponse } from "next/og";

/**
 * Imagem de compartilhamento (Open Graph / WhatsApp / Instagram) da página de
 * links. Fundo quente escuro com aura dourada — ecoa o visual da /links — e a
 * foto da arquiteta em destaque. Gerada dinamicamente pelo Next.
 */
export const runtime = "edge";
export const alt = "Tamires Ribas — Arquitetura e Interiores · Links";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photo = await fetch(
    new URL("./tamires-og.jpg", import.meta.url),
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 90px",
          backgroundColor: "#15100b",
          backgroundImage:
            "radial-gradient(circle at 78% 50%, rgba(230,196,140,0.24) 0%, transparent 60%)",
          color: "#f4f1ea",
        }}
      >
        {/* Coluna de texto */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 8,
              fontWeight: 600,
              color: "#e6c48c",
              marginBottom: 28,
            }}
          >
            TR
          </div>
          <div
            style={{
              fontSize: 27,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#c7b48f",
              marginBottom: 14,
            }}
          >
            Arquitetura e Interiores · Alto Padrão
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#f4f1ea",
            }}
          >
            Tamires Ribas
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 22,
              color: "rgba(244,241,234,0.62)",
              marginTop: 34,
            }}
          >
            <span>Orçamento</span>
            <span>·</span>
            <span>Site</span>
            <span>·</span>
            <span>Curso TR</span>
            <span>·</span>
            <span>Localização</span>
            <span>·</span>
            <span>Instagram</span>
          </div>
        </div>

        {/* Foto com anel dourado */}
        <div
          style={{
            display: "flex",
            width: 380,
            height: 380,
            borderRadius: 380,
            border: "2px solid rgba(230,196,140,0.55)",
            boxShadow: "0 0 0 14px rgba(230,196,140,0.10)",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={380}
            height={380}
            src={`data:image/jpeg;base64,${Buffer.from(photo).toString(
              "base64",
            )}`}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
